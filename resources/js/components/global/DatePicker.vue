<template>
    <v-row>
        <v-col class="text-right">
            <v-chip color="primary">
                <v-icon>mdi-calendar-arrow-left</v-icon>
                {{ StateModel.date_start }}
            </v-chip>
        </v-col>
        <v-col cols="3">
            <v-chip color="indigo">
                {{nbrDates}} {{ nbrDates == 1 ? "Day" : "Days"}}
            </v-chip>
        </v-col>
        <v-col class="text-left">
            <v-chip color="secondary">
                {{ StateModel.date_end }}
                <v-icon>mdi-calendar-arrow-right</v-icon>
            </v-chip>
        </v-col>
    </v-row>
    <v-row>
        <v-col class="text-center">
            <VDatePicker expanded :attributes="attributes" :max-date="new Date()" v-model.range="date_picker" />
        </v-col>
    </v-row>
    <v-row>
        <slot name="add"/>
    </v-row>
</template>
<script>
import { useDashboard } from '@/stores/Dashboard';

export default {
    props: {
        StateModel:Object
    },
    data() {
        return {
            date_picker: {
                start:moment().subtract(6, "days").format("YYYY-MM-DD"),
                end:moment().format("YYYY-MM-DD"),
            },
        }
    },
    computed: {
        maxDate: function () {
            return moment().format("YYYY-MM-DD");
        },
        dashboard: function () {
            return useDashboard();
        },
        nbrDates: function () {
            const date1 = moment(this.StateModel.date_start);
            const date2 = moment(this.StateModel.date_end);
            return date2.diff(date1, 'days')+1;
        },
        attributes: function () {
            let attrs = this.dashboard.bills_dates.map(bill => {
                return {
                    highlight: {
                        color: 'green',
                        fillMode: 'light',
                    },
                    dates: bill.date,
                };
            });
            this.dashboard.bills_dates.forEach(bill => {
                attrs.push({
                    dot: "green",
                    dates: bill.date,
                });
            });
            return attrs;
        }
    },
    watch: {
        date_picker: function (val) {
            this.StateModel.date_start = moment(val.start).format("YYYY-MM-DD");
            this.StateModel.date_end = moment(val.end).format("YYYY-MM-DD");
            this.StateModel.getData();
        }
    }
}
</script>
<style>
.v-slide-group__content{
    justify-content: center !important;
}
</style>