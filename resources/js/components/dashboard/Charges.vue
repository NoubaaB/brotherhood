<template>
    <v-col cols="12" sm="4">
      <v-card
        class="mx-auto"
        subtitle="Charges"
        title="Total Charges"
      >
        <template v-slot:prepend>
          <v-avatar rounded="0">
            <v-img
              alt="charges-timeline"
              src="/storage/charge.png"
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
                        <!-- {{ formatFloatNumber(dashboard.total_command_paid) }} MAD -->
                    </v-chip>
                </v-col>
                <v-col>
                    <v-chip color="blue" variant="tonal">
                        <v-icon class="mr-2">
                            mdi-cash-plus
                        </v-icon>
                        <!-- {{ formatFloatNumber(dashboard.total_command_non_paid) }} MAD -->
                    </v-chip>
                </v-col>
                <v-col>
                    <v-chip color="amber-darken-3" variant="tonal">
                        <v-icon class="mr-2">
                            mdi-cash-plus
                        </v-icon>
                        <!-- {{ formatFloatNumber(dashboard.total_command_total) }} MAD -->
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
                    type: 'area',
                    background: "transparent",
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    curve: 'smooth'
                },
                // theme: {
                //     mode: this.main.mode, // Set theme mode to 'dark'
                // },
                xaxis: {
                    show:true,
                    type: 'numeric',
                    categories: this.dashboard.houres,
                    labels: {
                        formatter: function (val) {
                            return `${val.toFixed(0)}h`; // Custom formatter to convert labels to uppercase
                        }
                    }
                },
                tooltip: {
                    x: {
                        formatter: (val) => {
                            return `${val}h`;
                        }
                    },
                    y: {
                        title: {
                            formatter: (val) => {
                                return `${val} : MAD`;
                            }
                        }
                    }
                }
            }
        },
        series: function () {
            return [
                {
                    name: "Amount you spent",
                    data: this.dashboard.amounts_to_brothers
                },
                {
                    name: "Amount You Spent In Yourself",
                    data: this.dashboard.amounts_to_self
                },
                {
                    name: "Amount All of You Spent",
                    data: this.dashboard.amounts_to_all
                }
            ]
        },
    }
}
</script>