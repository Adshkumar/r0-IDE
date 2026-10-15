/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: '#f7f7f4',
        'canvas-secondary': '#f2f1ed',
        surface: '#ffffff',
        border: '#e6e5e0',
        'border-strong': '#d1d0cb',
        text: {
          primary: '#26251e',
          secondary: '#5c5a52',
          muted: '#8a877e',
        },
        accent: {
          DEFAULT: '#26251e',
          hover: '#3d3b32',
          light: '#f5f4f0',
        },
        amber: {
          DEFAULT: '#b45309',
          hover: '#92400e',
        },
        success: '#16a34a',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Cascadia Code', 'monospace'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
