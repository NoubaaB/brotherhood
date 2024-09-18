<template>
    <v-dialog
        v-model="dashbaord.fetching"
        persistent :overlay="false"
        transition="dialog-transition"
        height="90"
    >
        <v-card>
            <v-container style="height: 400px;">
            <v-row
                align-content="center"
                class="fill-height"
                justify="center"
            >
                <v-col
                class="text-subtitle-1 text-center"
                cols="12"
                >
                Getting Data
                </v-col>
                <v-col cols="12">
                <v-progress-linear
                    color="blue-accent-4"
                    height="6"
                    indeterminate
                    rounded
                ></v-progress-linear>
                </v-col>
            </v-row>
            </v-container>
        </v-card>
    </v-dialog>
</template>
<script>
import { useDashboard } from "@/stores/Dashboard";
export default {
    computed: {
        dashbaord: function () {
            return useDashboard();
        }
    }
}
</script>