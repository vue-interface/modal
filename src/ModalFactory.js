import lifecycle from './lifecycle';
import { isFunction, deepExtend } from '@vue-interface/utils';

export default class ModalFactory {

    constructor(vue) {
        this.$vue = vue;
        this.$registrar = {};
    }

    register(key, params = {}) {
        const { render, resolver, wrapper } = params;

        return this[key] = (...args) => {
            const ModalWrapper = this.$vue.extend(deepExtend({
                render: h => render(h, ...args),
            }, lifecycle((instance, key) => {
                return params[key] && params[key](instance, ...args);
            }), wrapper));
            
            const instance = new ModalWrapper({
                el: document.body.appendChild(document.createElement('div'))
            });

            if(isFunction(resolver)) {
                return resolver(instance, ...args);
            }

            return instance;
        };
    }

}