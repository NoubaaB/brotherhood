import "./bootstrap";
import router from "./router";
import { createApp } from "vue";
import "@mdi/font/css/materialdesignicons.css" // Ensure you are using css-loader

import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

import pinia from "@/stores";
const vuetify = createVuetify({
    components,
    directives,
})

import App from "./App.vue";

createApp(App)
    .use(pinia)
    .use(router)
    .use(vuetify)
    .mount("#app");
