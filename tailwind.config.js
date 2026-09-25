/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#040B15',
          900: '#07111F', // Deep Navy / near black
          800: '#0E1D33',
          700: '#172B4D',
          600: '#233E6B',
        },
        hvac: {
          blue: '#0B6BFF',
          'blue-hover': '#0056D6',
          'blue-light': '#EBF2FF',
          cyan: '#20C7D9',
          'cyan-dark': '#139BAA',
          'cyan-light': '#E8FBFD',
        },
        surface: {
          offwhite: '#F5F7FA',
          light: '#EEF2F6',
          card: '#FFFFFF',
          darkcard: '#0C1A2E',
          darkborder: '#1E2F4D',
        },
        darktext: '#111827',
      },
      fontFamily: {
        heading: ['"Plus Jakarta Sans"', 'Manrope', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      backgroundImage: {
        'blueprint-grid': "radial-gradient(rgba(11, 107, 255, 0.12) 1px, transparent 0)",
        'dark-grid': "linear-gradient(to right, rgba(255, 255, 255, 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 1px, transparent 1px)",
      },
      backgroundSize: {
        'grid-sm': '24px 24px',
        'grid-md': '48px 48px',
      },
      boxShadow: {
        'subtle': '0 2px 10px rgba(7, 17, 31, 0.04), 0 1px 3px rgba(7, 17, 31, 0.02)',
        'card': '0 8px 30px rgba(7, 17, 31, 0.06)',
        'elevated': '0 20px 40px rgba(7, 17, 31, 0.12)',
        'blue-glow': '0 0 35px rgba(11, 107, 255, 0.25)',
      },
    },
  },
  plugins: [],
}
