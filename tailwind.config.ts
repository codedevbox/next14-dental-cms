import type { Config } from "tailwindcss";
import {nextui} from "@nextui-org/react";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        colorfrom: '#2563EB', //blue-600
        colorto: '#D946EF', //fuchsia-500
        colorfromdark: '#1D4ED8', //blue-700
        colortodark: '#C026D3', //fuchsia-600
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      screens: {
        'xs-sm1': { 'min': '475px', 'max': '557px' },
        'xs-sm2': { 'min': '558px', 'max': '639px' },

        'sm-md1': { 'min': '640px', 'max': '671px' },
        'sm-md2': { 'min': '672px', 'max': '703px' },
        'sm-md3': { 'min': '704px', 'max': '735px' },
        'sm-md4': { 'min': '736px', 'max': '767px' },

        'md-lg1': { 'min': '768px', 'max': '831px' },
        'md-lg2': { 'min': '832px', 'max': '895px' },
        'md-lg3': { 'min': '896px', 'max': '959px' },
        'md-lg4': { 'min': '960px', 'max': '1023px' },

        'lg-xl1': { 'min': '1024px', 'max': '1087px' },
        'lg-xl2': { 'min': '1088px', 'max': '1151px' },
        'lg-xl3': { 'min': '1152px', 'max': '1215px' },
        'lg-xl4': { 'min': '1216px', 'max': '1279px' },

        'xl-2xl1': { 'min': '1280px', 'max': '1343px' },
        'xl-2xl2': { 'min': '1344px', 'max': '1407px' },
        'xl-2xl3': { 'min': '1408px', 'max': '1471px' },
        'xl-2xl4': { 'min': '1472px', 'max': '1535px' },
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
export default config;
