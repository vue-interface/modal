import Modal from './Modal.vue';
import ModalFactory from './ModalFactory.js';
import merge from 'deepmerge';

function wrap(subject, wrapper) {
    return (...args) => {
        wrapper(subject, ...args);
    };
}

export default function(Vue, options = {}) {
    Vue.prototype.$modal = new ModalFactory(Vue, options);

    /**
     * Dispatch an alert modal.
     * 
     * @property {String} title
     * @property {Fuction|String} content
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
     * @property {Fuction|String} content
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