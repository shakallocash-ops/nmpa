import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1rem", md: "2rem" },
      screens: { "2xl": "1280px" }
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0B1F33",
          hover: "#0D2B4A",
          dark: "#061220"
        },
        navy: {
          DEFAULT: "#0B1F33",
          hover: "#0D2B4A",
          dark: "#061220"
        },
        secondary: {
          DEFAULT: "#0B6B4F",
          hover: "#0E7D5C",
          light: "#E6F4EF"
        },
        forest: {
          DEFAULT: "#0B6B4F",
          hover: "#0E7D5C",
          light: "#E6F4EF"
        },
        accent: {
          DEFAULT: "#C6A15B",
          light: "#E8D5A3",
          dark: "#A8873A"
        },
        gold: {
          DEFAULT: "#C6A15B",
          light: "#E8D5A3",
          dark: "#A8873A"
        },
        paper: "#FFFFFF",
        ivory: "#F8F6F0",
        mist: "#F3F2EF",
        sand: "#EDE8DE",
        ink: {
          DEFAULT: "#1A1A1A",
          muted: "#4A4A4A",
          // #7A7A7A only reaches 4.29:1 on white; #6E6E6E clears AA on white and ivory.
          faint: "#6E6E6E"
        },
        line: {
          DEFAULT: "#E0DCD5",
          strong: "#C0B8AD"
        },
        success: "#2D6A4F",
        warning: "#E87A3E",
        error: "#C0392B",
        info: "#4A90D9"
      },
      fontFamily: {
        serif: ["var(--font-merriweather)", "Georgia", "Cambria", "serif"],
        sans: ["var(--font-inter)", "system-ui", "-apple-system", "sans-serif"],
        display: ["var(--font-inter)", "system-ui", "sans-serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"]
      },
      fontSize: {
        display: [
          "clamp(2.5rem, 4.6vw, 3.5rem)",
          { lineHeight: "1.1", letterSpacing: "-0.02em" }
        ],
        h1: [
          "clamp(2rem, 3.6vw, 2.5rem)",
          { lineHeight: "1.15", letterSpacing: "-0.015em" }
        ],
        h2: [
          "clamp(1.75rem, 2.8vw, 2rem)",
          { lineHeight: "1.2", letterSpacing: "-0.01em" }
        ],
        h3: ["clamp(1.25rem, 2vw, 1.5rem)", { lineHeight: "1.3" }],
        h4: ["clamp(1.125rem, 1.4vw, 1.25rem)", { lineHeight: "1.4" }],
        "body-lg": ["1.125rem", { lineHeight: "1.7" }],
        body: ["1rem", { lineHeight: "1.65" }],
        small: ["0.875rem", { lineHeight: "1.6" }],
        caption: ["0.75rem", { lineHeight: "1.5", letterSpacing: "0.06em" }]
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        30: "7.5rem"
      },
      maxWidth: {
        content: "1280px",
        prose: "72ch"
      },
      borderRadius: {
        btn: "4px",
        card: "8px"
      },
      boxShadow: {
        card: "0 2px 8px rgba(11, 31, 51, 0.06)",
        "card-hover": "0 12px 28px rgba(11, 31, 51, 0.12)",
        header: "0 1px 3px rgba(11, 31, 51, 0.08)",
        inset: "inset 0 -1px 0 rgba(11, 31, 51, 0.08)"
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" }
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" }
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" }
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" }
        }
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) both",
        "fade-in": "fade-in 0.5s ease-out both",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out"
      }
    }
  },
  plugins: []
};

export default config;
