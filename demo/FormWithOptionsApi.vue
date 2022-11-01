<script lang="ts">
import { mapStores } from 'pinia';
import { useFormStore } from './stores';

export default {
    computed: {
        // note we are not passing an array, just one store after the other
        // each store will be accessible as its id + 'Store'
        ...mapStores(useFormStore)
    },
    methods: {
        async submit() {
            console.log('submit!')
        }
    }
};
</script>

<template>
    <div class="rounded bg-gray-50 p-2 border border-gray-200 mb-4">
        First: {{ formStore.first }}<br>
        Last: {{ formStore.last }}
    </div>

    <form>
        <div class="mb-4">
            <label class="block">First <input v-model="formStore.first" class="block w-full rounded px-2 py-1 border-2 border-gray-200"></label>
        </div>
        <div class="mb-4">
            <label class="block">Last <input v-model="formStore.last" class="block w-full rounded px-2 py-1 border-2 border-gray-200"></label>
        </div>
    </form>
</template>