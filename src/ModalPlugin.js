import lifecycle from './lifecycle';
import Modal from './Modal';
import ModalFactory from './ModalFactory';
import { isObject, isFunction } from '@vue-interface/utils';

function component(type) {
    return Object.assign(lifecycle((lifecycle, key, wrapper, title, content, options = {}) => {
        options[key] && options[key](wrapper, title, content, options);
    }), {
        resolver(title, content, options = {}) {
            return new Promise((resolve, reject) => {
                this.$refs.modal.$on('deny', () => reject(new Error('denied!')));
                this.$refs.modal.$on('cancel', () => reject(new Error('cancelled!')));
                this.$refs.modal.$on('confirm', e => {
                    const payload = {
                        content: this.$refs.content,
                        modal: this.$refs.modal,
                        wrapper: this,
                        reject,
                        resolve,
                    };

                    if(isFunction(options.validate)) {
                        options.validate.call(this, e, payload);
                        
                        e.preventDefault();
                    }
                    else {
                        resolve(payload);
                    }
                });
            }).then(response => {
                this.$refs.modal.close();

                return response;
            });
        },
        render(h, title, content, options = {}) {
            const modal = Object.assign({
                ref: 'modal',
                props: {
                    show: true,
                    title,
                    type,
                },
            }, options.modal);

            return h(Modal, modal, isObject(content) ? [
                h(content, Object.assign({
                    ref: 'content'
                }, options.content))
            ] : [h('div', {ref: 'content'}, content)]);
        }
    });
}

export default function(Vue) {
    Vue.prototype.$modal = new ModalFactory(Vue);
    Vue.prototype.$modal.register('alert', component('alert'));
    Vue.prototype.$modal.register('confirm', component('confirm'));
    Vue.prototype.$modal.register('prompt', component('prompt'));
};