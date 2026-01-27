What's the difference between em and rem units?
?

```css
/* em: Relative to parent element's font-size */
/* rem: Relative to root element's font-size */

/* em example */
.parent {
  font-size: 16px;
}

.child {
  font-size: 1.5em; /* 1.5 * 16px = 24px */
  padding: 1em;     /* 1 * 24px = 24px (uses own font-size) */
}

/* rem example */
:root {
  font-size: 16px;
}

.element {
  font-size: 1.5rem; /* 1.5 * 16px = 24px */
  padding: 1rem;      /* 1 * 16px = 16px (uses root font-size) */
}

/* Practical: Use rem for consistent sizing */
:root {
  font-size: 16px;
}

.container {
  padding: 1rem;    /* Always 16px */
  margin: 2rem;     /* Always 32px */
  font-size: 1.25rem; /* Always 20px */
}

/* Practical: Use em for component-relative sizing */
.button {
  font-size: 1rem;  /* 16px from root */
  padding: 0.5em;   /* 8px relative to button font-size */
  border-radius: 0.25em; /* 4px relative to button font-size */
}

.button-large {
  font-size: 1.5rem; /* 24px */
  /* padding and border-radius scale automatically */
  /* padding: 12px, border-radius: 6px */
}

/* Benefits:
   - rem: Predictable, consistent
   - em: Scales with component, flexible
*/

/* When to use each:
   - rem: Layout, spacing, global sizing
   - em: Component-relative sizing, typography scale
*/
```
