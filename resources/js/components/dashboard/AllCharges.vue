<template>
    <v-col cols="12" sm="6">
      <v-card
        class="mx-auto"
        title="Community Charges"
        subtitle="Total Charge That Community Spent Daily"
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
                    <v-chip color="blue" variant="tonal">
                        <v-icon class="mr-2">
                            mdi-cash-refund
                        </v-icon>
                        {{ formatFloatNumber(dashboard.total_all) }} MAD
                    </v-chip>
                </v-col>
                <v-col>
                    <v-chip color="indigo-lighten-2" variant="tonal">
                        <v-icon class="mr-2">
                            mdi-cash-sync
                        </v-icon>
                        {{ formatFloatNumber(dashboard.total_brotherhood) }} MAD
                    </v-chip>
                </v-col>
                <v-col>
                    <v-chip color="purple-lighten-1" variant="tonal">
                        <v-icon class="mr-2">
                            mdi-cash-multiple
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
import { useDashboard } from "@/stores/Dashboard.js";
import { useUser } from "@/stores/User";
export default {
    computed: {
        dashboard: function () {
            return useDashboard();
        },
        user: function () {
            return useUser();
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
            let data = [];
            this.user.users.forEach(user => {
                data.push(
                    {
                        name: `${user.name} Share`,
                        data: this.dashboard.get_amounts(user.id)
                    }
                );
            });
            return data ; 
        },
    }
}
</script>