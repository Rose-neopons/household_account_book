/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        ink: "#111827",
        guard: {
          50: "#F8FAFC",
          100: "#E2E8F0",
          500: "#0EA5E9",
          700: "#0369A1",
          900: "#0F172A"
        },
        roast: "#F97316"
      }
    }
  },
  plugins: []
};
