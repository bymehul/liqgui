# liqgui ✨

[![npm version](https://img.shields.io/npm/v/liqgui.svg)](https://www.npmjs.com/package/liqgui)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

Glassmorphism UI components that actually feel good. Built with spring physics.

**[📖 Docs & Demo](https://bymehul.github.io/liqgui/demo/index.html)**

## Why this exists

Most glass-effect libraries look nice but feel off—stiff transitions, janky hovers, no thought put into motion. liqgui uses real spring physics (not just `ease-in-out`) so everything moves like it has weight.

## What you get

- **15 components** — buttons, cards, modals, toasts, the works
- **Spring animations** — physics-based, not CSS keyframe guesswork  
- **3D effects** — tilt on hover, ripples, glow trails
- **Dark/light themes** — one CSS variable swap
- **Accessible** — keyboard nav, focus traps, ARIA done right
- **No dependencies** — just TypeScript, works with anything

## Installation

```bash
npm install liqgui
```

## Quick Start

```html
<link rel="stylesheet" href="node_modules/liqgui/src/styles/tokens.css">
<script type="module">
  import 'liqgui';
</script>

<glass-button variant="primary">Click Me</glass-button>
<glass-card glow>Your content here</glass-card>
```

## Components

### Buttons & Actions
```html
<glass-button>Default</glass-button>
<glass-button variant="primary">Primary</glass-button>
<glass-button variant="outline">Outline</glass-button>
<glass-button variant="ghost">Ghost</glass-button>
<glass-button loading>Loading...</glass-button>
```

### Form Controls
```html
<glass-input placeholder="Enter text"></glass-input>
<glass-toggle checked>Enable feature</glass-toggle>
<glass-slider value="50" min="0" max="100"></glass-slider>
<glass-dropdown>
  <span slot="trigger">Select option</span>
  <button role="option" data-value="1">Option 1</button>
  <button role="option" data-value="2">Option 2</button>
</glass-dropdown>
```

### Layout & Content
```html
<glass-card glow>Card with glow effect</glass-card>
<glass-card no-tilt>Card without 3D tilt</glass-card>

<glass-tabs>
  <button data-value="tab1">Tab 1</button>
  <button data-value="tab2">Tab 2</button>
</glass-tabs>

<glass-navbar auto-hide>
  <span slot="brand">Brand</span>
  <a href="#">Link</a>
  <glass-button slot="actions">CTA</glass-button>
</glass-navbar>
```

### Overlays
```html
<glass-modal id="modal">Modal content</glass-modal>
<script>document.getElementById('modal').open();</script>

<glass-tooltip position="top">
  <button>Hover me</button>
  <span slot="content">Tooltip text</span>
</glass-tooltip>

<glass-popover position="bottom">
  <button slot="trigger">Click me</button>
  <div>Popover content</div>
</glass-popover>
```

### Notifications
```javascript
import { GlassToast } from 'liqgui';
GlassToast.show('Success!', 'success');
GlassToast.show('Error!', 'error');
```

### Data Display
```html
<glass-avatar size="lg" status="online">AB</glass-avatar>
<glass-avatar-group>
  <glass-avatar>A</glass-avatar>
  <glass-avatar>B</glass-avatar>
</glass-avatar-group>

<glass-badge variant="success">New</glass-badge>
<glass-badge-wrapper count="5">
  <button>Notifications</button>
</glass-badge-wrapper>

<glass-progress value="75" max="100">75%</glass-progress>
<glass-progress variant="circular" value="50">50%</glass-progress>
<glass-progress indeterminate>Loading</glass-progress>
```

### Accordion
```html
<glass-accordion>
  <glass-accordion-item open>
    <span slot="title">Question 1</span>
    Answer content here.
  </glass-accordion-item>
  <glass-accordion-item>
    <span slot="title">Question 2</span>
    More content.
  </glass-accordion-item>
</glass-accordion>
```

## Core Utilities

```javascript
import { 
  springAnimate, bouncySpring, 
  motion, 
  setTheme 
} from 'liqgui';

// Spring animation
springAnimate(0, 100, v => el.style.left = `${v}px`, bouncySpring);

// Motion library
motion.fadeIn(element);
motion.scaleIn(element);
motion.slideInUp(element);

// Theming
setTheme('dark');
```

## CSS Custom Properties

```css
:root {
  --lg-blur: 20px;
  --lg-radius: 20px;
  --lg-accent: var(--lg-accent-blue);
  --lg-bg: var(--lg-bg-dark);
}
```

## Component List

| Category | Components |
|----------|-----------|
| Actions | `glass-button` |
| Forms | `glass-input`, `glass-toggle`, `glass-slider`, `glass-dropdown` |
| Layout | `glass-card`, `glass-tabs`, `glass-navbar`, `glass-accordion` |
| Overlays | `glass-modal`, `glass-tooltip`, `glass-popover`, `glass-toast` |
| Data | `glass-avatar`, `glass-badge`, `glass-progress` |

## Browser Support

Modern browsers only (Chrome, Firefox, Safari, Edge). Uses Web Components and `backdrop-filter`.

## Support

If you find this useful, consider supporting my work:

[![Support on Patreon](https://img.shields.io/badge/Patreon-Support-ff424d?logo=patreon)](https://www.patreon.com/c/bymehul) [![Buy me a Chai](https://img.shields.io/badge/Chai-Donate-ffdd00)](https://www.paywithchai.in/bymehul)

## License

MIT — do whatever you want with it.
