import type { Config } from 'tailwindcss'
const config: Config = {
  content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}','./components/**/*.{js,ts,jsx,tsx,mdx}','./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        syne: ['var(--font-syne)', 'sans-serif'],
        mono: ['var(--font-dm-mono)', 'monospace'],
        sans: ['var(--font-dm-sans)', 'sans-serif'],
      },
      colors: {
        bg: { DEFAULT: '#050B18', 2: '#0A1628', 3: '#0F1F3A' },
        surface: { DEFAULT: '#112040', 2: '#162850' },
        gold: { DEFAULT: '#F5A623', 2: '#FFD166' },
        accent: { cyan: '#00E5FF', green: '#00E676', red: '#FF5252', purple: '#B388FF' },
        border: { DEFAULT: '#1E3A6A', 2: '#2A4E8A' },
      },
      backgroundImage: {
        'gold-grad': 'linear-gradient(135deg, #F5A623, #FFD166)',
        'cyan-grad': 'linear-gradient(135deg, #00E5FF, #00B4CC)',
        'dark-grad': 'linear-gradient(135deg, #0A1628, #050B18)',
      },
      animation: {
        'ticker': 'ticker 25s linear infinite',
        'pulse-dot': 'pulseDot 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        ticker: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
        pulseDot: { '0%,100%': { opacity: '1' }, '50%': { opacity: '0.3' } },
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
        glow: { '0%,100%': { opacity: '0.6' }, '50%': { opacity: '1' } },
      }
    },
  },
  plugins: [],
}
export default config
