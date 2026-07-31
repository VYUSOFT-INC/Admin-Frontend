import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Brand / semantic tokens shared across every admin screen.
        primary: {
          DEFAULT: "#d6002e",
          soft: "#fbe5ea",
          light: "#ffe1ea",
          lighter: "#ffecef",
        },
        ink: "#001639",
        border: {
          DEFAULT: "#f0d9e2",
        },
        surface: {
          DEFAULT: "#ffffff",
          tint: "#fff7fa",
          page: "#fff5f7",
        },
        success: {
          DEFAULT: "#16a34a",
          light: "#e3f4e9",
        },
        warning: {
          DEFAULT: "#b45309",
          light: "#fef1dd",
        },
        danger: {
          DEFAULT: "#d6002e",
          light: "#fbe5ea",
        },
      },
      fontFamily: {
        sans: ["var(--font-dm-sans)", "Arial", "Helvetica", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
