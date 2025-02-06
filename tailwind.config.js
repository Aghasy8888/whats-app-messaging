/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        // roboto: ['Roboto', 'sans-serif'],
      },
      transitionDuration: {
        350: '350ms',
      },
      colors: {
        black_1: '#111b21',
        black_2: 'rgb(42, 57, 66)',
        black_3: '#0b141a',
        darkGray: '#212121',        
        lighterGray: 'rgb(32, 44, 51)',
        grayV_1: 'rgb(59, 74, 84)',
        grayV_2: 'rgba(134, 150, 160, .15)',
        grayV_3: '#2a3942',
        grayV_4: '#667781',
        grayV_5: 'rgb(233, 237, 239)',
        middleGray: '#424242',
        whiteV1: 'rgb(209, 215, 219)',
        whiteV2: '#938481',
        modalBackground: 'rgba(46, 49, 46, 0.5)',
        incomingBackground: '#202c33',
        green: 'rgb(0, 168, 132, .8)',
        greenV_2: 'rgb(0, 168, 132, 1)',
        greenV_3: 'rgb(0, 168, 132)',
        greenV_4: 'rgb(0, 92, 75)',
      },
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant('autofill', '&:-webkit-autofill');
    },
  ],
};
