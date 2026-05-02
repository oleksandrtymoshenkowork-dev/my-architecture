# Anthropic (Claude) Design System: Genetic Code

This document contains the foundational design tokens, principles, and CSS variables required to replicate the Anthropic / Claude design language. It includes both Light and Dark themes, as well as modern animation patterns for a premium, dynamic web experience.

## 1. Core Philosophy

The Anthropic design language is characterized by:
- **Warmth & Humanity**: Moving away from cold "tech" blues and grays, using warm off-whites, terracotta accents, and sepia-toned dark modes.
- **Typographic Elegance**: Mixing classic serif fonts for headings (editorial feel) with highly legible sans-serif for UI and body text.
- **Subtle Depth**: Using soft, diffuse shadows and fine borders to separate content without heavy visual noise.
- **Fluid & Organic Motion**: Animations should feel like natural physical objects (spring physics, gentle easing) rather than robotic linear movements.

## 2. Color Palette (CSS Variables)

### Light Theme
The light theme resembles warm paper, creating a comfortable reading environment.

```css
:root {
  /* Backgrounds */
  --bg-primary: #FDFCFB;       /* Main page background (warm paper white) */
  --bg-secondary: #F4F2EC;     /* Cards, sidebars, secondary sections */
  --bg-tertiary: #EBE8E0;      /* Hover states on secondary backgrounds */
  
  /* Text */
  --text-primary: #1C1917;     /* Almost black, but warm (Charcoal) */
  --text-secondary: #57534E;   /* Muted text for dates, captions, meta */
  --text-tertiary: #A8A29E;    /* Disabled or placeholder text */
  
  /* Accents & Brand (Terracotta / Earth Tones) */
  --accent-main: #D96C4E;      /* The core Anthropic Terracotta */
  --accent-hover: #C25B3E;     /* Slightly darker for hover states */
  --accent-light: #FBEFEA;     /* Very pale accent for backgrounds (e.g., active menu item) */
  
  /* UI Elements */
  --border-color: #E6E4DE;     /* Soft borders */
  --divider-color: #D6D3CD;    /* Slightly darker for distinct separations */
  --focus-ring: rgba(217, 108, 78, 0.4);
}
```

### Dark Theme
The dark theme avoids pure `#000000`. Instead, it uses deep, warm umber/sepia tones to maintain the humane feel.

```css
[data-theme="dark"] {
  /* Backgrounds */
  --bg-primary: #1C1917;       /* Very dark warm gray/brown */
  --bg-secondary: #292524;     /* Elevated surfaces (Cards, panels) */
  --bg-tertiary: #36312E;      /* Hover states */
  
  /* Text */
  --text-primary: #F5F4EF;     /* Off-white for readability */
  --text-secondary: #A8A29E;   /* Muted text */
  --text-tertiary: #78716C;    /* Disabled text */
  
  /* Accents & Brand */
  --accent-main: #E27D60;      /* Slightly brighter terracotta for contrast on dark */
  --accent-hover: #EE8D72;     /* Lighter on hover */
  --accent-light: rgba(226, 125, 96, 0.15); /* Transparent tint for active states */
  
  /* UI Elements */
  --border-color: #3F3936;
  --divider-color: #4A4440;
  --focus-ring: rgba(226, 125, 96, 0.4);
}
```

## 3. Typography

Anthropic mixes a sophisticated serif with a utilitarian sans-serif.

```css
:root {
  /* Fonts */
  /* For headings: Recoleta, Tiempos, Source Serif Pro, or a classic system serif */
  --font-serif: 'Source Serif Pro', 'Georgia', 'Times New Roman', serif;
  
  /* For body/UI: Inter, Roobert, or system UI */
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  
  /* Sizes */
  --text-xs: 0.75rem;     /* 12px */
  --text-sm: 0.875rem;    /* 14px */
  --text-base: 1rem;      /* 16px */
  --text-lg: 1.125rem;    /* 18px */
  --text-xl: 1.25rem;     /* 20px */
  --text-2xl: 1.5rem;     /* 24px */
  --text-3xl: 2rem;       /* 32px */
  --text-4xl: 2.5rem;     /* 40px */
  --text-5xl: 3.5rem;     /* 56px */
  
  /* Weights */
  --weight-regular: 400;
  --weight-medium: 500;
  --weight-semibold: 600;
}
```

## 4. UI Shapes & Shadows

Soft rounding and diffuse shadows to create physical depth without heavy contrast.

```css
:root {
  /* Border Radius */
  --radius-sm: 6px;       /* Buttons, small inputs */
  --radius-md: 10px;      /* Cards, dropdowns */
  --radius-lg: 16px;      /* Modals, large featured containers */
  --radius-full: 9999px;  /* Pills, avatars */
  
  /* Shadows - Light Theme */
  --shadow-sm: 0 1px 2px rgba(28, 25, 23, 0.05);
  --shadow-md: 0 4px 12px rgba(28, 25, 23, 0.05), 0 1px 3px rgba(28, 25, 23, 0.03);
  --shadow-lg: 0 12px 32px rgba(28, 25, 23, 0.08), 0 4px 8px rgba(28, 25, 23, 0.03);
}

[data-theme="dark"] {
  /* Shadows - Dark Theme (using pure black but very transparent to create depth without muddiness) */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.4), 0 1px 3px rgba(0, 0, 0, 0.2);
  --shadow-lg: 0 12px 32px rgba(0, 0, 0, 0.5), 0 4px 8px rgba(0, 0, 0, 0.3);
}
```

