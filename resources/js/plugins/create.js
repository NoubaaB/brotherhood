import router from "@/router";
import "@mdi/font/css/materialdesignicons.css" // Ensure you are using css-loader
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import VueApexCharts from "vue3-apexcharts";
import { SnackbarService, Vue3Snackbar } from "vue3-snackbar";
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

import methods from "@/plugins/methods.js";
import { useAuth } from '@/stores/Auth';
import { useNotification } from "@/stores/Notification";

import pinia from "@/stores";
const vuetify = createVuetify({
    components,
    directives,
})

export async function registerPlugins(app) {
    app
        .use(pinia)
        .use(vuetify)
        .use(VueApexCharts)
        .use(SnackbarService)
        .component("vue3-snackbar", Vue3Snackbar)
        .component("VueDatePicker", VueDatePicker)
        .mixin(
            {
                methods,
            }
        );
    if (localStorage.getItem("token")) {
        await useAuth().attemp().catch(err => {
            router.push({ name: "login" })
        }).then(res => {
            useNotification().init();
        })
    }

    app.use(router)
}
