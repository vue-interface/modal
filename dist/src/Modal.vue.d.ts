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
     * Should show the modal footer.
     *
     * @type {Boolean}
     */
    indicator: {
        type: ObjectConstructor;
        default: undefined;
    };
    /**
     * The modal title.
     *
     * @type {String}
     */
    title: {
        type: StringConstructor;
        default: undefined;
    };
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
            default: undefined;
            validate(value: any): boolean;
        };
        cancel: {
            type: FunctionConstructor;
            default(e: Event, button: import("./Triggerable.js").Button, modal: any, resolve: Function): void;
        };
        cancelButton: ObjectConstructor;
        confirm: {
            type: FunctionConstructor;
            default(e: Event, button: import("./Triggerable.js").Button, modal: any, resolve: Function): void;
        };
        confirmButton: ObjectConstructor;
        resolve: {
            type: FunctionConstructor;
            default(e: Event, button: import("./Triggerable.js").Button, modal: any, status: boolean): void;
        };
        show: {
            type: BooleanConstructor;
            defaut: boolean;
        };
    };
    methods: {
        focus(): void;
        close(e: Event): Promise<unknown>;
        buttonAttributes(button: import("./Triggerable.js").Button): {
            class: null;
            disabled: boolean;
            size: string;
            variant: string;
        } & {
            [k: string]: any;
        };
        open(): Promise<unknown>;
        transition(fn: Function): number;
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
        isShowing(value: boolean): void;
        show(value: boolean): void;
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
     * Should show the modal footer.
     *
     * @type {Boolean}
     */
    indicator: {
        type: ObjectConstructor;
        default: undefined;
    };
    /**
     * The modal title.
     *
     * @type {String}
     */
    title: {
        type: StringConstructor;
        default: undefined;
    };
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
    type: string | boolean;
    backdrop: boolean;
    center: boolean;
    closeable: boolean;
    footer: boolean;
    indicator: Record<string, any>;
    title: string;
}>;
export default _sfc_main;
