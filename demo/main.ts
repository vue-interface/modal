import { createPinia } from 'pinia';
import { createApp } from 'vue';
import ModalPlugin from '../src/ModalPlugin.js';
import App from './App.vue';

const pinia = createPinia();

createApp(App)
    .use(ModalPlugin)
    .use(pinia)
    .use((app) => {
        app.config.globalProperties.$test = {
            warn(...args: any[]) {
                console.warn(...args);
            }
        };
    })
    .mount('#app');