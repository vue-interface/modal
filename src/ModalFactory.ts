import { h, render, VNode } from 'vue';

interface ModalParams {
    title: string,
    content: VNode,
    resolve: Function,
    reject: Function,
    promise: () => Promise<any>,
    props: Record<string,any>
}

export default class ModalFactory {
    constructor(
        protected readonly app
    ) {
        //
    }

    mount(vnode: VNode) {
        vnode.appContext = this.app._context;

        const el = document.createElement('div');

        render(h(vnode), el);

        document.body.append(el);
    }
    
    register(type, callback: (params: ModalParams) => VNode) {
        Object.defineProperty(this, type, {
            value: (title, content: string|((app, props: Record<string,any>) => VNode), props: Record<string,any>) => {
                const promise = new Promise((resolve, reject) => {
                    this.mount(callback({
                        props,
                        title,
                        resolve: value => {
                            resolve(value);

                            return promise;
                        },
                        reject: value => {
                            reject(value);

                            return promise;
                        },
                        promise: () => promise,
                        content: typeof content === 'string'
                            ? h('div', content)
                            : content(this.app, props)
                    }));
                });
    
                return promise;
            }
        });
    }

}