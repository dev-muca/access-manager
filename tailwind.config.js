/** @type {import('tailwindcss').Config} */

export const content = [
  "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
];

export const theme = {
  extend: {
    colors: {
      primary: "#265D73",
      secundary: "#408EA0",
      tertiary: "#77C4D6",
    },
  },
};

export const plugins = [];
