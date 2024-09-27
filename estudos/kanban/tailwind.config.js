/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: { 
      fontSize: {
        '13px' : '13px'
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      boxShadow: {
        '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
        '4xl': '1px 2px 5px rgba(0, 0, 0, 0.104)'
      },
      borderRadius:{
        '3xl': '3px' 
      },
      height:{
        '10px': '10px',
      }, maxHeight:{
        '100vh-105px': 'calc(100vh - 160px) !important'
      },
      padding:{
        '1px': '1px'
      }
    },
  },
  plugins: [],
};
