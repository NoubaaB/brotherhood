<template>
    <v-row>
        <v-avatar size="150" class="mx-auto" rounded="0">
        <v-img
            alt="dashboard"
            src="/storage/dashboard.gif"
        ></v-img>
        </v-avatar>
    </v-row>
    <v-row>
        <v-col>
            <DatePicker/>
        </v-col>
    </v-row>
    <v-row>
        <YourCharges/>
    </v-row>
    <v-row>
        <AllCharges/>
    </v-row>
</template>
<script>
import DatePicker from "./DatePicker.vue";
import YourCharges from "./YourCharges.vue";
import AllCharges from "./AllCharges.vue";
import { useDashboard } from "@/stores/Dashboard.js";

export default {
    components: {
        DatePicker,
        YourCharges,
        AllCharges
    },
    computed: {
        dashboard: function () {
                return useDashboard();
        }  
    },
    mounted: function () {
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