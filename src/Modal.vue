<template>
    <div
        class="modal"
        :class="{...triggerableClasses, fade: isDisplaying}"
        :style="{display: isDisplaying ? 'block' : 'none'}"
        tabindex="-1"
        role="dialog"
        @keydown.esc="onCancel">
        <slot name="backdrop">
            <modal-backdrop v-if="isDisplaying" ref="backdrop" @click="closeable && close" />
        </slot>
        
        <modal-dialog ref="dialog" :class="{'modal-dialog-centered': center}">
            <modal-content ref="content">
                <slot name="header">
                    <modal-header
                        v-if="title || closeable"
                        ref="header"
                        :closeable="closeable"
                        :disabled="isCancelling || isDenying || isConfirming"
                        @close="onCancel">
                        {{ title }}
                    </modal-header>
                </slot>

                <slot name="body">
                    <component :is="!flush ? 'modal-body' : 'div'" ref="body">
                        <slot />
                    </component>
                </slot>

                <slot name="footer">
                    <modal-footer v-if="type || buttons" ref="footer">
                        <btn-activity
                            v-for="(button, i) in buttons"
                            :key="button.label || `button-${i}`"
                            v-bind="button"
                            @click="(...args) => onClick(button, i, ...args)" />
                        <template v-if="type">
                            <btn-activity
                                v-if="type !== 'alert'"
                                :activity="isCancelling"
                                :disabled="isDenying || isConfirming"
                                :variant="type === 'confirm' ? 'link' : 'secondary'"
                                @click="onCancel">
                                {{ cancelLabel }}
                            </btn-activity>
                            <btn-activity
                                v-if="type === 'confirm'"
                                :activity="isDenying"
                                :disabled="isCancelling || isConfirming"
                                variant="danger"
                                @click="onDeny">
                                {{ denyLabel }}
                            </btn-activity>
                            <btn-activity
                                :activity="isConfirming"
                                :disabled="isCancelling || isDenying"
                                :variant="type === 'confirm' ? 'success' : 'primary'"
                                @click="onConfirm">
                                {{ confirmLabel }}
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
         * Custom buttons for the model.
         *
         * @type {Array}
         */
        buttons: Array,

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
         * The cancel label text.
         *
         * @type {Function|String}
         */
        cancelLabel: {
            type: [Function, String],
            default: 'Cancel'
        },

        /**
         * The confirm label text.
         *
         * @type {Function|String}
         */
        confirmLabel: {
            type: [Function, String],
            default: 'Ok'
        },

        /**
         * The deny callback. 
         *
         * @type {Function}
         * @return {Promise}
         */
        deny: {
            type: Function,
            default(e) {
                return new Promise((resolve, reject) => {
                    this.$emit('deny', e, resolve, reject, this);

                    if(!e.defaultPrevented) {                    
                        return this.close(() => resolve(e));
                    }
                    
                    reject(new Error('Deny rejected!'));
                });
            }
        },


        /**
         * The deny label text.
         *
         * @type {Function|String}
         */
        denyLabel: {
            type: [Function, String],
            default: 'Deny'
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
            isDenying: false,
            isConfirming: this.activity,
        };
    },
    
    watch: {
        isShowing(value) {            
            document.querySelector('body').classList[value ? 'add' : 'remove']('modal-open');
        }
    },

    created() {
        this.buttons && this.buttons.map(button => {
            return Object.assign(button, {
                update: (...args) => {
                    return new Promise(resolve => {
                        Object.assign(button, ...args);

                        this.$nextTick(resolve);
                        this.$forceUpdate();
                    });
                }
            });
        });
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

            return this;
        },

        denying(value = true) {
            this.isDenying = value;

            return this;
        },

        confirming(value = true) {
            this.isConfirming = value;

            return this;
        },

        submitting(value = true) {
            return this.confirming(value);
        },

        onCancel(e) {
            this.cancel(e).then(payload => {
                this.$emit('cancelled', payload, this);
            }, e => {
                // Ignore the exception
            });
        },

        onClick(button, i, ...args) {
            button.onClick && button.onClick(...args, this, button, i);
        },

        onDeny(e) {
            this.deny(e).then(payload => {
                this.$emit('denied', payload, this);
            }, e => {
                // Ignore the exception
            });
        },

        onConfirm(e) {
            this.confirm(e).then(payload => {
                this.$emit('confirmed', payload, this);
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
