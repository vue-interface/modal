import { h } from 'vue';
import Modal from './Modal.vue';
import ModalFactory from './ModalFactory';

export default (app: any, props = {}) => {
    const factory = new ModalFactory(app, props);

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
            default: () => h(content, Object.assign({
                ref: 'content'
            }))
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
            default: () => h(content, Object.assign({
                ref: 'content',
            }))
        });
    });

    app.provide('modal', factory);
    app.config.globalProperties.$modal = factory;
};