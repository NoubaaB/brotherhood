import "./bootstrap";
// Plugins
import { registerPlugins } from '@/plugins/create.js';

// Components
import App from './App.vue';

// Composa bles  
import { createApp } from 'vue';

const app = createApp(App)

await registerPlugins(app)

app.mount('#app')
