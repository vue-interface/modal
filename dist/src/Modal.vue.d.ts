declare const _sfc_main: import("vue").DefineComponent<{
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
}, unknown, unknown, {}, {}, {
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
        cancelButton: ObjectConstructor; /**
         * Should show the modal footer.
         *
         * @type {Boolean}
         */
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
    methods: {
        focus(): void;
        close(e: any): Promise<unknown>;
        buttonAttributes(button: any): any;
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
        currentButtons(): any;
    };
    watch: {
        isShowing(value: any): void;
        show(value: any): void;
    };
    mounted(): void;
    data(): {
        isClosing: boolean;
        isShowing: boolean;
        isDisplaying: boolean;
    };
}, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
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
}>>, {
    backdrop: boolean;
    center: boolean;
    closeable: boolean;
    footer: boolean;
    type: string | boolean;
}>;
export default _sfc_main;
