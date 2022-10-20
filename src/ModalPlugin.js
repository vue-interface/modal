import Modal from './Modal.vue';
import ModalFactory from './ModalFactory.js';

export const factory = new ModalFactory();

/**
 * Dispatch an alert modal.
 * 
 * @property {String} title
 * @property {Function|String} content
 * @property {Object} props
 */
factory.register('alert', (createElement, { resolve }, title, content, props) => {
    return createElement(Modal,
        Object.assign({
            resolve(e, button, modal, ...args) {
                return resolve(...args).then(() => this.close());
            },
            show: true,
            title,
            type: 'alert',
        }, props),
        () => createElement(content, {
            ref: 'content'
        })
    );
});

/**
 * Dispatch a confirmation modal.
 * 
 * @property {String} title
 * @property {Function|String} content
 * @property {Object} props
 */
factory.register('confirm', (createElement, { resolve }, title, content, props) => {
    return createElement(Modal,
        Object.assign({
            resolve(e, button, modal, ...args) {
                return resolve(...args).then(() => this.close());
            },
            show: true,
            title,
            type: 'confirm'
        }, props),
        () => createElement(content, {
            ref: 'content'
        })
    );
});

export default app => {
    app.config.globalProperties.$modal = factory;
};