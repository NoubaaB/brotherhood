<template>
    <div class="d-block">
        <v-switch
                v-model="free"
                true-icon="mdi-calendar-week"
                false-icon="mdi-calendar-month"
                color="light-blue-darken-3"
                base-color="blue"
                inset
                :label="`${free? 'Weekly' :'Free'}`"
        ></v-switch>
    </div>
    <VueDatePicker v-model="date_picker" week-picker v-if="free" :max-date="maxDate"/>
    <VueDatePicker v-model="date_picker" range v-else :max-date="maxDate"/>
</template>
<script>
import {useDashboard} from "@/stores/Dashboard.js"
export default {
    data() {
        return {
            date_picker: new Date(),
            free: true,
        }
    },
    mounted: function () {
        this.date_picker = [moment().startOf('week').add(1,"days").format("YYYY-MM-DD"),moment().format("YYYY-MM-DD")];
    },
    computed: {
        dashboard: function () {
            return useDashboard();
        },
        maxDate: function () {
            return moment().format("YYYY-MM-DD")
        }
    },
    watch: {
        date_picker: function (val) {
            this.dashboard.date_start = moment(val[0]).format("YYYY-MM-DD");
            this.dashboard.date_end = moment(val[1]).format("YYYY-MM-DD");
            this.dashboard.getData();
        },
        free: function (val) {
            if (val) {
                this.date_picker = [moment().startOf('week').add(1,"days").format("YYYY-MM-DD"),moment().format("YYYY-MM-DD")];
            } else {
                this.date_picker = [
                    this.dashboard.date_start, this.dashboard.date_end
                ]
            }
        }
    }
}
</script>