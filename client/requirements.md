## Packages
(none needed - base stack has everything required including framer-motion and lucide-react)

## Notes
Tailwind Config - extend fontFamily:
fontFamily: {
  sans: ["var(--font-sans)"],
  display: ["var(--font-display)"],
}

Tailwind Config - extend colors:
Add `border` to colors if not present, and ensure `glass` utilities can use `bg-background/X`.

The layout relies on native smooth scrolling: `html { scroll-behavior: smooth; }`
