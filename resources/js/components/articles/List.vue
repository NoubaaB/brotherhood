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
            <DatePicker :StateModel="dashboard">
                <template v-slot:add>
                    <v-col>
                        <v-chip-group center-active v-model="article.article_filter" filter multiple @update:modelValue="article.resetBillPlanning">
                            <v-chip value="0" color="red">My Article</v-chip>
                            <v-chip value="1" color="green">Other Articles</v-chip>
                            <v-chip value="2" color="blue">Bills</v-chip>
                            <v-chip value="3" color="purple-lighten-2"><v-icon>{{article.article_filter.find(f=>f=='3')? "mdi-eye":"mdi-eye-off"}}</v-icon></v-chip>
                        </v-chip-group>
                    </v-col>
                </template>
            </DatePicker>
        </v-col>
    </v-row>
    <v-row>
        <v-col class="text-center pt-0">
            <v-checkbox
            class="pr-2"
            hide-details
            @click="toggleBills"
            v-model="toggle_bills"
            color="primary"
            ></v-checkbox>
        </v-col>
        <v-col class="text-center px-0">
            <v-chip color="blue">
                <v-icon>
                    mdi-cart-plus
                </v-icon>
                {{ article.articles.length }}
            </v-chip>
        </v-col>
        <v-col class="text-center">
            <v-chip color="blue" variant="tonal">
                <v-icon class="mr-2">
                    mdi-cash-refund
                </v-icon>
                {{ formatFloatNumber(article.total_articles) }} MAD
            </v-chip>
        </v-col>
        <v-col class="text-center pl-0">
            <v-chip :disabled="article.total_articles_selected==0" color="amber" variant="tonal">
                <v-icon class="mr-2">
                    mdi-cash
                </v-icon>
                {{ formatFloatNumber(article.total_articles_selected) }} MAD
            </v-chip>
        </v-col>
    </v-row>
    <v-row>
        <v-col class="text-center">
                <v-select
                v-model="article.users_id"
                :items="user.users_activated"
                item-value="id"
                item-text="name"
                color="blue-grey-lighten-2"
                variant="solo-filled" 
                rounded flat
                hide-spin-buttons
                multiple
                hide-details
                menu-icon=""
                >
                    <template v-slot:chip="{ props, item , index}">
                        <v-chip 
                        :prepend-avatar="item.raw.image"
                        :text="formatStringLength(item.raw.name,2)"
                        color="blue"
                        v-bind="props"
                        v-if="index < 2">
                        </v-chip>
                        <span
                            v-bind="props"
                            v-if="index === 2"
                            class="text-grey text-caption align-self-center"
                        >
                            (+{{ article.users_id.length - 2 }})
                        </span>
                    </template>

                    <template v-slot:item="{ props, item }">
                        <v-list-item
                        v-bind="props"
                        :prepend-avatar="item.raw.image"
                        :subtitle="item.raw.email"
                        :title="item.raw.name"
                        ></v-list-item>
                    </template>
                </v-select>
        </v-col>
        <v-col class="text-center mt-2">
            <v-btn :loading="loading" 
            :disabled="article.getBillQueue.length == 0 || article.users_id.length == 0" 
            rounded 
            @click="makeBill" 
            color="blue">
                <v-icon>mdi-text-box-plus</v-icon> 
                {{article.getBillQueue.length}} Make Bill 
            </v-btn>            
        </v-col>
    </v-row>
    <v-row class="center_empty">
        <Articles/>
    </v-row>
    <v-snackbar
      v-model="snackbar_bill"
      color="white"
    >
        Bill N° :
        <strong class="text-blue">
            {{bill.id}}
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
import DatePicker from "@/components/global/DatePicker.vue";
import Articles from "@/components/articles/Articles.vue";
import { useDashboard } from "@/stores/Dashboard.js";
import { useArticle } from "@/stores/Article";
import { useAuth } from "@/stores/Auth";
import { useUser } from "@/stores/User";

export default {
    components: {
        DatePicker,
        Articles,
    },
    data: function () {
        return {
            loading:false,
            snackbar_bill:false,
            toggle_bills: false,
            bill:null,
        }  
    },
    computed: {
        dashboard: function () {
            return useDashboard();
        },
        article: function () {
            return useArticle();
        },
        auth: function () {
            return useAuth()
        },
        user: function () {
            return useUser();
        }
    },
    methods: {
        makeBill: async function () {
            this.loading = true;
            await this.article.makeBill().then(res => {
                this.loading = false;
                if (res === true) {
                    this.$router.push({
                        name:"bills.list"
                    })
                } else {
                    this.snackbar_bill = true;
                    this.bill =  res
                }
            })
        },
        viewBill: function () {
            this.$router.push({
                name: "bills.view",
                params:{id:this.bill.id}
            })
        },
        toggleBills: function () {
          this.article.toggleBills(this.toggle_bills)  
        },
    },
    mounted: function () {
        this.article.users_id = this.user.users_activated.map(user => user.id);
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