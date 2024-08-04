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
                        {{ formatFloatNumber(dashboard.total_none_private) }} MAD
                    </v-chip>
                </v-col>
                <v-col>
                    <v-chip color="green" variant="tonal">
                        <v-icon class="mr-2">
                            mdi-cash-refund
                        </v-icon>
                        {{ formatFloatNumber(dashboard.total_private) }} MAD
                    </v-chip>
                </v-col>
                <v-col>
                    <v-chip color="amber-darken-3" variant="tonal">
                        <v-icon class="mr-2">
                            mdi-cash-plus
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
                annotations: {
                    yaxis: [
                        {
                        y: this.dashboard?.capital?.amount,
                        borderColor: '#FEB019',
                        label: {
                            borderColor: '#FEB019',
                            style: {
                            color: '#fff',
                            background: '#FEB019',
                            },
                            text: `Limit : ${this.dashboard?.capital?.amount} DH`,
                        },
                        },
                    ],
                    xaxis: [
                        {
                        x: this.dashboard?.capital?.date_start,
                        x2: this.dashboard?.capital?.date_end,
                        borderColor: '#775DD0',
                        fillColor: '#775DD0',
                        opacity: 0.1,
                        label: {
                            borderColor: '#775DD0',
                            style: {
                            fontSize: '10px',
                            color: '#fff',
                            background: '#775DD0',
                            },
                            orientation: 'horizontal',
                            text: `Limit : ${this.dashboard?.capital?.amount} DH`,
                        },
                        },
                    ],
                }
            }
        },
        series: function () {
            return [
                {
                    name: "Amount you spent To Public",
                    data: this.dashboard.amounts_none_private
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