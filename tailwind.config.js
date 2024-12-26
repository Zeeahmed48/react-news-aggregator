import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        'dm-sans': ['DM Sans', 'sans-serif']
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          md: '22px'
        }
      },
      colors: {
        primary: '#5551FF',
        'primary-medium': '#DEDEE9',
        'primary-semi-light': '#EEEEFF',
        'primary-light': '#F7F7FF',
        transparent: 'transparent'
      },
      boxShadow: {
        card: '0 1px 8px 0 #EFEFF8'
      }
    }
  },
  plugins: [forms]
};
