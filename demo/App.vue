<script lang="ts" setup>
import Confirm from '../src/Confirm.vue';
import Modal from '../src/Modal.vue';
import { type ModalContext } from '../src/Modal.vue';
import { Bars3Icon } from '@heroicons/vue/24/outline';

function onConfirm(button: HTMLButtonElement, context: ModalContext) {
    console.log('confirmed!');

    context.close();
}
</script>

<template>
    <Confirm
        trigger="#confirm"
        :icon="Bars3Icon"
        close-button
        type="critical"
        button-orientation="vertical"
        title="Some Title"
        @confirm="onConfirm">
        Confirm
    </Confirm>

    <Modal
        trigger="#modal">
        Basic Modal
    </Modal>

    <div class="flex gap-8 m-24">
        <button
            id="modal"
            class="btn btn-primary">
            Modal
        </button>

        <button
            id="confirm"
            class="btn btn-secondary">
            Confirm
        </button>
    </div>
</template>