module.exports = {
  mode: 'jit',
  purge: {
    enable: true,
    content: [
      './index.html',
      './src/**/*.{vue,js,ts,jsx,tsx}',
      './safelist.txt'
    ],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
