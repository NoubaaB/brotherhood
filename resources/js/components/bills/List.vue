<template>
    <v-row>
        <v-avatar size="150" class="mx-auto" rounded="0">
        <v-img
            alt="bills"
            src="/storage/bill.gif"
        ></v-img>
        </v-avatar>
    </v-row>
    <v-row>
        <v-col>
            <DatePicker :StateModel="bill"/>
        </v-col>
    </v-row>
    <v-row>
        <v-col class="text-center">
            <v-btn :loading="loading" :disabled="bill.getBillQueue.length == 0" rounded @click="deleteBills" color="blue"><v-icon>mdi-text-box-plus</v-icon> {{bill.getBillQueue.length}} Delete Bills </v-btn>            
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
import DatePicker from "@/components/global/DatePicker.vue";
import Bills from "@/components/bills/Bills.vue";
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
        bill: function () {
            return useBill();
        }
    },
    methods: {
        deleteBills: async function () {
            this.loading = true;
            await this.bill.deleteBills().then(_res => {
                this.loading = false;
                this.snackbar_bill = true;
            })
        }
    },
    mounted: function () {
        this.bill.getData();
    },
    watch: {
        "bill.date_start": function () {
            this.bill.getData();
        },
        "bill.date_end": function () {
            this.bill.getData();
        }
    }
}
</script>
<style>
.center_empty{
  justify-content: center !important;
}
</style>