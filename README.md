# Riverside Suites

A futuristic luxury hotel website built with React, Vite, and Tailwind CSS.

![Riverside Suites](https://riversidesuites.com/og-image.jpg)

## 🏨 Features

- **Modern Design**: Futuristic UI with glassmorphism, animations, and premium aesthetics
- **Fully Responsive**: Mobile-first design that works on all devices
- **Booking System**: Complete booking flow with date selection, room selection, and confirmation
- **SEO Optimized**: Meta tags, Open Graph, Twitter cards, and JSON-LD structured data
- **Accessible**: WCAG compliant with proper ARIA labels and keyboard navigation
- **Fast**: Optimized bundle with code splitting and lazy loading

## 📦 Tech Stack

- **React 18** - UI library
- **Vite** - Build tool
- **Tailwind CSS v4** - Styling
- **Framer Motion** - Animations
- **Hash-based Routing** - SPA navigation

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
riverside/
├── public/
│   ├── favicon.svg
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── assets/          # Static assets (logo, images)
│   ├── components/      # Reusable UI components
│   │   ├── booking/     # Booking flow components
│   │   └── ...
│   ├── context/         # React Context providers
│   ├── layouts/         # Page layouts
│   ├── pages/           # Page components
│   ├── utils/           # Utility functions
│   ├── App.jsx          # Root component with routing
│   ├── main.jsx         # Entry point
│   └── index.css        # Design system & styles
├── index.html           # HTML template with SEO
├── vite.config.js       # Vite configuration
└── package.json
```

## 🌐 Pages

| Route | Page | Description |
|-------|------|-------------|
| `#home` | Home | Hero, featured rooms, amenities preview |
| `#rooms` | Rooms | Room listings with filters |
| `#room/:slug` | Room Details | Individual room with gallery |
| `#amenities` | Amenities | Icon-based amenities grid |
| `#gallery` | Gallery | Masonry grid with lightbox |
| `#about` | About | Brand story, values, team |
| `#contact` | Contact | Contact form and info |
| `#booking` | Booking | Multi-step booking flow |

## 🎨 Design System

The design system is defined in `src/index.css` using Tailwind CSS v4's `@theme` directive:

- **Primary**: Oceanic Teal (#04c8b0)
- **Secondary**: Deep Space Navy (#1a2540)
- **Accent**: Warm Gold (#f59e0b)
- **Font Display**: Playfair Display
- **Font Body**: Inter

## 🔧 Deployment

### Static Hosting (Recommended)

Build the project and deploy the `dist` folder:

```bash
npm run build
# Deploy contents of ./dist to your hosting provider
```

**Compatible with:**
- Vercel
- Netlify
- Cloudflare Pages
- AWS S3 + CloudFront
- Firebase Hosting

### Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

## 📋 Pre-deployment Checklist

- [x] SEO meta tags configured
- [x] Open Graph images ready
- [x] Favicon and touch icons
- [x] robots.txt configured
- [x] sitemap.xml generated
- [x] Production build tested
- [x] Accessibility verified
- [x] Mobile responsive
- [ ] Replace placeholder images
- [ ] Update contact information
- [ ] Configure analytics
- [ ] Set up domain

## 📄 License

© 2024 Riverside Suites. All rights reserved.
