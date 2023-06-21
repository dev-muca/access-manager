/** @type {import('tailwindcss').Config} */

import plugin from "tailwindcss/plugin";

export const content = [
  "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
];
export const theme = {
  extend: {},
};
export const plugins = [
  plugin(function ({ addUtilities }) {
    addUtilities({
      ".scrollbar-none": {
        /* IE and Edge */
        "-ms-overflow-style": "none",

        /* Firefox */
        "scrollbar-width": "none",

        /* Safari and Chrome */
        "&::-webkit-scrollbar": {
          display: "none",
        },
      },
    });
  }),
];
