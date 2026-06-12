/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#53B175',
          light: '#6FC88B',
          dark: '#3E955E',
          soft: '#E8F5EC',
        },
        dark: {
          DEFAULT: '#181725',
          muted: '#7C7C7C',
          light: '#B1B1B1',
        },
        bg: {
          light: '#F2F3F2',
          card: '#F2F3F2',
        },
        accent: {
          orange: '#F8A44C',
          purple: '#F3A0FF',
          blue: '#579BFF',
          pink: '#D3B0E0',
          yellow: '#FFF9E2',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
