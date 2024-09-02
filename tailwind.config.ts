import type { Config } from 'tailwindcss';
import { nextui } from '@nextui-org/react';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/hooks/**/*.{js,ts,jsx,tsx,mdx}',
    './src/stories/**/*.{js,ts,jsx,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-custom':
          'linear-gradient(191deg, #E4E4FF -7.98%, #FFF 44.59%)',
      },
      colors: {
        'main-purple': '#6224FD',
        'sub-purple': '#8655FF',
        'light-purple': '#F5F1FF',
        'gray-purple': '#82829B',
        'dark-gray': '#444444',
        disabled: '#D0D6E0',
        'middle-gray': '#DDDDDD',
        'light-gray': '#F5F5F5',
      },
      fontWeight: {
        regular: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
      keyframes: {
        rocketMove: {
          '0%': { transform: 'translate(-65%, -60%)' },
          '50%': { transform: 'translate(-100%, -100%)' },
          '100%': { transform: 'translate(-65%, -60%)' },
        },
        messageMove: {
          '0%': { transform: 'translateY(0%)' },
          '50%': { transform: 'translateY(-15%)' },
          '100%': { transform: 'translateY(0%)' },
        },
      },
      animation: {
        rocketMove: 'rocketMove 3.5s linear infinite',
        messageMove: 'messageMove 2s linear infinite',
      },
    },
  },
  darkMode: 'class',
  plugins: [nextui()],
};
export default config;
