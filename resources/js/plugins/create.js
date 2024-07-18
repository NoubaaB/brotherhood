import axios from 'axios';
import router from "@/router";
import "@mdi/font/css/materialdesignicons.css" // Ensure you are using css-loader

import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import VueApexCharts from "vue3-apexcharts";
import { SnackbarService, Vue3Snackbar } from "vue3-snackbar";

import methods from "@/plugins/methods.js";
import { useAuth } from '@/stores/Auth';

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
        .mixin(
            {
                methods,
            }
        );
    if (localStorage.getItem("token")) {
        await useAuth().attemp().catch(err => {
            return router.push({ name: "login" })
        })
    }
    
    app.use(router)
}
