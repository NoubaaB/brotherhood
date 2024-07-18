<template>
    <v-row>
        <v-col>
        <!-- <DatePicker/> -->
        </v-col>
    </v-row>
    <v-row>
        <Charges/>
    </v-row>
</template>
<script>
import Charges from "./Charges.vue";
import { useDashboard } from "@/stores/Dashboard.js";

export default {
    components: {
        Charges
    },
    computed: {
        dashboard: function () {
                return useDashboard();
        }  
    },
    activated: function () {
        this.dashboard.getData()
    }
}
</script>