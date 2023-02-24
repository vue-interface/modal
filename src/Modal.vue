<script lang="ts">
import { Btn } from '@vue-interface/btn';
import { defineComponent } from 'vue';
import Triggerable from './Triggerable.js';

export default defineComponent({

    name: 'Modal',

    components: {
        Btn
    },

    mixins: [
        Triggerable
    ],

    // beforeRouteLeave() {
    //     this.close();
    // },

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
         * Should show the modal footer.
         *
         * @type {Boolean}
         */
        footer: {
            type: Boolean,
            default: true
        },

        /**
         * Should show the modal footer.
         *
         * @type {Boolean}
         */
        indicator: {
            type: Object,
            default: undefined
        },

        /**
         * The modal title.
         *
         * @type {String}
         */
        title: {
            type: String,
            default: undefined
        },

        /**
         * Is the modal type.
         *
         * @type {Boolean}
         */
        type: {
            type: [Boolean, String],
            default: false,
            validate(value: any) {
                return ['alert', 'confirm'].indexOf(value) !== -1;
            }
        }
    },

    watch: {
        isShowing(value) {            
            document.querySelector('body')?.classList[value ? 'add' : 'remove']('modal-open');
        }
    }

});
</script>

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
        
        <div
            ref="dialog"
            class="modal-dialog"
            :class="{'modal-dialog-centered': center}">
            <div class="modal-content">
                <slot name="header">
                    <div class="modal-header">
                        <slot name="title">
                            <h3
                                v-if="title"
                                class="modal-title">
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
                    <Suspense>
                        <div class="modal-body">
                            <slot ref="content" />
                        </div>
                        <template #fallback>
                            <component :is="indicator" />
                        </template>
                    </Suspense>
                </slot>
                
                <slot
                    v-if="footer"
                    name="footer"
                    :close="close">
                    <div
                        v-if="currentButtons.length"
                        ref="footer"
                        class="modal-footer">
                        <div class="modal-footer-buttons">
                            <template v-if="currentButtons.length">
                                <btn
                                    v-for="(button, i) in currentButtons"
                                    :key="`btn-${i}`"
                                    v-bind="button" />
                            </template>
                        </div>
                    </div>
                </slot>
            </div>
        </div>
    </div>
</template>

<style>
.modal-footer-buttons {
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
    grid-gap: .5rem;
    align-items: center;
}
</style>