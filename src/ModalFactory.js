// import lifecycle from './lifecycle';
import merge from 'deepmerge';
import Modal from './Modal.vue';

export default class ModalFactory {

    constructor(vue, options = {}) {
        this.$vue = vue;
        // this.$options = options;
    }

    register(type, callback) {
        // const { render, resolver, wrapper } = params;

        return this[type] = (title, content, props = {}) => {
            const ModalWrapper = this.$vue.extend(Modal);

            return new Promise((resolve, reject) => {
                new ModalWrapper(Object.assign({
                    el: document.body.appendChild(document.createElement('div')),
                    render(createElement) {
                        return callback((content, ...args) => {
                            if(typeof content === 'function') {
                                const [ component, props ] = content();

                                return [createElement(component, props)];
                            }

                            if(typeof content === 'string') {
                                return content;
                            }

                            return createElement(content, ...args);
                        }, { resolve, reject }, title, content, Object.assign({}, props));
                    }
                }));
            });
        };
    }

}