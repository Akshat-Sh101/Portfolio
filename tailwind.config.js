/** @type {import('tailwindcss').Config} */
export const content = [
    './src/**/*.{js,jsx,ts,tsx}', // Scans all JS, JSX, TS, and TSX files in the src folder
];
export const theme = {
    extend: {
        // Extend default Tailwind theme for customizations
        colors: {
            // Custom colors to match the black, gray, and white theme
            'dark-bg': '#1a1a1a', // Background color used in Project.jsx
            'gradient-start': '#111827', // Equivalent to gray-900
            'gradient-end': '#1f2937', // Equivalent to gray-800
        },
        fontFamily: {
            // Match the font styles used in the component
            sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
            serif: ['Merriweather', 'Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
        },
        boxShadow: {
            // Custom shadow for portfolio cards
            'card': '0 5px 10px rgba(0, 0, 0, 0.2)',
            'card-hover': '0 10px 20px rgba(0, 0, 0, 0.3)',
        },
        screens: {
            // Default breakpoints (ensuring sm, md, lg work as expected)
            'sm': '640px',
            'md': '768px',
            'lg': '1024px',
            'xl': '1280px',
            '2xl': '1536px',
        },
    },
};
export const plugins = [];