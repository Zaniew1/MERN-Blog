/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow:{
        myShadow: '0px 3px 18px -9px rgba(66, 68, 90, 1)',
      }
    },
  },
  plugins: [],
}