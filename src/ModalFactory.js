import Modal from './Modal.vue';

export default class ModalFactory {

    constructor(vue) {
        this.$vue = vue;
    }

    register(type, callback) {
        return this[type] = (title, content, props = {}) => {
            const ModalWrapper = this.$vue.extend(Modal);

            const promise = new Promise(function(resolve, reject) {
                new ModalWrapper(Object.assign({
                    el: document.body.appendChild(document.createElement('div')),
                    render(h) {
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
                }));
            });

            return promise;
        };
    }

}