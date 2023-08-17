<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useFormStore } from './stores.js';

async function wait(time: number) {
    return new Promise<boolean>(resolve => {
        setTimeout(() => resolve(true), time);
    });
}

export type User = {
    first: string,
    last: string
}

async function submit(): Promise<User> {
    await wait(1000);
        
    return {
        first: first.value,
        last: last.value
    };
}
    
defineExpose({
    submit
});

const { first, last } = storeToRefs(useFormStore());

await wait(1000);
</script>

<template>
    <p class="mb-4">
        The form is reactive as you type, just like any other component.
    </p>

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