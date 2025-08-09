/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./popup.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryStart: '#4B29FF',
        primaryEnd: '#9B29FF',
        neutralLight: '#F5F6F8',
        neutralDark: '#1E1F22'
      },
      fontFamily: {
        sans: ['Inter Tight', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      borderRadius: {
        btn: '4px',
        panel: '6px'
      }
    }
  },
  plugins: []
};
