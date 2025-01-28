/** @type {import('tailwindcss').Config} */

export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
        // Define custom colors using CSS variables
        colors: {
            'bg-body': 'var(--bg-white)',
            'primary-black': 'var(--primary-black)',
            'primary-grey': 'var(--primary-grey)',
            'primary-blue': 'var(--primary-blue)',
            'primary-lemon-green': 'var(--primary-lemon-green)',
            'primary-red': 'var(--primary-red)',
            'text-grey': 'var(--text-grey)',
            'placeholder-grey': 'var(--placeholder-grey)',
            'input-bg': 'var(--input-bg)',
            'input-active-bg': 'var(--input-active-bg)',
            'input-border': 'var(--input-border)',
            'input-error-bg': 'var(--input-error-bg)',
        },
        // Custom spacing
        spacing: {
            'header': 'var(--header-height)',
            'footer': 'var(--footer-height)',
        },
        // Custom breakpoints
        screens: {
            'xs': '475px',
        },
        // Custom font families
        fontFamily: {
            'primary': 'var(--font-primary)',
            'secondary': 'var(--font-secondary)',
        },
        },
    },
    plugins: [],
}