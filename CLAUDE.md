# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website for Jean Bikorimana, a software developer. The site is a modern, single-page application (SPA) built with vanilla HTML, CSS, and JavaScript featuring advanced animations, custom cursor effects, and a glassmorphism design aesthetic.

## Architecture

### File Structure
- `index.html` - Main HTML structure containing all sections (hero, about, skills, projects, resume, contact)
- `styles.css` - Complete styling with CSS custom properties, animations, and responsive design
- `script.js` - Interactive features including smooth scrolling, animations, custom cursor, and form handling
- `Jean_Bikorimana_Software_Engineer_Resume.html` - Standalone resume page

### Key Design Patterns

**Single-Page Application**
- All content lives in `index.html` with sections: `#home`, `#about`, `#skills`, `#projects`, `#resume`, `#contact`
- Navigation uses smooth scrolling with `scrollIntoView()` behavior
- Active navigation state updates on scroll using Intersection Observer API

**Glassmorphism UI**
- Heavy use of `backdrop-filter: blur(20px)` with semi-transparent backgrounds
- CSS variables in `:root` define the design system (colors, glass effects)
- Consistent border styling with `var(--glass-border)`

**Animation System**
- Intersection Observer for scroll-triggered animations (`.animate-in` class)
- Stagger animations for grid items (cards appear sequentially with 100ms delay)
- Custom cursor with smooth following effect using `requestAnimationFrame()`
- Parallax scrolling for background elements
- Typing effect for hero subtitle

## Development Workflow

### Local Development
This is a static site with no build process. To develop locally:
```bash
# Option 1: Use Python's built-in server
python3 -m http.server 8000

# Option 2: Use VS Code Live Server extension (preferred)
# The workspace is configured for Live Server - just right-click index.html and select "Open with Live Server"

# Option 3: Open directly in browser
open index.html
```

### Testing
No automated tests. Manual testing should cover:
- Smooth scrolling functionality on all navigation links
- Form submission through EmailJS (service_uotxnfd, template_m3phuum)
- Custom cursor behavior on desktop (hover effects on interactive elements)
- Responsive design at breakpoints: 768px (mobile)
- Animation triggers when sections enter viewport
- Resume link opens `Jean_Bikorimana_Software_Engineer_Resume.html` in new tab

## External Dependencies

### CDN Libraries
- **Google Fonts**: Inter font family (weights: 300, 400, 500, 600, 700)
- **EmailJS**: Contact form email delivery (`https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js`)
  - Initialized with public key: `ArtTFrrDKQB-bBfd-`
  - Service ID: `service_uotxnfd`
  - Template ID: `template_m3phuum`

### No Package Manager
This project has no `package.json`, `npm`, or build tooling. All code is vanilla JavaScript.

## Important Implementation Details

### Form Handling
Contact form uses EmailJS for email delivery. The `handleFormSubmit()` function:
- Prevents default form submission
- Shows loading state on submit button
- Sends email via EmailJS
- Displays success/error notifications
- Auto-resets form on success

### Custom Cursor (Desktop Only)
The custom cursor only activates on devices with hover capability (`window.matchMedia('(hover: hover)')`). It:
- Follows mouse with smooth easing (0.1 lerp factor)
- Scales up (1.5x) and changes color on hover over interactive elements
- Uses `requestAnimationFrame()` for 60fps performance

### Performance Optimizations
- Debounced scroll events (10ms delay) for navbar opacity updates
- Grid animations use CSS transforms for GPU acceleration
- Intersection Observer API instead of scroll listeners for better performance

### Navigation Active States
Two mechanisms keep navigation in sync:
1. Click handlers set `.active` class on clicked nav link
2. Scroll listener checks section positions and updates active nav link (100px offset for better UX)

## Git Workflow Notes
- Main branch is `main` (not `master`)
- No remote called `origin` - use `Main` instead

## Common Modifications

### Updating Content
- **Projects**: Edit the `.projects-grid` section in `index.html` (lines 138-198)
- **Skills**: Modify `.skills-grid` cards (lines 94-126)
- **Resume**: Update both inline resume section and separate `Jean_Bikorimana_Software_Engineer_Resume.html`
- **Contact Info**: Update hero section links and contact section footer

### Styling Changes
- **Colors**: Edit CSS custom properties in `:root` (lines 2-11 in `styles.css`)
- **Animations**: Modify keyframes or transition properties - key animations are at lines 55-58, 134-137, 501-510
- **Responsive**: Mobile breakpoint at 768px (lines 529-600 in `styles.css`)

### Adding New Sections
1. Add section HTML with class `section animate-in` and unique ID
2. Add navigation link in `.navbar` with matching `href`
3. Section will automatically get scroll animations via Intersection Observer

## Browser Compatibility
The site uses modern JavaScript APIs:
- Intersection Observer API (90%+ browser support)
- CSS `backdrop-filter` (requires prefixes for Safari)
- `requestAnimationFrame` for animations
- ES6+ JavaScript (arrow functions, template literals, const/let)

Target browsers: Modern evergreen browsers (Chrome, Firefox, Safari, Edge)
