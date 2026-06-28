# Ghulam Qadir Portfolio - Design PRD

## Overview
A highly advanced, animation-rich portfolio for Ghulam Qadir - a Computer Science student specializing in Data Science & AI. The design uses a "Developer Dark" aesthetic with cinematic scroll animations, interactive particle systems, 3D tilt effects, and professional typography. The "vibe coding" philosophy emphasizes raw technical excellence with smooth, immersive user experiences.

## Tech Stack
- React 18 + Vite + TypeScript
- GSAP (ScrollTrigger) for scroll animations
- Lenis for smooth scrolling
- Framer Motion for component animations
- Three.js (optional) for hero particles
- CSS Custom Properties for theming

## Color Palette
```
--bg-primary: #050505
--bg-secondary: #0a0a0f
--bg-card: #111118
--bg-card-hover: #1a1a24
--text-primary: #ffffff
--text-secondary: #a0a0b0
--text-muted: #606070
--accent-indigo: #6366f1
--accent-violet: #8b5cf6
--accent-cyan: #06b6d4
--accent-green: #10b981
--accent-pink: #ec4899
--gradient-primary: linear-gradient(135deg, #6366f1, #8b5cf6)
--gradient-full: linear-gradient(135deg, #6366f1, #8b5cf6, #06b6d4)
--border: rgba(255,255,255,0.08)
--border-hover: rgba(99,102,241,0.3)
```

## Typography
- Headings: "Space Grotesk" (weights 300-700)
- Body: "Inter" (weights 300-600)
- Monospace: "JetBrains Mono" for code elements
- Hero title: clamp(3rem, 8vw, 6rem)
- Section titles: clamp(2rem, 5vw, 4rem)
- Body: 16px/1.6

## Sections (in order)

### 1. Loading Screen
- Cinematic text scramble effect
- "INITIALIZING..." → "WELCOME"
- Progress bar with glitch effect
- Duration: 2.5s

### 2. Hero
- Full-screen interactive particle network (Canvas 2D)
- Particles connect with lines when close
- Mouse repulsion effect
- Large name "GHULAM QADIR" with gradient text
- Typewriter animation for role titles
- Stats counter (Projects, Technologies, Experience, Satisfaction)
- Social links with magnetic hover
- Scroll indicator with bounce animation

### 3. About
- Two-column layout (image left, content right)
- Profile image with animated border gradient
- Experience badge floating
- Highlight cards (Education, Achievements, Experience, Location)
- Staggered reveal animations

### 4. Skills
- Category filtering (All, Frontend, Backend, Data Science, Tools)
- Animated skill bars with percentage counter
- Skill cards with hover glow effect
- Summary stats at bottom

### 5. Projects
- Filter tabs (All, Web Dev, Data Science, ML)
- 3D tilt cards on hover
- Modal for project details
- Staggered grid animation

### 6. Services
- Service cards with icon, title, description
- "Popular" badge on featured services
- Hover lift effect

### 7. Experience Timeline (NEW)
- Vertical timeline with alternating left/right
- Animated nodes/connecting lines
- Teaching Assistant experience
- Academic milestones

### 8. Contact
- Two-column: info left, form right
- Contact info cards with icons
- Form with floating labels
- Social links

### 9. Footer
- Brand name + tagline
- Social links
- Back to top button
- Copyright

## Animations

### Scroll Behaviors
- Sections fade/slide in on scroll
- Staggered children animations
- Parallax on decorative elements
- Lenis smooth scroll with lerp: 0.08

### Hover Effects
- Magnetic buttons (attract to cursor)
- Card 3D tilt (perspective 1000px)
- Glow border on cards
- Text glitch on nav links

### Micro-interactions
- Custom cursor (dot + trailing ring)
- Pulse on active elements
- Counter animation on stats
- Skill bar fill animation

## Responsive
- Desktop: 1200px+ full experience
- Tablet: 768px-1199px simplified
- Mobile: <768px single column, reduced animations
- Pinned sections become normal flow on mobile

## Performance
- will-change on animated elements
- Canvas at 0.75 dpr
- Lazy load images
- Reduce motion support
