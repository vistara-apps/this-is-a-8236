/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: 'hsl(210 40% 96%)',
        accent: 'hsl(190 80% 50%)',
        primary: 'hsl(240 78% 55%)',
        surface: 'hsl(0 0% 100%)',
        'text-primary': 'hsl(210 40% 20%)',
        'text-secondary': 'hsl(210 40% 40%)',
        'dark-bg': 'hsl(220 30% 8%)',
        'dark-surface': 'hsl(220 30% 12%)',
        'dark-card': 'hsl(220 30% 15%)',
        'dark-text': 'hsl(210 40% 90%)',
        'dark-text-secondary': 'hsl(210 40% 70%)',
      },
      borderRadius: {
        'lg': '16px',
        'md': '10px',
        'sm': '6px',
        'xl': '24px',
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px',
        'xxl': '32px',
      },
      boxShadow: {
        'card': '0 4px 12px hsla(210, 40%, 10%, 0.08)',
        'modal': '0 12px 32px hsla(210, 40%, 10%, 0.16)',
        'dark-card': '0 4px 12px hsla(220, 30%, 0%, 0.3)',
      },
      animation: {
        'fade-in': 'fadeIn 250ms cubic-bezier(0.22,1,0.36,1)',
        'slide-up': 'slideUp 250ms cubic-bezier(0.22,1,0.36,1)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}