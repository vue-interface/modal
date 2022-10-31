declare const _default: {
    props: {
        /**
         * Custom buttons for the model.
         *
         * @type {Array}
         */
        buttons: {
            type: (BooleanConstructor | ArrayConstructor)[];
            default: any;
            validate(value: any): boolean;
        };
        /**
         * The cancel button callback function.
         *
         * @type {Function}
         */
        cancel: {
            type: FunctionConstructor;
            default(e: any, button: any, modal: any, resolve: any): void;
        };
        /**
         * The cancel button contextual object.
         *
         * @type {Object}
         */
        cancelButton: ObjectConstructor;
        /**
         * The confirm button callback function.
         *
         * @type {Function}
         */
        confirm: {
            type: FunctionConstructor;
            default(e: any, button: any, modal: any, resolve: any): void;
        };
        /**
         * The confirm button contextual object.
         *
         * @type {Object}
         */
        confirmButton: ObjectConstructor;
        /**
         * The default resolver.
         *
         * @property {Function}
         */
        resolve: {
            type: FunctionConstructor;
            default(e: any, button: any, modal: any, status: any): void;
        };
        /**
         * Is the triggerable element showing.
         *
         * @property {Boolean}
         */
        show: {
            type: BooleanConstructor;
            defaut: boolean;
        };
    };
    setup(props: any): void;
    methods: {
        focus(): void;
        close(e: any): Promise<unknown>;
        buttonAttributes(button: any): any;
        getCurrentButtons(): any;
        open(): Promise<unknown>;
        transition(fn: any): number;
        toggle(): void;
    };
    computed: {
        triggerableClasses(): {
            show: any;
        };
        computedCancelButton(): any;
        computedConfirmButton(): any;
    };
    watch: {
        isShowing(value: any): void;
        show(value: any): void;
    };
    mounted(): void;
    data(): {
        currentButtons: any;
        isClosing: boolean;
        isShowing: boolean;
        isDisplaying: boolean;
    };
};
export default _default;
