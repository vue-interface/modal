import { createApp } from "vue";
import { createPinia } from 'pinia';
import App from './App.vue';
import ModalPlugin from '../src/ModalPlugin';

const pinia = createPinia();

createApp(App)
    .use(ModalPlugin)
    .use(pinia)
    .use((app) => {
        app.config.globalProperties.$test = {
            warn(...args) {
                console.warn(...args);
            }
        };
    })
    .mount('#app');