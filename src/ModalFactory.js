import lifecycle from './lifecycle';
import { isFunction, deepExtend } from '@vue-interface/utils';

export default class ModalFactory {

    constructor(vue, options = {}) {
        this.$vue = vue;
        this.$options = options;
    }

    register(key, params = {}) {
        const { render, resolver, wrapper } = params;

        return this[key] = (...args) => {
            const ModalWrapper = this.$vue.extend(deepExtend({
                render(h) {
                    return render.call(this, h, ...args);
                }
            }, lifecycle((instance, key) => {
                return params[key] && params[key](instance, ...args);
            }), wrapper));

            const instance = new ModalWrapper(Object.assign({
                el: document.body.appendChild(document.createElement('div'))
            }, this.$options));

            return isFunction(resolver) ? resolver.call(instance, ...args) : instance;
        };
    }

}