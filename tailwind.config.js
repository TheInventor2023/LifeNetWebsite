/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'protest': ['"Protest Strike"'],
        'title': ['"Belanosima"']
      },
      backgroundImage: {
        'banner': "url(/banner.jpg)",
      }
    },
  },
  plugins: [],
}

