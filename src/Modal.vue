<template>
    <div
        class="modal fade"
        :class="{...triggerableClasses}"
        :style="{display: isDisplaying ? 'block' : 'none'}"
        tabindex="-1"
        @keydown.esc="close">
        <slot name="backdrop">
            <div
                v-if="backdrop && isDisplaying" 
                ref="backdrop"
                class="modal-backdrop fade"
                :class="{'show': isShowing}"
                @click="closeable && close" />
        </slot>
        
        <div ref="dialog" class="modal-dialog" :class="{'modal-dialog-centered': center}">
            <div ref="content" class="modal-content">
                <slot name="header">
                    <div class="modal-header">
                        <slot name="title">
                            <h3 v-if="title" class="modal-title">
                                {{ title }}
                            </h3>
                        </slot>

                        <slot name="close-button">
                            <button
                                v-if="closeable"
                                ref="close"
                                type="button"
                                class="close"
                                data-dismiss="modal"
                                aria-label="Close"
                                :disabled="isClosing"
                                @click="close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </slot>
                    </div>
                </slot>

                <slot name="body">
                    <div class="modal-body">
                        <slot />
                    </div>
                </slot>
                
                <slot name="footer" :close="close">
                    <div v-if="customButtons.length || type && currentButtons" ref="footer" class="modal-footer">
                        <div class="modal-footer-buttons">
                            <template v-if="customButtons.length">
                                <btn
                                    v-for="(button, i) in customButtons"
                                    :key="`btn-${i}`"
                                    v-bind="button.attributes"
                                    v-on="button.listeners" />
                            </template>
                            <template v-else-if="type === 'alert'">
                                <btn
                                    ref="confirm"
                                    v-bind="currentButtons.confirm.attributes"
                                    v-on="currentButtons.confirm.listeners" />
                            </template>
                            <template v-else-if="type === 'confirm'">
                                <btn
                                    ref="confirm"
                                    v-bind="currentButtons.confirm.attributes"
                                    v-on="currentButtons.confirm.listeners" />
                                <btn
                                    ref="cancel"
                                    v-bind="currentButtons.cancel.attributes"
                                    v-on="currentButtons.cancel.listeners" />
                            </template>
                        </div>
                    </div>
                </slot>
            </div>
        </div>
    </div>
</template>

<script>
import { Btn } from '@vue-interface/btn';
import Triggerable from './Triggerable.js';

export default {

    name: 'Modal',

    components: {
        Btn
    },

    mixins: [
        Triggerable
    ],

    props: {
        /**
         * Show the modal with a backdrop.
         *
         * @type {Boolean}
         */
        backdrop: {
            type: Boolean,
            default: true
        },

        /**
         * Is the modal centered in the screen.
         *
         * @type {Boolean}
         */
        center: Boolean,

        /**
         * Is the modal content fixed position
         *
         * @type {Boolean}
         */
        closeable: {
            type: Boolean,
            default: true
        },

        /**
         * The modal title.
         *
         * @type {String}
         */
        title: String,

        /**
         * Is the modal type.
         *
         * @type {Boolean}
         */
        type: {
            type: [Boolean, String],
            default: false,
            validate(value) {
                return ['alert', 'confirm'].indexOf(value) !== -1;
            }
        }
    },

    watch: {
        isShowing(value) {            
            document.querySelector('body').classList[value ? 'add' : 'remove']('modal-open');
        }
    },

    beforeRouteLeave() {
        this.close();
    }

};
</script>

<style>
.modal-footer-buttons {
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
    grid-gap: .5rem;
    align-items: center;
}
</style>