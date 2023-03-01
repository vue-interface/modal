// import type { CSSUnits } from 'css-unit-converter';
// import converter from 'css-unit-converter';
import { ref } from 'vue';

export type ResolveCallback = (status: boolean) => void;

export type ClickCallback = (e: Event, button: Button, modal: any, resolve: ResolveCallback) => void;

export interface Button {
    class: null,
    disabled: false,
    size: 'md',
    variant: 'primary',
    onClick?: ClickCallback
}

export default {

    props: {

        /**
         * Custom buttons for the model.
         *
         * @type {Array}
         */
        buttons: {
            type: [Boolean, Array],
            default: undefined,
            validate(value: any) {
                return Array.isArray(value) || !value;
            }
        },

        /**
         * The cancel button callback function.
         * 
         * @type {Function}
         */
        cancel: {
            type: Function,
            default(e: Event, button: Button, modal: any, resolve: Function) {
                resolve(false);
            }
        },

        /**
         * The cancel button contextual object.
         *
         * @type {Object}
         */
        cancelButton: Object,

        /**
         * The confirm button callback function.
         * 
         * @type {Function}
         */
        confirm: {
            type: Function,
            default(e: Event, button: Button, modal: any, resolve: Function) {
                resolve(true);
            }
        },

        /**
         * The confirm button contextual object.
         *
         * @type {Object}
         */
        confirmButton: Object,

        /**
         * The default resolver.
         * 
         * @property {Function}
         */
        resolve: {
            type: Function,
            default(e: Event, button: Button, modal: any) {
                modal.close();
            }
        },

        /**
         * Is the triggerable element showing.
         *
         * @property {Boolean}
         */
        show: {
            type: Boolean,
            defaut: false
        }
    },

    methods: {
    
        focus() {
            this.$el.focus();
        },

        close(e: Event) {
            return new Promise(resolve => {
                e = e || new Event('close', {
                    cancelable: true
                });

                const handler = () => {
                    this.isClosing = true;
                    this.isShowing = false;
                    
                    setTimeout(() => {
                        this.isClosing = false;
                        this.isDisplaying = false;
                        this.$emit('closed', e);
    
                        resolve(this);
                    }, 500);
                };
                
                this.$emit('close', e, this.$refs.close, this, handler);

                if(!e.defaultPrevented) {
                    handler();
                }
            });
        },

        buttonAttributes(button: Button) {
            return Object.assign({
                class: null,
                disabled: false,
                size: 'md',
                variant: 'primary',
            }, Object.fromEntries(
                Object.entries(button).filter(([key]) => {
                    return !key.match(/^on[A-Z]/);
                })
            ));
        },

        open() {
            return new Promise(resolve => {
                const e = new Event('close', {
                    cancelable: true
                });

                const handler = () => {
                    this.isDisplaying = true;

                    setTimeout(() => {
                        this.isShowing = true;
                        setTimeout(() => {
                            this.$emit('opened');

                            resolve(this);
                        }, 500);
                    });
                };

                this.$emit('open', e, handler);

                if(!e.defaultPrevented) {
                    handler();
                }
            });
        },

        // @todo - Replace this functionality with something else.
        //         For now, use setTimeout() to replace this.
        // transition(fn: Function) {
        //     const styles = getComputedStyle(this.$refs.dialog);
                
        //     const value = styles.transitionDuration.split(',')
        //         .map(value => {
        //             const matches = value.trim().match(/^([\d.]+)(\w+)$/);

        //             if(!matches) {
        //                 return 0;
        //             }

        //             const number: number = parseFloat(matches[1]);
        //             const unit: CSSUnits = <CSSUnits> matches[2];
                    
        //             return converter(number, unit, 'ms');
        //         })
        //         .sort((a, b) => {
        //             return a - b;
        //         })
        //         .shift();
            
        //     return setTimeout(fn, value);
        // },

        toggle() {
            if(!this.isShowing) {
                this.open();
            }
            else {
                this.close();
            }
        },

    },

    computed: {

        triggerableClasses() {
            return {
                show: this.isShowing
            };
        },

        computedCancelButton() {
            const button = {
                variant: 'secondary',
                label: 'Cancel',
                name: 'confirm',
                onClick: (e: Event) => {
                    this.cancel(e, button, this, (...args: any[]) => {
                        this.resolve(e, button, this, ...args);
                    });
                }
            };

            return this.cancelButton || button;
        },

        computedConfirmButton() {
            const button = {
                variant: 'primary',
                label: 'Confirm',
                name: 'confirm',
                onClick: (e: Event) => {
                    this.confirm(e, button, this, (...args: any[]) => {
                        this.resolve(e, button, this, ...args);
                    });
                }
            };

            return this.confirmButton || button;
        },

        currentButtons() {
            if(Array.isArray(this.buttons)) {
                return ref(this.buttons).value.map((button: Button) => {
                    const onClick = button.onClick || (() => undefined);

                    return Object.assign(button, {
                        onClick: (e: Event) => onClick(e, button, this, (...args: any) => {
                            return this.resolve(e, button, this, ...args);
                        })
                    });
                });
            }
            else if(this.type === 'alert') {
                return [this.computedConfirmButton];
            }
            else if(this.type === 'confirm') {
                return [
                    this.computedConfirmButton,
                    this.computedCancelButton
                ];
            }
        }
    },

    watch: {
        isShowing(value: boolean) {
            if(value) {
                this.focus();
            }
        },

        show(value: boolean) {
            if(value) {
                this.open();
            }
        }
    },

    mounted() {
        if(this.show) {
            this.open();
        }
    },

    data() {
        return {
            isClosing: false,
            isShowing: false,
            isDisplaying: false,
        };
    }

};
