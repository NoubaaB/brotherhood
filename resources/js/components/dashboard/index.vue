<template>
    <v-row>
        <v-col>
        <!-- <DatePicker/> -->
        </v-col>
    </v-row>
    <v-row>
        <YourCharges/>
    </v-row>
</template>
<script>
import YourCharges from "./YourCharges.vue";
import { useDashboard } from "@/stores/Dashboard.js";

export default {
    components: {
        YourCharges
    },
    computed: {
        dashboard: function () {
                return useDashboard();
        }  
    },
    mounted: function () {
        console.log("test");
        this.dashboard.getData();
    },
    watch: {
        "dashbaord.date_start": function () {
            this.dashboard.getData();
        },
        "dashbaord.date_end": function () {
            this.dashboard.getData();
        }
    }
}
</script>