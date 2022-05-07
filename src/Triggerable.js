import converter from 'css-unit-converter';

export default {

    props: {

        /**
         * Custom buttons for the model.
         *
         * @type {Array}
         */
        buttons: Array,

        /**
         * The cancel button contextual object.
         *
         * @type {Object}
         */
        cancelButton: {
            type: Object,
            default: () => ({
                variant: 'secondary',
                label: 'Cancel',
                onClick(e, button, modal) {
                    modal.close();
                }
            })
        },

        /**
         * The confirm button contextual object.
         *
         * @type {Object}
         */
        confirmButton: {
            type: Object,
            default: () => ({
                variant: 'primary',
                label: 'Confirm',
                onClick(e, button, modal) {
                    modal.close();
                }
            })
        },

        /**
         * Is the triggerable element showing.
         *
         * @property Boolean
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

        buttonListeners(button, name) {
            return Object.fromEntries(
                Object.entries(button)
                    .map(([key, value]) => {
                        return [key, value, key.match(/^on([A-Z]\w+)/)];
                    })
                    .map(([key, value, matches]) => {
                        return [matches ? String(matches[1]).toLowerCase() : 'click', e => {
                            const handler = () => {
                                if(matches) {
                                    value(e, this.currentButtons[name].attributes, this);
                                }
                                else {
                                    this.close();
                                }
                            };
                            
                            this.$emit(button.name || name, e, this.currentButtons[name].attributes, this, handler);
        
                            if(!e.defaultPrevented) {
                                handler();
                            }
                        }];
                    })
            );
        },

        initializeButtons() {
            this.currentButtons = {
                cancel: {
                    attributes: this.buttonAttributes(this.cancelButton),
                    listeners: this.buttonListeners(this.cancelButton, 'cancel'),
                },
                confirm: {
                    attributes: this.buttonAttributes(this.confirmButton),
                    listeners: this.buttonListeners(this.confirmButton, 'confirm'),
                }
            };

            if(this.buttons) {
                this.buttons.forEach((button, i) => {
                    this.$set(this.currentButtons, `btn-${i}`, {
                        attributes: this.buttonAttributes(button),
                        listeners: this.buttonListeners(button, `btn-${i}`)
                    });
                });
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
        }

    },

    computed: {

        customButtons() {
            return Object.entries(this.currentButtons || {})
                .filter(([key, value]) => {
                    return !!key.match(/^btn-\d+$/);
                })
                .map(([key, value]) => value);
        },

        triggerableClasses() {
            return {
                show: this.isShowing
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

    created() {
        this.$on('open', () => this.initializeButtons());
        this.$on('closed', () => this.currentButtons = null);
    },

    mounted() {
        if(this.show) {
            this.open();
        }
    },

    data() {
        return {
            currentButtons: null,
            isClosing: false,
            isShowing: false,
            isDisplaying: false,
        };
    }

};
