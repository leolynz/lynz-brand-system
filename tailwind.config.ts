import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.mdx',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#0047FF',
          secondary: '#00D4FF',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      typography: (theme: (path: string) => string) => ({
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: theme('colors.neutral.800'),
            a: {
              color: theme('colors.neutral.900'),
              textUnderlineOffset: '3px',
              '&:hover': {
                color: theme('colors.neutral.600'),
              },
            },
            'h1, h2, h3, h4': {
              color: theme('colors.neutral.900'),
              fontWeight: '600',
            },
            code: {
              color: theme('colors.neutral.800'),
              backgroundColor: theme('colors.neutral.100'),
              borderRadius: '4px',
              padding: '2px 6px',
              fontWeight: '400',
              '&::before': { content: 'none' },
              '&::after': { content: 'none' },
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

export default config
