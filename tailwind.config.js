/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "node_modules/flowbite/**/*.js"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "orange-primary": "#FF6B35",
        "yellow-secondary": "#FFD23F",
      },
    },
  },
  variants: {
    extend: {
      margin: ["rtl"], // Add any other utility classes you need RTL support for
    },
  },
  plugins: [
    require("flowbite/plugin"),
    function ({ addBase }) {
      addBase({
        ".rtl": {
          direction: "rtl",
        },
        ".ltr": {
          direction: "ltr",
        },
      });
    },
    require("daisyui"),
  ],
  daisyui: {
    themes: ["dark"],
  },
};
