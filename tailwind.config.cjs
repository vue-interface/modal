module.exports = {
    content: [
        './index.html',
        './demo/*.vue'
    ],
    theme: {
        extend: {},
    },
    plugins: [
        require('@vue-interface/btn/tailwindcss')(),
        require('./tailwindcss/index.cjs')
    ],
    safelist: [
        ...require('./tailwindcss/safelist.cjs')()
    ]
};