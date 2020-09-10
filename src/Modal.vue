<template>
    <div
        class="modal"
        :class="{...triggerableClasses, fade: isDisplaying}"
        :style="{display: isDisplaying ? 'block' : 'none'}"
        tabindex="-1"
        role="dialog"
        @keydown.esc="onCancel">
        <slot name="backdrop">
            <modal-backdrop v-if="isDisplaying" ref="backdrop" />
        </slot>
        
        <modal-dialog ref="dialog" :class="{'modal-dialog-centered': center}">
            <modal-content ref="content">
                <slot name="header">
                    <modal-header v-if="title || closeable" ref="header" :closeable="closeable" @close="onCancel">
                        {{ title }}
                    </modal-header>
                </slot>

                <slot name="body">
                    <component :is="!flush ? 'modal-body' : 'div'" ref="body">
                        <slot />
                    </component>
                </slot>

                <slot name="footer">
                    <modal-footer v-if="type || $slots.footer" ref="footer">
                        <template v-if="type === 'alert'">
                            <btn-activity :activity="isSubmitting" @click="onConfirm">
                                {{ okLabel }}
                            </btn-activity>
                        </template>
                        <template v-else>
                            <btn-activity :activity="isCancelling" type="button" variant="secondary" @click="onCancel">
                                {{ cancelLabel }}
                            </btn-activity>
                            <btn-activity :activity="isSubmitting" @click="onConfirm">
                                {{ okLabel }}
                            </btn-activity>
                        </template>
                    </modal-footer>
                </slot>
            </modal-content>
        </modal-dialog>
    </div>
</template>

<script>
import BtnActivity from '@vue-interface/btn-activity';
import ModalBody from './ModalBody';
import ModalDialog from './ModalDialog';
import ModalHeader from './ModalHeader';
import ModalFooter from './ModalFooter';
import ModalContent from './ModalContent';
import ModalBackdrop from './ModalBackdrop';
import Triggerable from '@vue-interface/triggerable';

export default {

    name: 'Modal',

    components: {
        BtnActivity,
        ModalBody,
        ModalBackdrop,
        ModalContent,
        ModalDialog,
        ModalHeader,
        ModalFooter
    },

    mixins: [
        Triggerable
    ],

    props: {

        /**
         * Show the modal activity indicator.
         *
         * @type {Boolean}
         */
        activity: Boolean,

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
         * Is the modal content flush with the modal edges? If true, no modal-body
         * will be used to wrap the content.
         *
         * @type {Boolean}
         */
        flush: Boolean,

        /**
         * The ok label text.
         *
         * @type {String}
         */
        okLabel: {
            type: String,
            default: 'Ok'
        },

        /**
         * The cancel label text.
         *
         * @type {String}
         */
        cancelLabel: {
            type: String,
            default: 'Cancel'
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
                return ['alert', 'confirm', 'prompt'].indexOf(value) !== -1;
            }
        }

    },

    data() {
        return {
            isCancelling: false,
            isSubmitting: this.activity,
        };
    },
    
    watch: {

        isShowing(value) {            
            document.querySelector('body').classList[value ? 'add' : 'remove']('modal-open');

            this.$emit('update:show', value);
        }

    },

    mounted() {
        if(this.show) {
            this.$nextTick(() => {
                this.initializeTarget();
                this.isDisplaying = true;

                setTimeout(() => {
                    this.isShowing = this.show;
                }, 50);
            });
        }
    },

    methods: {

        cancelling(value = true) {
            this.isCancelling = value;
        },

        submitting(value = true) {
            this.isSubmitting = value;
        },

        onCancel(e) {
            this.cancel(e).then(payload => {
                this.$emit('cancelled', payload);
            }, e => {
                // Ignore the exception
            });
        },

        onConfirm(e) {
            this.confirm(e).then(payload => {
                this.$emit('confirmed', payload);
            }, e => {
                // Ignore the exception
            });
        }

    },

    beforeRouteLeave(to, from, next) {
        this.close();
    }

};
</script>

<style>
.modal-backdrop + .modal-dialog {
    z-index: 1050;
}
</style>
