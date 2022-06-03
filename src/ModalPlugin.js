import Modal from './Modal.vue';
import ModalFactory from './ModalFactory.js';
import merge from 'deepmerge';

export default Vue => {
    Vue.prototype.$modal = new ModalFactory(Vue);

    /**
     * Dispatch an alert modal.
     * 
     * @property {String} title
     * @property {Function|String} content
     * @property {Object} props
     */
    Vue.prototype.$modal.register('alert', (createElement, { resolve }, title, content, props) => {
        return createElement(Modal, {
            props: {
                resolve(e, button, modal, ...args) {
                    return resolve(...args).then(() => this.close());
                },
                show: true,
                title,
                type: 'alert'
            },
        }, createElement(content, props));
    });

    /**
     * Dispatch a confirmation modal.
     * 
     * @property {String} title
     * @property {Function|String} content
     * @property {Object} props
     */
    Vue.prototype.$modal.register('confirm', (createElement, { resolve }, title, content, props) => {
        return createElement(Modal, merge({
            props: {
                resolve(e, button, modal, ...args) {
                    return resolve(...args).then(() => this.close());
                },
                show: true,
                title,
                type: 'confirm',
            }
        }, props), createElement(content));
    });
};