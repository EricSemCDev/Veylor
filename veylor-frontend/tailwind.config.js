const plugin = require('tailwindcss/plugin');

module.exports = {
  content: ["./veylor-frontend/src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ['var(--font-inter)'], // aqui o fallback é essencial
      },
      boxShadow: {
        'inner-custom': 'inset 0px 4px 20px rgba(255, 0, 0, 0.25)',
      },
    },
  },
  plugins: [
    plugin(function ({ addComponents }) {
      addComponents({
        '.inset-responsive': {
          '@apply top-4 bottom-4 left-4 right-4 sm:top-6 sm:bottom-6 sm:left-6 sm:right-6 lg:top-10 lg:bottom-10 lg:left-10 lg:right-10': {},
        }
      });
    }),
  ],
};