## 5. Claude Design Tricks & Micro-Animations

To make the site feel "alive" and modern, use these specific animation patterns. These are the secrets to making an interface feel highly premium.

### A. The "Spring" Hover Effect
Instead of flat color changes, elements should physically react to the mouse.

```css
/* Base transition variables */
:root {
  --ease-spring: cubic-bezier(0.175, 0.885, 0.32, 1.275); /* Bouncy */
  --ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);            /* Material-like smooth */
  --transition-fast: 150ms;
  --transition-normal: 250ms;
  --transition-slow: 400ms;
}

/* Button / Card Hover Trick */
.interactive-element {
  transition: transform var(--transition-normal) var(--ease-spring),
              box-shadow var(--transition-normal) var(--ease-smooth),
              background-color var(--transition-fast);
}

.interactive-element:hover {
  transform: translateY(-2px) scale(1.01);
  box-shadow: var(--shadow-md);
}

.interactive-element:active {
  transform: translateY(0) scale(0.98); /* Satisfying squeeze effect on click */
  box-shadow: var(--shadow-sm);
}
```

### B. "Glassmorphism" for Sticky Elements (Headers / Sidebars)
Claude uses beautiful blur effects for overlaying content to maintain context without visual clutter.

```css
.glass-panel {
  background: rgba(253, 252, 251, 0.7); /* Use bg-primary with opacity */
  backdrop-filter: blur(12px) saturate(180%);
  -webkit-backdrop-filter: blur(12px) saturate(180%); /* Safari support */
  border-bottom: 1px solid rgba(230, 228, 222, 0.5); /* Subtle transparent border */
}

[data-theme="dark"] .glass-panel {
  background: rgba(28, 25, 23, 0.7);
  border-bottom: 1px solid rgba(63, 57, 54, 0.5);
}
```

### C. Fade-Up on Enter (Staggered Animation)
Elements shouldn't just "appear" instantly. They should slide up smoothly when the page loads or content is injected.

```css
@keyframes fadeUpIn {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-up {
  animation: fadeUpIn var(--transition-slow) var(--ease-smooth) forwards;
  opacity: 0; /* Important: start hidden */
  will-change: transform, opacity;
}

/* Stagger trick: add delay to sequence elements smoothly */
.animate-fade-up:nth-child(1) { animation-delay: 50ms; }
.animate-fade-up:nth-child(2) { animation-delay: 100ms; }
.animate-fade-up:nth-child(3) { animation-delay: 150ms; }
.animate-fade-up:nth-child(4) { animation-delay: 200ms; }
```

### D. The Soft "Focus Ring" Glow
Accessibility doesn't have to be ugly. Focus states shouldn't be sharp default blue outlines; they should be soft, branded glows.

```css
*:focus-visible {
  outline: none; /* Remove default browser outline */
  box-shadow: 0 0 0 3px var(--focus-ring);
  border-color: var(--accent-main);
}
```

### E. Elegant Text Selection
A small but highly premium detail: custom text selection colors.

```css
::selection {
  background: var(--accent-light);
  color: var(--accent-hover);
}

[data-theme="dark"] ::selection {
  background: var(--accent-light);
  color: var(--accent-main);
}
```

### F. Loading State Shimmer (Skeleton)
For dynamic applications, use this soft, flowing gradient instead of a generic spinner when loading blocks of content.

```css
@keyframes shimmer {
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
}

.skeleton-loader {
  background: var(--bg-secondary);
  background-image: linear-gradient(
    90deg, 
    var(--bg-secondary) 0px, 
    var(--bg-tertiary) 40px, 
    var(--bg-secondary) 80px
  );
  background-size: 1000px 100%;
  animation: shimmer 2s infinite linear;
  border-radius: var(--radius-sm);
}
```

## 6. How to Use This in Your Project

1. **Import the CSS Variables**: Copy the `:root` and `[data-theme="dark"]` blocks into your `styles.css`.
2. **Apply Base Styles**: 
   ```css
   body {
     background-color: var(--bg-primary);
     color: var(--text-primary);
     font-family: var(--font-sans);
     transition: background-color var(--transition-normal), color var(--transition-normal);
   }
   h1, h2, h3 {
     font-family: var(--font-serif);
     font-weight: var(--weight-medium);
   }
   ```
3. **Use Utility Classes**: Build your components using the variables. Add `.interactive-element` to your buttons and cards. Wrap your content blocks in `.animate-fade-up`.
4. **Implement Dark Mode**: Create a simple JavaScript function to toggle the `data-theme="dark"` attribute on the `<html>` or `<body>` element when clicking a theme switch button.
