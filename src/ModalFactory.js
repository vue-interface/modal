import { h,  createApp } from 'vue';
import Modal from './Modal.vue';

export default class ModalFactory {

    register(type, callback) {
        return this[type] = (title, content, props = {}) => {
            const promise = new Promise(function(resolve, reject) {
                createApp({
                    render() {
                        return callback((content, ...args) => {
                            if(typeof content === 'string') {
                                return content;
                            }
                            if(typeof content === 'function') {
                                return [].concat(content(h, this));
                            }

                            return h(content, ...args);
                        }, {
                            promise: () => promise,
                            resolve: value => {
                                resolve(value);

                                return promise;
                            },
                            reject: value => {
                                reject(value);

                                return promise;
                            },
                        }, title, content, Object.assign({}, props));
                    }
                })
                    .mount(document.body.appendChild(document.createElement('div')));
            });

            return promise;
        };
    }

}