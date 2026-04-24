/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        app: {
          bg: "#FFF8FC",
          peach: "#FFE4EC",
          peachSoft: "#FFF1F7",
          mint: "#DDFBF1",
          mintSoft: "#EAFBF4",
          blueSoft: "#EAF7FF",
          skySoft: "#DDF4FF",
          lavenderSoft: "#F6F1FF",
          butter: "#FFF7D6",
          cream: "#FFFDFB",
          white: "#FFFFFF",
          rose: "#FF8FB8",
          roseDeep: "#FF6FA6",
          violet: "#6650A4",
          violetDeep: "#362F63",
          text: "#716D91",
          textStrong: "#3F3564",
          line: "#F4E8F7",
          blue: "#7DA6FF",
          mintDeep: "#1E6D63",
          rainPink: "#D3638F",
          rainBlue: "#93C5FD"
        },
        ink: "#111827"
      },
      fontFamily: {
        guard: ["MemomentKkukkukk"]
      }
    }
  },
  plugins: []
};
