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
    <v-row v-if="allow_filter">
        <v-col>
            <v-chip-group center-active v-model="article.article_filter" filter multiple @update:modelValue="article.resetBillPlanning">
                <v-chip value="0" color="red">My Article</v-chip>
                <v-chip value="1" color="green">Other Articles</v-chip>
                <v-chip value="2" color="blue">Bills</v-chip>
            </v-chip-group>
        </v-col>
    </v-row>
</template>
<script>
import { useDashboard } from "@/stores/Dashboard.js"
import { useArticle } from "@/stores/Article";
export default {
    props: {
        allow_filter:Boolean
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
        dashboard: function () {
            return useDashboard();
        },
        article: function () {
            return useArticle(); 
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
                this.date_picker = [moment().subtract(6, "days").format("YYYY-MM-DD"),moment().format("YYYY-MM-DD")];
            } else {
                this.date_picker = [
                    this.dashboard.date_start, this.dashboard.date_end
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