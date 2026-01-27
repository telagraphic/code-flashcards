How do you optimize CSS performance?
?

```css
/* CSS Performance Optimization Strategies */

/* 1. Minimize CSS file size */
/* Remove unused styles */
/* Minify CSS */
/* Use CSS compression */

/* 2. Reduce selector complexity */
/* BAD: Complex selectors */
div.container > ul li.item.active:hover { }

/* GOOD: Simple selectors */
.item.active { }

/* 3. Avoid universal selectors in complex contexts */
/* BAD */
.container * { }

/* GOOD */
.container .item { }

/* 4. Use efficient selectors */
/* Right-to-left matching */
/* ID > Class > Element */
#id { } /* Fastest */
.class { } /* Fast */
div { } /* Slower */

/* 5. Minimize @import */
/* @import blocks rendering */
/* Use <link> tags instead */

/* 6. Use CSS containment */
.container {
  contain: layout style paint;
  /* Isolates rendering work */
}

/* 7. Optimize critical CSS */
/* Inline critical CSS in <head> */
/* Load non-critical CSS asynchronously */

/* 8. Use will-change sparingly */
.element {
  will-change: transform;
  /* Only when animating */
}

/* 9. Avoid expensive properties */
/* Gradients, shadows, filters are expensive */
.element {
  box-shadow: 0 0 20px rgba(0,0,0,0.5); /* Expensive */
}

/* 10. Use CSS custom properties efficiently */
:root {
  --color: blue;
}
.element {
  color: var(--color); /* Slight overhead */
}

/* 11. Minimize reflows/repaints */
/* Use transform/opacity for animations */
/* Batch DOM changes */

/* 12. Use CSS layers for organization */
@layer base, components;
/* Better organization, no performance cost */
```
