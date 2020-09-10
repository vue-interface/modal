import { isFunction } from '@vue-interface/utils';

export default class ModalFactory {

    constructor(vue) {
        this.$vue = vue;
        this.$registrar = {};
    }

    register(key, { render, resolver }) {
        return this[key] = (title, content, ...args) => {
            const ModalWrapper = this.$vue.extend({
                render: h => render(h, title, content)
            });
            
            const wrapper = new ModalWrapper({
                el: document.body.appendChild(document.createElement('div'))
            });

            if(isFunction(resolver)) {
                return resolver(wrapper, ...args);
            }

            return wrapper;
        };
    }

}