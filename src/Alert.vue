<script setup lang="ts">
import { ref } from 'vue';
import Modal, { type ModalProps } from './Modal.vue';

const props = withDefaults(defineProps<ModalProps>(), {
    backdrop: true,
    buttonBlock: false,
    buttonOrientation: 'horizontal',
    buttonPosition: 'end',
    closeButton: false,
    colors: () => ({
        info: 'bg-blue-100 text-blue-800',
        warning: 'bg-amber-100 text-amber-600',
        critical: 'bg-rose-100 text-rose-800',
        success: 'bg-emerald-100 text-emerald-800',
    }),
    content: undefined,
    dismissable: true,
    footer: true,
    icon: undefined,
    show: false,
    title: undefined,
    type: 'info',
});

const modal = ref<typeof Modal>();

defineExpose({
    modal
});
</script>

<template>
    <Modal 
        ref="modal"
        v-bind="props">
        <slot />
        <template #title>
            <slot name="title" />
        </template>
        <template #content>
            <slot name="content" />
        </template>
        <template #buttons="{ close }">
            <button
                class="btn btn-secondary"
                @click="close()">
                Dismiss
            </button>
        </template>
    </Modal>
</template>