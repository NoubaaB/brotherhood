<template>
    <v-expansion-panel-text class="pa-0">
            <v-row v-for="bill in dashbaord.score_bills" :key="bill.id">
                <v-col cols="12">
                    <Bill :bill="bill"/>
                </v-col>
            </v-row>
    </v-expansion-panel-text>
</template>
<script>
import axios from 'axios';
import Bill from "@/components/bills/Bill.vue";
import { useDashboard } from '@/stores/Dashboard';

export default {
    components: {
        Bill
    },
    props: {
        user_id:Number
    },
    data: function () {
        return {
            bills:[]
        }
    },
    computed: {
        dashbaord: function () {
            return useDashboard();
        }  
    },
    mounted: function () {
        axios.get("/api/bills", {
            params: {
                user_id:this.user_id
            }
        }).then(response => {
            this.dashbaord.score_bills = response.data.bills;
        });
    },
    methods: {
        
    }
}
</script>