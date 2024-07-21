<template>
    <v-col cols="12" sm="6">
      <v-card
        class="mx-auto"
        title="Total Charges Brotherhood"
        subtitle="Section : Charge"
      >
        <template v-slot:prepend>
          <v-avatar rounded="0">
            <v-img
              alt="charges-timeline"
              src="/storage/charge_brotherhood.gif"
            ></v-img>
          </v-avatar>
        </template>
        <template v-slot:append>
        </template>
        <v-card-item class="px-5 text-center">
            <v-row>
                <v-col>
                    <v-chip color="green" variant="tonal">
                        <v-icon class="mr-2">
                            mdi-cash-refund
                        </v-icon>
                        {{ formatFloatNumber(dashboard.total_brotherhood) }} MAD
                    </v-chip>
                </v-col>
                <v-col>
                    <v-chip color="amber-darken-3" variant="tonal">
                        <v-icon class="mr-2">
                            mdi-cash-plus
                        </v-icon>
                        {{ formatFloatNumber(dashboard.total_global) }} MAD
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
                    stacked: true,
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
                plotOptions: {
                bar: {
                    horizontal: false,
                    borderRadiusApplication: 'end', // 'around', 'end'
                    borderRadiusWhenStacked: 'last', // 'all', 'last'
                    dataLabels: {
                    total: {
                        enabled: true,
                        style: {
                        fontSize: '13px',
                        fontWeight: 600
                        }
                    }
                    }
                },
                },
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
                }
            }
        },
        series: function () {
            return [
                {
                    name: "Amount Brotherhood",
                    data: this.dashboard.amounts_brotherhood
                },
                {
                    name: "Amount You Spent",
                    data: this.dashboard.amounts_all
                }
            ]
        },
    }
}
</script>