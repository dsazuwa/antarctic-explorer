import type { Config } from 'tailwindcss';

const body = { height: '1.75em', spacing: '-.01em' };
const heading = { height: '1.5em', spacing: '-.02em' };

const config = {
  mode: 'jit',
  darkMode: ['class'],
  content: ['./src/**/*.{ts,tsx}'],
  prefix: '',
  plugins: [require('tailwindcss-animate')],
  theme: {
    container: {
      center: true,
      padding: '1.5rem',
      screens: {
        '2xl': '1536px',
      },
    },
    extend: {
      fontSize: {
        xxs: '0.625rem',
        sm: ['0.9rem', body.height],
        base: ['1rem', body.height],
        lg: ['1.2rem', body.height],
        xl: ['1.4rem', body.height],
      },

      letterSpacing: {
        heading: heading.spacing,
        body: body.spacing,
      },

      lineHeight: {
        heading: heading.height,
        body: body.height,
      },

      spacing: {
        '3xs': '0.25rem',
        '2xs': '0.5rem',
        xs: '0.75rem',
        sm: '1rem',
        md: '1.5rem',
        lg: '2rem',
        xl: '2.5rem',
        '2xl': '5rem',
        '3xl': '10rem',
        'layout-sm': '5vh',
        layout: '10vh',
        'layout-lg': '15vh',
      },

      boxShadow: {
        icon: '0px 0px 12px rgba(0, 51, 102, 0.4)',
        warm: 'rgba(50, 50, 105, 0.15) 0px 2px 5px 0px, rgba(0, 0, 0, 0.05) 0px 1px 1px 0px',
        intense: 'rgba(17, 17, 26, 0.1) 0px 0px 16px',
      },

      colors: {
        misty_blue: '#E7ECEF',
        navy: '#14273E',
        sky_blue: '#6096BA',
        pale_azure: '#A3CEF1',
        stone_gray: '#8B8C89',
        light_gray: '#F3F5F7',
        lighter_gray: '#F7F9FB',

        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',

        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },

        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },

        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },

        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },

        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },

        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },

        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },

      borderRadius: {
        lg: '16px',
        md: '8px',
        sm: '4px',
      },

      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },

      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
} satisfies Config;

export default config;
