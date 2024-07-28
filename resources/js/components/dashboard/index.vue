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
            <DatePicker :StateModel="dashboard"/>
        </v-col>
    </v-row>
    <v-row>
        <YourCharges/>
        <AllCharges/>
        <BillsArticlesCharges/>
    </v-row>
</template>
<script>
import DatePicker from "@/components/global/DatePicker.vue";
import YourCharges from "./YourCharges.vue";
import AllCharges from "./AllCharges.vue";
import BillsArticlesCharges from "./BillsArticlesCharges.vue";
import { useDashboard } from "@/stores/Dashboard.js";

export default {
    components: {
        DatePicker,
        YourCharges,
        AllCharges,
        BillsArticlesCharges
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
        "dashboard.date_start": function () {
            this.dashboard.getData();
        },
        "dashboard.date_end": function () {
            this.dashboard.getData();
        }
    }
}
</script>