<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useFormStore } from './stores';

const { first, last } = storeToRefs(useFormStore());

await new Promise(resolve => setTimeout(resolve, 2000));
</script>

<template>
    <div class="rounded bg-gray-50 p-2 border border-gray-200 mb-4">
        First: {{ first }}<br>
        Last: {{ last }}
    </div>

    <form>
        <div class="mb-4">
            <label class="block">First <input
                v-model="first"
                class="block w-full rounded px-2 py-1 border-2 border-gray-200"></label>
        </div>
        <div class="mb-4">
            <label class="block">Last <input
                v-model="last"
                class="block w-full rounded px-2 py-1 border-2 border-gray-200"></label>
        </div>
    </form>
</template>