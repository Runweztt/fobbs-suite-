# FOBBS Apartment and Suite Design System

**Brand:** FOBBS Apartment and Suite  
**Location:** Asaba, Delta State, Nigeria  
**Style:** Futuristic Luxury Hotel

---

## Color Palette

### Primary - Oceanic Teal
Represents serenity and modern luxury.

| Token | Value | Usage |
|-------|-------|-------|
| `primary-400` | #1de4c9 | Hover states, icons |
| `primary-500` | #04c8b0 | Primary buttons, links |
| `primary-600` | #00a191 | Active states |

### Secondary - Deep Space Navy
Trust and sophistication.

| Token | Value | Usage |
|-------|-------|-------|
| `secondary-800` | #2a3c64 | Dark backgrounds |
| `secondary-900` | #1a2540 | Footer, dark sections |
| `secondary-950` | #0d1220 | Dark mode base |

### Accent - Warm Gold
Luxury and warmth.

| Token | Value | Usage |
|-------|-------|-------|
| `accent-400` | #fbbf24 | Highlights, badges |
| `accent-500` | #f59e0b | Call-to-actions |

---

## Typography

```css
/* Headings */
font-family: 'Playfair Display', serif;

/* Body */
font-family: 'Inter', sans-serif;
```

### Scale (Mobile-First)
| Class | Mobile | Desktop |
|-------|--------|---------|
| `text-4xl` → `text-6xl` | 36px | 60px |
| `text-3xl` → `text-5xl` | 30px | 48px |
| `text-2xl` → `text-3xl` | 24px | 30px |

---

## Spacing

Based on 8px grid system. Use `space-{n}` tokens.

| Token | Value | Use Case |
|-------|-------|----------|
| `space-4` | 16px | Component padding |
| `space-6` | 24px | Card padding |
| `space-8` | 32px | Section gaps |
| `space-section-md` | 96px | Section vertical |

---

## Border Radius

| Token | Value | Use Case |
|-------|-------|----------|
| `radius-md` | 8px | Buttons, inputs |
| `radius-lg` | 12px | Cards |
| `radius-xl` | 16px | Modals |
| `radius-2xl` | 24px | Featured cards |

---

## Shadows & Glow

```css
/* Standard shadows */
shadow-sm → shadow-2xl

/* Futuristic glow effects */
glow-primary: 0 0 20px rgb(4 200 176 / 0.3);
glow-accent: 0 0 20px rgb(251 191 36 / 0.3);
```

---

## Motion Principles

| Property | Value | Use Case |
|----------|-------|----------|
| `duration-fast` | 150ms | Micro-interactions |
| `duration-normal` | 250ms | Standard transitions |
| `duration-slow` | 350ms | Modal animations |
| `ease-out` | cubic-bezier(0, 0, 0.2, 1) | Exit animations |
| `ease-spring` | cubic-bezier(0.175, 0.885, 0.32, 1.275) | Playful |

---

## Utility Classes

```jsx
// Container
<div className="container-app">

// Section spacing
<section className="section-md">

// Glass effect
<div className="glass">

// Buttons
<button className="btn btn-primary">Book Now</button>
<button className="btn btn-secondary">Learn More</button>
<button className="btn btn-accent">Special Offer</button>

// Cards
<div className="card">
<div className="card card-elevated">

// Hover effect
<div className="hover-lift">

// Text gradients
<h1 className="text-gradient-primary">
<span className="text-gradient-gold">
```

---

## Logo Usage

| File | Use Case |
|------|----------|
| `logo.svg` | Full logo (light mode) |
| `logo-dark.svg` | Full logo (dark mode) |
| `logo-icon.svg` | Favicon, small displays |

### Minimum Clear Space
- Padding equal to height of "F" icon on all sides
- Never scale below 120px width for full logo
- Never scale below 32px for icon

---

## Dark Mode

Automatically switches via `prefers-color-scheme`, or apply `.dark` class to root.

```jsx
// Manual toggle
document.documentElement.classList.toggle('dark');
```
