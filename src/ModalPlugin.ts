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
        return h(Modal, {
            title,
            show: true,
            type: 'alert'
        }, {
            default: () => h(content, Object.assign({
                ref: 'content'
            }, props))
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
        return h(Modal, {
            title,
            show: true,
            type: 'confirm'
        }, {
            default: () => h(content, Object.assign({
                ref: 'content',
            }, props))
        });
    });

    app.provide('modal', factory);
    app.config.globalProperties.$modal = factory;
};