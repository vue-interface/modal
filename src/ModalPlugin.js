import Modal from './Modal';
import ModalFactory from './ModalFactory';
import { isObject, isFunction } from '@vue-interface/utils';

function component(type) {
    return {
        resolver: (wrapper, validate) => {
            const { $children: [ modal ] } = wrapper;

            return new Promise((resolve, reject) => {
                const [ content ] = modal.$refs.body.$children;
                
                modal.$on('cancel', reject);
                modal.$on('confirm', event => {
                    const payload = {
                        event, modal, content, resolve, reject
                    };

                    if(isFunction(validate)) {
                        validate(payload);
                    }
                    else {
                        resolve(payload);
                    }
                });
            }).finally(modal.close);
        },
        render: (h, title, content) => {
            return h(Modal, {
                props: {
                    show: true,
                    title,
                    type,
                }
            }, isObject(content) ? [ h(content) ] : content);
        }
    };
}

export default function(Vue, options = {}) {
    Vue.prototype.$modal = new ModalFactory(Vue);
    Vue.prototype.$modal.register('alert', component('alert'));
    Vue.prototype.$modal.register('confirm', component('confirm'));
    Vue.prototype.$modal.register('prompt', component('prompt'));
};