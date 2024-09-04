/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {},
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
  ],
};
