<template>
    <v-row>
        <v-avatar size="150" class="mx-auto" rounded="0">
        <v-img
            alt="dashboards"
            src="/storage/dashboards_list.gif"
        ></v-img>
        </v-avatar>
    </v-row>
    <v-row>
        <v-col>
            <DatePicker/>
        </v-col>
    </v-row>
    <v-row>
        <Items/>
    </v-row>
</template>
<script>
import DatePicker from "@/components/dashboard/DatePicker.vue";
import Items from "@/components/items/Items.vue";
import { useDashboard } from "@/stores/Dashboard.js";

export default {
    components: {
        DatePicker,
        Items,
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