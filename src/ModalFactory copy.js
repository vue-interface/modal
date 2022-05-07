import lifecycle from './lifecycle';
import deepMerge from 'just-extend';

export default class ModalFactory {

    constructor(vue, options = {}) {
        this.$vue = vue;
        this.$options = options;
    }

    register(key, params = {}) {
        const { render, resolver, wrapper } = params;

        return this[key] = (...args) => {
            const ModalWrapper = this.$vue.extend(deepMerge({
                render(h) {
                    return render.call(this, h, ...args);
                }
            }, lifecycle((instance, key) => {
                return params[key] && params[key](instance, ...args);
            }), wrapper));

            const instance = new ModalWrapper(Object.assign({
                el: document.body.appendChild(document.createElement('div'))
            }, this.$options));

            return typeof resolver === 'function'
                ? resolver.call(instance, ...args)
                : instance;
        };
    }

}