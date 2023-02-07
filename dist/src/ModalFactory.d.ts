import { App, VNode } from 'vue';
interface ModalParams {
    title: string;
    content: VNode;
    resolve: Function;
    reject: Function;
    promise: () => Promise<any>;
    props: Record<string, any>;
}
export default class ModalFactory {
    protected readonly app: App;
    protected readonly props: Record<string, any>;
    constructor(app: App, props: Record<string, any>);
    mount(vnode: VNode): void;
    register(type: string, callback: (params: ModalParams) => VNode): void;
}
export {};
