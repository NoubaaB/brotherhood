<template>
    <v-row>
        <v-avatar size="150" class="mx-auto" rounded="0">
        <v-img
            alt="dashboards"
            src="/storage/articles_list.gif"
        ></v-img>
        </v-avatar>
    </v-row>
    <v-row>
        <v-col>
            <DatePicker :allow_filter="true"/>
        </v-col>
    </v-row>
    <v-row>
        <v-col class="text-center">
        <v-btn :loading="loading" :disabled="article.getBillQueue.length == 0" rounded @click="makeBill" color="blue"><v-icon>mdi-text-box-plus</v-icon> {{article.getBillQueue.length}} Make Bill </v-btn>            
        </v-col>
        <v-col class="text-center">
            <v-chip color="blue" variant="tonal">
                <v-icon class="mr-2">
                    mdi-cash-refund
                </v-icon>
                {{ formatFloatNumber(article.total_articles) }} MAD
            </v-chip>
        </v-col>
    </v-row>
    <v-row class="center_empty">
        <Articles/>
    </v-row>
    <v-snackbar
      v-model="snackbar_bill"
      color="white"
    >
        Bill
        <strong class="text-blue">
            {{total.id}}
        </strong>
        Has Been Created
        <template v-slot:actions>
            <v-btn
            rounded
            color="blue"
            variant="tonal"
            class="mr-2"
            @click="viewBill"
            >
            View
            </v-btn>
            <v-divider vertical></v-divider>
            <v-btn
            color="pink"
            variant="text"
            @click="snackbar_bill = false"
            >
            Close
            </v-btn>
        </template>
    </v-snackbar>
</template>
<script>
import DatePicker from "@/components/dashboard/DatePicker.vue";
import Articles from "@/components/articles/Articles.vue";
import { useDashboard } from "@/stores/Dashboard.js";
import { useArticle } from "@/stores/Article";

export default {
    components: {
        DatePicker,
        Articles,
    },
    data: function () {
        return {
            loading:false,
            snackbar_bill:false,
            total:null,
        }  
    },
    computed: {
        dashboard: function () {
                return useDashboard();
        },
        article: function () {
                return useArticle();
        }
    },
    methods: {
        makeBill: async function () {
            this.loading = true;
            await this.article.makeBill().then(res => {
                this.total =  res
                this.loading = false;
                this.snackbar_bill = true;
            })
        },
        viewBill: function () {
            this.$router.push({
                name: "bills.view",
                params:{id:this.total.id}
            })
        }
    },
    mounted: function () {
        this.dashboard.getData();
    },
    watch: {
        "dashboard.date_start": function () {
            this.dashboard.getData();
        },
        "dashboard.date_end": function () {
            this.dashboard.getData();
        }
    }
}
</script>
<style>
.center_empty{
  justify-content: center !important;
}
</style>