module.exports = {
    content: [
        "./index.html",
        "./demo/*.vue"
    ],
    theme: {
        extend: {},
    },
    plugins: [
        require('@vue-interface/btn/tailwindcss'),
        require('./tailwindcss')
    ],
    safelist: [
        ...require('@vue-interface/btn/tailwindcss/safelist')(),
        ...require('./tailwindcss/safelist')()
    ]
};