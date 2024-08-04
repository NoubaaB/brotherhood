<template>
<v-col cols="12" sm="6">
    <v-card
    class="mx-auto"
    title="Most Used Product"
    subtitle="Total Product used during This Period"
    >
        <template v-slot:prepend>
            <v-avatar rounded="0">
            <v-img
                alt="charges-timeline"
                src="/storage/pie-chart.gif"
            ></v-img>
            </v-avatar>
        </template>
        <v-card-text class="pa-0">
            <apexchart :options="chartOptions" :series="series"></apexchart>
        </v-card-text>
    </v-card>
</v-col>
</template>
<script>
import { useDashboard } from "@/stores/Dashboard";
export default {
    computed: {
        dashboard: function () {
            return useDashboard();
        },
        chartOptions: function () {
            return {
                chart: {
                    type: "donut",
                    width:"350"
                },
                labels: this.dashboard.get_grouping_labels.map(e=>e.name)
            }  
        },
        series: function () {
            return this.dashboard.get_grouping_series;
        }
    }
}
</script>