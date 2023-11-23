/** @type {import('tailwindcss').Config} */
import lineClamp from '@tailwindcss/line-clamp';
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow:{
        myShadow: '0px 3px 18px -9px rgba(66, 68, 90, 1)',
      },
      backgroundImage: {
        'duck-picture': "url('src/assets/duck.jpg')",
        'me-picture': "url('/src/assets/ja.jpg')",
      },
      aspectRatio: {
        '1/2': '1 / 2',
        '2/1': '2 / 1',
      },

    },
  },
  plugins: [
    lineClamp
    // ...
  ],
}