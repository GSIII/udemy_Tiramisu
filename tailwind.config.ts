import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/stories/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        'main-purple': '#6224FD',
        'sub-purple': '#8655FF',
        'light-purple': '#F5F1FF',
        'gray-purple': '#82829B',
        'dark-gray': '#444444',
        'disabled': '#D0D6E0',
        'middle-gray': '#DDDDDD',
        'light-gray': '#F5F5F5',
      }
    },
  },
  plugins: [],
};
export default config;
