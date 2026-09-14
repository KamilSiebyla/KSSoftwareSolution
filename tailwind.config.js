/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './privacy.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: [
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
      },
      colors: {
        ink: '#0b1120',
        accent: '#22d3ee',
      },
      backgroundImage: {
        // Single source of truth for the accent/fuchsia/violet brand
        // gradient, used identically by the nav logo, the scroll-to-top
        // button, and the process-step badges (was three copy-pasted
        // `bg-gradient-to-br from-accent via-fuchsia-500 to-violet-600`s).
        'brand-gradient': 'linear-gradient(to bottom right, #22d3ee, #d946ef, #7c3aed)',
      },
      keyframes: {
        blob: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(6%, -8%) scale(1.15)' },
          '66%': { transform: 'translate(-5%, 6%) scale(0.9)' },
        },
      },
      animation: {
        blob: 'blob 16s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
