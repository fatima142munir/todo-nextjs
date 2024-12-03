import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        containerColor: "#d5a2bb",
        light: "#fbecf7",
        dark: "#883871",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
} satisfies Config;
