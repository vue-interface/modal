import { h, render, type App, type VNode } from 'vue';
import { type ModalProps, type Response } from './Modal.vue';

export type ResolveCallback<T> = (value: T) => void;

export type ModalParams<T = boolean> = {
    title: string,
    content: VNode|string,
    resolve: ResolveCallback<T>,
    reject: ResolveCallback<T>,
    promise: () => Promise<any>,
    props?: ModalProps<T>
}

export function mount(app: App, vnode: VNode) {
    vnode.appContext = app._context;

    const el = document.createElement('div');

    render(h(vnode), el);

    document.body.append(el);
}

export type ModalContent<T> = string|((app: App, props?: ModalProps<T>) => VNode);

export type ModalFactory = <T = true>(title: string, content: ModalContent<T>, props?: ModalProps<T>) => Promise<Response<T>>

export function createModal(app: App, callback: <T>(params: ModalParams<T>) => VNode) {
    function factory<T>(title: string, content: ModalContent<T>, props?: ModalProps<T>) {
        const promise = new Promise((resolve, reject) => {
            mount(app, callback({
                title,
                props,
                resolve,
                reject,
                promise: () => promise,
                content: typeof content === 'string'
                    ? h('div', content)
                    : content(app, props)
            }));
        });

        return promise;
    };

    return factory;
}