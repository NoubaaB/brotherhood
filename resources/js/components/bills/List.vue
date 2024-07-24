<template>
    <v-row>
        <v-avatar size="150" class="mx-auto" rounded="0">
        <v-img
            alt="dashboards"
            src="/storage/bill.gif"
        ></v-img>
        </v-avatar>
    </v-row>
    <v-row>
        <v-col>
            <DatePicker/>
        </v-col>
    </v-row>
    <v-row>
        <v-col class="text-center">
            <v-btn :loading="loading" :disabled="bill.getBillQueue.length == 0" rounded @click="deleteBill" color="blue"><v-icon>mdi-text-box-plus</v-icon> {{bill.getBillQueue.length}} Delete Bills </v-btn>            
        </v-col>
        <v-col class="text-center">
            <v-chip color="blue" variant="tonal">
                <v-icon class="mr-2">
                    mdi-cash-refund
                </v-icon>
                {{ formatFloatNumber(bill.total_bills) }} MAD
            </v-chip>
        </v-col>
    </v-row>
    <v-row class="center_empty">
        <Bills/>
    </v-row>
    <v-snackbar
      v-model="snackbar_bill"
      color="white"
    >
        Bill
        <strong class="text-red">
            Has Been Deleted
        </strong>
        <template v-slot:actions>
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
import Bills from "@/components/bills/Bills.vue";
import { useDashboard } from "@/stores/Dashboard.js";
import { useBill } from "@/stores/Bill";

export default {
    components: {
        DatePicker,
        Bills,
    },
    data: function () {
        return {
            loading:false,
            snackbar_bill:false,
        }  
    },
    computed: {
        dashboard: function () {
                return useDashboard();
        },
        bill: function () {
                return useBill();
        }
    },
    methods: {
        deleteBill: async function () {
            this.loading = true;
            await this.bill.deleteBill().then(_res => {
                this.loading = false;
                this.snackbar_bill = true;
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