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
                show: true,
                title,
                type: 'alert'
            },
            on: {
                close: () => resolve()
            }
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
        let success = false;

        const resolver = (resume, value) => {
            resume(success = typeof value === 'undefined' ? success : !!value);
        };

        return createElement(Modal, merge({
            props: {
                show: true,
                title,
                type: 'confirm'
            },
            on: {
                cancel: (e, button, modal, resume) => {
                    if(typeof props.cancel === 'function') {
                        props.cancel(e, button, modal, wrap(resume, resolver));
                    }
                },
                close: (e, button, modal, resume) => {
                    if(typeof props.close === 'function') {
                        props.close(e, button, modal, wrap(resume, resolver));
                    }
                    else {
                        resolve(success);
                    }
                },
                confirm: (e, button, modal, resume) => {
                    success = true;

                    if(typeof props.confirm === 'function') {
                        props.confirm(e, button, modal, wrap(resume, resolver));
                    }
                }
            }
        }, props), createElement(content, props));
    });
};