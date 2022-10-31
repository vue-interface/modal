declare const _sfc_main: {
    name: string;
    components: {
        Btn: any;
    };
    mixins: {
        props: {
            buttons: {
                type: (BooleanConstructor | ArrayConstructor)[];
                default: any;
                validate(value: any): boolean;
            };
            cancel: {
                type: FunctionConstructor;
                default(e: any, button: any, modal: any, resolve: any): void;
            };
            cancelButton: ObjectConstructor;
            confirm: {
                type: FunctionConstructor;
                default(e: any, button: any, modal: any, resolve: any): void;
            };
            confirmButton: ObjectConstructor;
            resolve: {
                type: FunctionConstructor;
                default(e: any, button: any, modal: any, status: any): void;
            };
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
    }[];
    props: {
        /**
         * Show the modal with a backdrop.
         *
         * @type {Boolean}
         */
        backdrop: {
            type: BooleanConstructor;
            default: boolean;
        };
        /**
         * Is the modal centered in the screen.
         *
         * @type {Boolean}
         */
        center: BooleanConstructor;
        /**
         * Is the modal content fixed position
         *
         * @type {Boolean}
         */
        closeable: {
            type: BooleanConstructor;
            default: boolean;
        };
        /**
         * Should show the modal footer.
         *
         * @type {Boolean}
         */
        footer: {
            type: BooleanConstructor;
            default: boolean;
        };
        /**
         * The modal title.
         *
         * @type {String}
         */
        title: StringConstructor;
        /**
         * Is the modal type.
         *
         * @type {Boolean}
         */
        type: {
            type: (BooleanConstructor | StringConstructor)[];
            default: boolean;
            validate(value: any): boolean;
        };
    };
    watch: {
        isShowing(value: any): void;
    };
    beforeRouteLeave(): void;
};
export default _sfc_main;
