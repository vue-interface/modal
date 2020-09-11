
export default function(call) {
    return {
        beforeCreate(...args) {
            call(this, 'beforeCreate', ...args);
        },
        created(...args) {
            call(this, 'created', ...args);
        },
        beforeMount(...args) {
            call(this, 'beforeMount', ...args);
        },
        mounted(...args) {
            call(this, 'mounted', ...args);
        },
        beforeUpdate(...args) {
            call(this, 'beforeUpdate', ...args);
        },
        updated(...args) {
            call(this, 'updated', ...args);
        },
        activated(...args) {
            call(this, 'activated', ...args);
        },
        deactivated(...args) {
            call(this, 'deactivated', ...args);
        },
        beforeDestroy(...args) {
            call(this, 'beforeDestroy', ...args);
        },
        destroyed(...args) {
            call(this, 'destroyed', ...args);
        },
        errorCaptured(...args) {
            call(this, 'errorCaptured', ...args);
        }
    };
};