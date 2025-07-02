module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'adme': {
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#facc15',
          500: '#eab308',
          600: '#ca8a04',
          700: '#a16207',
          800: '#854d0e',
          900: '#713f12',
          950: '#422006',
        },
        'adme-blue': {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        }
      },
      animation: {
        'rotate-border': 'rotate-border 3s linear infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        'rotate-border': {
          '0%': { 
            background: 'conic-gradient(from 0deg, #eab308, #3b82f6, #eab308)',
            borderRadius: '50%'
          },
          '100%': { 
            background: 'conic-gradient(from 360deg, #eab308, #3b82f6, #eab308)',
            borderRadius: '50%'
          }
        },
        'pulse-glow': {
          '0%': { 
            boxShadow: '0 0 5px #eab308, 0 0 10px #eab308, 0 0 15px #eab308'
          },
          '100%': { 
            boxShadow: '0 0 10px #eab308, 0 0 20px #eab308, 0 0 30px #eab308'
          }
        }
      }
    },
  },
  plugins: [],
  safelist: [
    'bg-adme-500',
    'hover:bg-adme-500',
    'text-adme-500',
    'hover:text-adme-500',
    'hover:text-white',
    'bg-adme-600',
    'hover:bg-adme-600',
    'text-adme-600',
    'hover:text-adme-600',
    'bg-adme-blue-500',
    'hover:bg-adme-blue-500',
    'text-adme-blue-500',
    'hover:text-adme-blue-500',
    'border-adme-500',
    'hover:border-adme-500',
    'border-adme-blue-500',
    'hover:border-adme-blue-500',
  ],
} 