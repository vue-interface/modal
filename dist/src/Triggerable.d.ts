export type ResolveCallback = (status: boolean) => void;
export type ClickCallback = (e: Event, button: Button, modal: any, resolve: ResolveCallback) => void;
export interface Button {
    class: null;
    disabled: false;
    size: 'md';
    variant: 'primary';
    onClick?: ClickCallback;
}
declare const _default: {
    props: {
        /**
         * Custom buttons for the model.
         *
         * @type {Array}
         */
        buttons: {
            type: (BooleanConstructor | ArrayConstructor)[];
            default: undefined;
            validate(value: any): boolean;
        };
        /**
         * The cancel button callback function.
         *
         * @type {Function}
         */
        cancel: {
            type: FunctionConstructor;
            default(e: Event, button: Button, modal: any, resolve: Function): void;
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
            default(e: Event, button: Button, modal: any, resolve: Function): void;
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
            default(e: Event, button: Button, modal: any, status: boolean): void;
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
    methods: {
        focus(): void;
        close(e: Event): Promise<unknown>;
        buttonAttributes(button: Button): {
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
};
export default _default;
