/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        display: ['Space Grotesk', 'sans-serif'],
      },
      colors: {
        primary: '#FFD60A',
        secondary: '#FF355E',
        accent: '#00F0FF',
        dark: '#0A0A0A',
        gutter: '#202020',
        surface: '#FFFFFF',
      },
      boxShadow: {
        'comic-sm': '2px 2px 0px 0px #FF355E',
        'comic': '4px 4px 0px 0px #000000',
        'comic-lg': '8px 8px 0px 0px #000000',
        'comic-white': '4px 4px 0px 0px #FFFFFF',
        'neon': '0 0 10px #FF355E, 0 0 20px #FF355E',
      },
      cursor: {
        none: 'none',
      },
      animation: {
        'shake': 'shake 0.5s cubic-bezier(.36,.07,.19,.97) both',
        'speed-lines': 'speed-lines 2s infinite linear',
        'scan': 'scan 1.5s linear 1',
        'spin-slow': 'spin 3s linear infinite',
      },
      keyframes: {
        shake: {
          '10%, 90%': { transform: 'translate3d(-1px, 0, 0)' },
          '20%, 80%': { transform: 'translate3d(2px, 0, 0)' },
          '30%, 50%, 70%': { transform: 'translate3d(-4px, 0, 0)' },
          '40%, 60%': { transform: 'translate3d(4px, 0, 0)' }
        },
        scan: {
          '0%': { top: '-10%' },
          '100%': { top: '110%' }
        },
        'float-chaos': {
          '0%': { transform: 'translate(0,0) rotate(0deg)' },
          '25%': { transform: 'translate(10px, -20px) rotate(2deg)' },
          '50%': { transform: 'translate(-15px, 15px) rotate(-2deg) scale(1.02)' },
          '75%': { transform: 'translate(20px, 5px) rotate(1deg)' },
          '100%': { transform: 'translate(0,0) rotate(0deg)' }
        }
      }
    },
  },
  plugins: [],
}