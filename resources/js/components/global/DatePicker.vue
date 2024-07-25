<template>
    <v-row>
        <v-col cols="5">
            <v-switch
                v-model="free"
                true-icon="mdi-calendar-week"
                false-icon="mdi-calendar-month"
                color="light-blue-darken-3"
                base-color="blue"
                inset
                :label="`${free? 'Weekly' :'Free'}`"
            ></v-switch>
        </v-col>
    </v-row>
    <v-row>
        <v-col v-if="free">
            <VueDatePicker v-model="date_picker" :enable-time-picker="false" :clearable="false" week-picker :max-date="maxDate"/>
        </v-col>
        <v-col v-else>
            <VueDatePicker v-model="date_picker" :enable-time-picker="false" :clearable="false" range :max-date="maxDate"/>
        </v-col>
    </v-row>
    <v-row>
        <slot name="add"/>
    </v-row>
</template>
<script>
export default {
    props: {
        StateModel:Object
    },
    data() {
        return {
            date_picker: new Date(),
            free: true,
        }
    },
    mounted: function () {
        this.date_picker = [moment().subtract(6, "days").format("YYYY-MM-DD"),moment().format("YYYY-MM-DD")];
    },
    computed: {
        maxDate: function () {
            return moment().format("YYYY-MM-DD")
        }
    },
    watch: {
        date_picker: function (val) {
            this.StateModel.date_start = moment(val[0]).format("YYYY-MM-DD");
            this.StateModel.date_end = moment(val[1]).format("YYYY-MM-DD");
            this.StateModel.getData();
        },
        free: function (val) {
            if (val) {
                this.date_picker = [moment().subtract(6, "days").format("YYYY-MM-DD"),moment().format("YYYY-MM-DD")];
            } else {
                this.date_picker = [
                    this.StateModel.date_start, this.StateModel.date_end
                ]
            }
        }
    }
}
</script>
<style>
.v-slide-group__content{
    justify-content: center !important;
}
</style>