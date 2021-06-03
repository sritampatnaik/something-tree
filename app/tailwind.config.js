const colors = require('tailwindcss/colors')

module.exports = {
    purge: { 
        content: ['./public/**/*.html', './src/**/*.vue'],
        // These options are passed through directly to PurgeCSS
        options: {
            safelist: {
                standard: [/red/, /yellow/, /green/, /sm:gridcols-/],
            }
        }
    },
    darkMode: false, // or 'media' or 'class'
    theme: {
        colors: {
            transparent: 'transparent',
            current: 'currentColor',
            black: colors.black,
            white: colors.white,
            gray: colors.trueGray,
            indigo: colors.indigo,
            red: colors.rose,
            green : colors.lime,
            orange: colors.orange,
            yellow: colors.amber,
        },
    },
    variants: {
        extend: {
            opacity: ['disabled'],
        },
    },
    plugins: [
        require('@tailwindcss/forms')
    ],
}
