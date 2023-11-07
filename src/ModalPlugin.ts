import { h, type InjectionKey } from 'vue';
import { createModal, type ModalFactory } from './helpers.js';
import Modal, { type ModalProps } from './ModalLegacy.vue';

export const modals = {
    alert: Symbol() as InjectionKey<ModalFactory>,
    confirm: Symbol() as InjectionKey<ModalFactory>
};

export default (app: any, globalProps?: ModalProps<unknown>) => {
    const alert = createModal(app, ({ title, content, props, resolve }) => {
        return h(Modal, {
            title,
            show: true,
            type: 'alert',
            resolve,
            ...globalProps, ...props
        }, {
            default: () => h(content, {
                ref: 'content'
            })
        });
    });

    app.provide(modals.alert, alert);

    const confirm = createModal(app, ({ title, content, props, resolve }) => {
        return h(Modal, {
            title,
            show: true,
            type: 'confirm',
            resolve,
            ...globalProps, ...props
        }, {
            default: () => h(content, {
                ref: 'content',
            })
        });
    });

    app.provide(modals.confirm, confirm);
};