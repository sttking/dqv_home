import type { Config } from 'tailwindcss'

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Tailwind v4에서는 borderColor가 아닌 border.color 경로로 접근
      border: {
        color: {
          DEFAULT: 'var(--border)',
        },
      },
      fontFamily: {
        'noto-sans-kr': ['var(--font-noto-sans-kr)'],
      },
      colors: {
        border: 'var(--border)',
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        // 나머지 색상도 여기에 추가
      },
    },
  },
  plugins: [],
} satisfies Config
