import { ActivityIndicator, Pulse } from '@vue-interface/activity-indicator';
import '@vue-interface/activity-indicator/dist/style.css';

import { createPinia } from 'pinia';
import { createApp, h } from 'vue';
import ModalPlugin from '../src/ModalPlugin';
import App from './App.vue';

const pinia = createPinia();

createApp(App)
    .use(ModalPlugin, {
        indicator: h(ActivityIndicator, {
            type: Pulse,
            center: true,
            minHeight: '250px'
        })
    })
    .use(pinia)
    .use((app) => {
        app.config.globalProperties.$test = {
            warn(...args: any[]) {
                console.warn(...args);
            }
        };
    })
    .mount('#app');