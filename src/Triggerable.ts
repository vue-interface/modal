import { ref } from 'vue';
import { reactive, ref } from 'vue';
import converter from 'css-unit-converter';

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
            validate(value) {
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
            default(e, button, modal, resolve) {
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
            default(e, button, modal, resolve) {
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
            default(e, button, modal, status) {
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

    setup(props) {
        console.log('setup')
    },

    methods: {
    
        focus() {
            this.$el.focus();
        },

        close(e) {
            return new Promise(resolve => {
                e = e || new Event('close', {
                    cancelable: true
                });

                const handler = () => {
                    this.isClosing = true;
                    this.isShowing = false;
                    
                    this.transition(() => {
                        this.isClosing = false;
                        this.isDisplaying = false;
                        this.$emit('closed', e);
    
                        resolve(this);
                    });
                };
                
                this.$emit('close', e, this.$refs.close, this, handler);

                if(!e.defaultPrevented) {
                    handler();
                }
            });
        },

        buttonAttributes(button) {
            return Object.assign({
                class: null,
                disabled: false,
                size: 'md',
                variant: 'primary',
            }, Object.fromEntries(
                Object.entries(button).filter(([key, value]) => {
                    return !key.match(/^on[A-Z]/);
                })
            ));
        },
        
        getCurrentButtons() {
            if(Array.isArray(this.buttons)) {
                return ref(this.buttons).value.map(button => {
                    const onClick: Function = button.onClick;

                    return Object.assign(button, {
                        onClick: e => onClick(e, button, this, (...args) => {
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
                        this.transition(() => {
                            this.$emit('opened');

                            resolve(this);
                        });
                    });
                };

                this.$emit('open', e, handler);

                if(!e.defaultPrevented) {
                    handler();
                }
            });
        },

        transition(fn) {
            const styles = getComputedStyle(this.$refs.dialog);
                
            const value = styles.transitionDuration.split(',')
                .map(value => {
                    const [ 
                        parsed, number, unit
                    ] = value.trim().match(/^([\d.]+)(\w+)$/);
    
                    return converter(parseFloat(number), unit, 'ms');
                })
                .sort((a, b) => {
                    return a - b;
                })
                .shift();
            
            return setTimeout(fn, value);
        },

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
            return this.cancelButton || {
                variant: 'secondary',
                label: 'Cancel',
                name: 'confirm',
                onClick: (e, button, modal) => {
                    this.cancel(e, button, modal, (...args) => {
                        this.resolve(e, button, modal, ...args);
                    });
                }
            };
        },

        computedConfirmButton() {
            return this.confirmButton || {
                variant: 'primary',
                label: 'Confirm',
                name: 'confirm',
                onClick: (e, button, modal) => {
                    this.confirm(e, button, modal, (...args) => {
                        this.resolve(e, button, modal, ...args);
                    });
                }
            };
        }
    },

    watch: {
        isShowing(value) {
            if(value) {
                this.focus();
            }
        },

        show(value) {
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
            currentButtons: this.getCurrentButtons(),
            isClosing: false,
            isShowing: false,
            isDisplaying: false,
        };
    }

};
