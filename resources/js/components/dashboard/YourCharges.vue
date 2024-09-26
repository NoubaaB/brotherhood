<template>
    <v-col cols="12" sm="6">
      <v-card
        class="mx-auto"
        title="Your Daily Charges"
        subtitle="Your privates and Publics Daily Charge"
      >
        <template v-slot:prepend>
          <v-avatar rounded="0">
            <v-img
              alt="charges-timeline"
              src="/storage/charge_yourself.gif"
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
                        {{ formatFloatNumber(dashboard.total_amount_you_spent) }} MAD
                    </v-chip>
                </v-col>
                <v-col>
                    <v-chip color="green" variant="tonal">
                        <v-icon class="mr-2">
                            mdi-cash-fast
                        </v-icon>
                        {{ formatFloatNumber(dashboard.total_amount_private) }} MAD
                    </v-chip>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-chip color="indigo" variant="tonal">
                        <v-icon class="mr-2">
                            mdi-cash-fast
                        </v-icon>
                        {{ formatFloatNumber(dashboard.total_all) }} MAD
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
                yaxis: {
                    labels: {
                        formatter: function (value) {
                            return value.toFixed(2); // Always show 2 decimal places
                        }
                    }
                },
                legend: {
                position: 'right',
                    offsetY: 40
                },
                fill: {
                    opacity: 1
                },
                annotations: {
                    yaxis: [
                        {
                        y: this.dashboard?.capital?.amount,
                        borderColor: '#FF0000',
                        label: {
                            borderColor: '#FF0000',
                            style: {
                            color: '#fff',
                            background: '#FF0000',
                            },
                            text: `Capital : ${this.dashboard?.capital?.amount} DH`,
                        },
                        },
                    ],
                    xaxis: [
                        {
                        x: this.dashboard?.capital?.date_start,
                        x2: this.dashboard?.capital?.date_end,
                        borderColor: '#FF0000',
                        fillColor: '#FF0000',
                        opacity: 0.1,
                        label: {
                            borderColor: '#FF0000',
                            style: {
                            fontSize: '10px',
                            color: '#fff',
                            background: '#FF0000',
                            },
                            orientation: 'horizontal',
                            text: `Capital : ${this.dashboard?.capital?.amount} DH`,
                        },
                        },
                    ],
                }
            }
        },
        series: function () {
            return [
                {
                    name: "Total Spent (MAD)",
                    data: this.dashboard.amount_you_spent
                },
                {
                    name: "Amount You Spent In Private",
                    data: this.dashboard.amounts_private
                }
            ]
        },
    }
}
</script>