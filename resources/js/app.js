import "./bootstrap";
// Plugins
import { registerPlugins } from '@/plugins/create.js';
import { establish } from "@/plugins/handleSocket";

// Components
import App from './App.vue';

// Composa bles  
import { createApp } from 'vue';

import { Swiper } from 'swiper/dist/js/swiper.esm.js';
window.Swiper = Swiper;

const app = createApp(App)

await registerPlugins(app)

app.mount('#app').$nextTick(() => {
    establish();
})
