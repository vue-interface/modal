<script>
export default {
        
    functional: true,

    props: {
        tag: {
            type: String,
            default: 'h3'
        }
    },

    render(h, context) {
        return h(context.props.tag, {
            staticClass: 'modal-title'
        }, context.slots().default);
    }

};
</script>
