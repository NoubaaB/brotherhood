<template>
    <v-col cols="12" sm="6">
      <v-card
        class="mx-auto"
        title="Compare Bills & Articles"
        subtitle="Killing Bills"
      >
        <template v-slot:prepend>
          <v-avatar rounded="0">
            <v-img
              alt="bills-articles"
              src="/storage/invoice.gif"
            ></v-img>
          </v-avatar>
        </template>
        <template v-slot:append>
        </template>
        <v-card-item class="px-5 text-center">
            <v-row>
                <v-col>
                    <v-chip color="blue" variant="tonal">
                        <v-icon class="mr-2">
                            mdi-cash-fast
                        </v-icon>
                        {{ formatFloatNumber(dashboard.total_bills) }} MAD
                    </v-chip>
                </v-col>
                <v-col>
                    <v-chip color="green" variant="tonal">
                        <v-icon class="mr-2">
                            mdi-cash-refund
                        </v-icon>
                        {{ formatFloatNumber(dashboard.total_articles) }} MAD
                    </v-chip>
                </v-col>
                <v-col>
                    <v-chip :color="dashboard.total_compare>=0?'red-lighten-1':'cyan-lighten-2'" variant="tonal">
                        <v-icon class="mr-2" v-if="dashboard.total_compare<=0">
                            mdi-gauge-empty
                        </v-icon>
                        <v-icon class="mr-2" v-else>
                            mdi-gauge
                        </v-icon>
                        {{ formatFloatNumber(dashboard.total_compare) }} MAD
                    </v-chip>
                </v-col>
            </v-row>
        </v-card-item>
        <v-card-text class="pa-0">
          <apexchart :options="option" :series="series"></apexchart>
        </v-card-text>
      </v-card>
    </v-col>
</template>
<script>
import {useDashboard} from "@/stores/Dashboard.js";
export default {
    computed: {
        dashboard: function () {
            return useDashboard();
        },
        option: function () {
            return {
                chart: {
                    type: 'bar',
                    height: 350,
                    toolbar: {
                        show: true
                    },
                    zoom: {
                        enabled: true
                    }
                },
                responsive: [{
                    breakpoint: 480,
                    options: {
                        legend: {
                        position: 'bottom',
                        offsetX: -10,
                        offsetY: 0
                        }
                    }
                }],
                // theme: {
                //     mode: this.main.mode, // Set theme mode to 'dark'
                // },
                xaxis: {
                    show:true,
                    type: 'datetime',
                    categories: this.dashboard.dates_format,
                },
                legend: {
                position: 'right',
                    offsetY: 40
                },
                fill: {
                    opacity: 1
                },
            }
        },
        series: function () {
            return [
                {
                    name: "Amount Bills",
                    data: this.dashboard.amount_bills
                },
                {
                    name: "Amount Articles",
                    data: this.dashboard.amount_articles
                }
            ]
        },
    }
}
</script>