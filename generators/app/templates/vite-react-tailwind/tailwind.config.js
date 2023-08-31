/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bglinecolor: 'rgba(255,255,255,.3)',
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
