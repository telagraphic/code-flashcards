What are practical use cases for CSS Logical Properties?
?

```css
/* Practical: RTL language support */
/* Without logical properties - breaks in RTL */
.card {
  margin-left: 20px;
  padding-right: 15px;
  border-left: 2px solid;
  text-align: left;
}

/* With logical properties - works in RTL */
.card {
  margin-inline-start: 20px;
  padding-inline-end: 15px;
  border-inline-start: 2px solid;
  text-align: start;
}

/* Practical: Vertical writing modes */
/* Japanese, Chinese vertical text */
.article {
  writing-mode: vertical-rl;
}

/* Physical properties don't work */
.article {
  width: 300px;  /* Wrong dimension */
  height: 200px; /* Wrong dimension */
}

/* Logical properties adapt */
.article {
  inline-size: 300px;  /* Adapts to vertical */
  block-size: 200px;  /* Adapts to vertical */
}

/* Practical: Spacing utilities */
/* Physical: Direction-dependent */
.spacing {
  margin-top: 1rem;
  margin-bottom: 1rem;
}

/* Logical: Direction-agnostic */
.spacing {
  margin-block: 1rem; /* Top and bottom */
}

.margin-inline {
  margin-inline: 1rem; /* Left and right */
}

/* Practical: Border and padding */
.element {
  border-block: 1px solid;     /* Top and bottom */
  border-inline: 2px solid;   /* Left and right */
  padding-block: 1rem;        /* Top and bottom */
  padding-inline: 1.5rem;     /* Left and right */
}

/* Practical: Positioning */
.absolute {
  inset-block-start: 0;    /* top */
  inset-inline-start: 0;   /* left */
}

/* Benefits for modern web apps:
   - Internationalization ready
   - Works with CSS Grid/Flexbox
   - Better for component libraries
   - Future-proof code
*/
```
