/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        pishroBlue: {
          50: '#f0f6ff',
          100: '#e0ecff',
          500: '#0066cc',
          700: '#004499',
          900: '#001a4d',
        },
        pishroGold: '#d4a574',
        pishroSlate: '#64748b',
      },
      fontFamily: {
        sans: ['Inter', 'Roboto', 'system-ui', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};
