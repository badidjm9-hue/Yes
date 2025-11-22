import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          50: "#E6F7FF",
          100: "#BAE7FF",
          200: "#91D5FF",
          300: "#69C0FF",
          400: "#40A9FF",
          500: "#0091FF",
          600: "#006FDD",
          700: "#0050B3",
          800: "#003A8C",
          900: "#002766",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Glassmorphism colors
        glass: {
          base: "rgba(255, 255, 255, 0.1)",
          hover: "rgba(255, 255, 255, 0.15)",
          border: "rgba(255, 255, 255, 0.2)",
        },
        // Custom colors for Volo
        'volo-purple': "#3A006D",
        'volo-blue': "#001F5C", 
        'volo-teal': "#00363D",
        'volo-accent': "#0091FF",
        'volo-success': "#30A46C",
        'volo-warning': "#F5A524",
        'volo-error': "#F03E3E",
      },
      backgroundImage: {
        'volo-gradient': 'radial-gradient(circle at 100% 0%, #3A006D 0%, #001F5C 35%, #00363D 70%, #0A0A0A 100%)',
        'hero-gradient': 'linear-gradient(135deg, rgba(58, 0, 109, 0.3) 0%, rgba(0, 31, 92, 0.3) 50%, rgba(0, 54, 61, 0.3) 100%)',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-up": {
          from: { transform: "translateY(100%)" },
          to: { transform: "translateY(0)" },
        },
        "glow": {
          "0%, 100%": { 
            boxShadow: "0 0 20px rgba(0, 145, 255, 0.3)",
          },
          "50%": { 
            boxShadow: "0 0 30px rgba(0, 145, 255, 0.6)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "slide-up": "slide-up 0.3s ease-out",
        "glow": "glow 2s ease-in-out infinite",
      },
      fontFamily: {
        'heading': ['Poppins', 'sans-serif'],
        'body': ['Inter', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config