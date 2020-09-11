<template>
    <div class="modal-header">
        <slot name="title">
            <modal-title><slot /></modal-title>
        </slot>

        <slot name="close-button">
            <button
                v-if="closeable"
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
                :disabled="disabled"
                @click="e => $emit('close', e)">
                <span aria-hidden="true">×</span>
            </button>
        </slot>
    </div>
</template>

<script>
import ModalTitle from './ModalTitle';

export default {

    name: 'ModalHeader',

    components: {
        ModalTitle
    },

    props: {

        ariaLabel: {
            type: String,
            default: 'Close'
        },

        closeable: {
            type: Boolean,
            default: true
        },

        disabled: Boolean

    }

};
</script>
