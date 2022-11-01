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
    factory.register('alert', ({ title, content, props }) => {
        return h(Modal, Object.assign({
            title,
            show: true,
            type: 'alert'
        }, props), {
            default: () => h(content, {
                ref: 'content'
            })
        });
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