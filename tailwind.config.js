/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#080B12',
          secondary: '#101725',
          card: '#111827',
        },
        brand: {
          blue: '#168BFF',
          cyan: '#45B3FF',
          dark: '#0B132B',
          glow: 'rgba(22, 139, 255, 0.35)',
        },
        surface: {
          DEFAULT: '#111827',
          border: '#263449',
          borderLight: '#374967',
          cardHover: '#162238',
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#A5B1C2',
          muted: '#6B7A90',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['"Space Grotesk"', 'sans-serif'],
      },
      boxShadow: {
        'glow-sm': '0 0 15px rgba(22, 139, 255, 0.25)',
        'glow': '0 0 25px rgba(22, 139, 255, 0.4)',
        'glow-lg': '0 0 40px rgba(22, 139, 255, 0.55)',
        'glow-cyan': '0 0 25px rgba(69, 179, 255, 0.4)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      backgroundImage: {
        'radial-gradient': 'radial-gradient(circle at center, var(--tw-gradient-stops))',
        'hero-glow': 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(22, 139, 255, 0.25), transparent)',
        'card-glow': 'radial-gradient(600px circle at var(--mouse-x, 0) var(--mouse-y, 0), rgba(22, 139, 255, 0.08), transparent 40%)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
