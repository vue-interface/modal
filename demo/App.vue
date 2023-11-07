<script lang="ts" setup>
import Confirm from '../src/Confirm.vue';
import { type ModalContext } from '../src/ModalNew.vue';

// const modal = ref<typeof ModalNew>();

// setTimeout(async () => {
//     await modal.value.open();
// }, 1000);
function onConfirm(button: HTMLButtonElement, context: ModalContext) {
    button.disabled = true;

    setTimeout(() => {
        context.close();
    }, 1000);
}
</script>

<template>
    <Confirm
        :show="true"
        close-button
        type="critical"
        button-orientation="vertical"
        title="Some Title"
        @confirm="onConfirm">
        content
    </Confirm>

    <!-- <Alert @confirm="() => {}" button-label="OK!" /> -->
    <!-- <Confirm @confirm="() => {}" @cancel="() => {}" confirm-class="btn-outline-danger" confirm-label="Yes" cancel-label="No" /> -->
</template>