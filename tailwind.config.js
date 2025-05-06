/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#6366f1",
          DEFAULT: "#4f46e5",
          dark: "#4338ca",
        },
        accent: {
          light: "#f472b6",
          DEFAULT: "#ec4899",
          dark: "#db2777",
        },
        background: {
          light: "#1e1b4b",
          DEFAULT: "#1e1b4b",
          dark: "#121139",
        },
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(135deg, #6366f1 0%, #4338ca 100%)",
        "gradient-accent": "linear-gradient(135deg, #f472b6 0%, #db2777 100%)",
        "gradient-background":
          "linear-gradient(135deg, #1e1b4b 0%, #121139 100%)",
        "gradient-text": "linear-gradient(135deg, #ffffff 0%, #c7d2fe 100%)",
        "gradient-card":
          "linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(219, 39, 119, 0.1) 100%)",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Poppins", "system-ui", "sans-serif"],
      },
      fontSize: {
        "7xl": "5rem",
        "8xl": "6rem",
        "9xl": "7rem",
      },
      backdropBlur: {
        xs: "2px",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-delayed": "float 6s ease-in-out 3s infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
      },
      boxShadow: {
        glow: "0 0 20px rgba(99, 102, 241, 0.25)",
        "glow-lg": "0 0 30px rgba(99, 102, 241, 0.3)",
        "glow-accent": "0 0 20px rgba(236, 72, 153, 0.25)",
      },
    },
  },
  plugins: [],
};
