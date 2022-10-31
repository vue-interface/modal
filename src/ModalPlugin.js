import { h } from 'vue';
import Modal from './Modal.vue';
import ModalFactory from './ModalFactory';

export default app => {
    const factory = new ModalFactory(app);

    /**
     * Dispatch an alert modal.
     * 
     * @property {String} title
     * @property {Function|String} content
     * @property {Object} props
     */
    factory.register('alert', (createElement, { resolve }, title, content, props) => {
        return h(Modal, {
            title,
            show: true,
            type: 'alert'
        }, {
            default: () => h(content, {
                ref: 'content'
            })
        });

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
    factory.register('confirm', ({ title, content, props }) => {
        return h(Modal, Object.assign({
            title,
            show: true,
            type: 'confirm'
        }, props), {
            default: () => h(content, {
                ref: 'content'
            })
        });
    });

    app.provide('modal', factory);
};