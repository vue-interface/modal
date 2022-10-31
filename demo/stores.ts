import { defineStore } from "pinia";
import { ref } from "vue";

export const useFormStore = defineStore('form', () => {
    const first = ref<string>('John');
    const last = ref<string>('Doe');

    return {
        first,
        last
    };
});