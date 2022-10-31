import { VNode } from 'vue';
interface ModalParams {
    title: string;
    content: VNode;
    resolve: Function;
    reject: Function;
    promise: () => Promise<any>;
    props: Record<string, any>;
}
export default class ModalFactory {
    protected readonly app: any;
    constructor(app: any);
    mount(vnode: VNode): void;
    register(type: any, callback: (params: ModalParams) => VNode): void;
}
export {};
