module.exports = {
    content: [
        './index.html',
        './demo/*.vue',
        './src/*.vue'
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