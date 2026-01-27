How do you override styles in nested component structures?
?

```css
/* Specificity Challenge 4: Nested components */

/* Problem: Deep nesting increases specificity */
.card .card-header .card-title { color: blue; } /* 0,0,3,0 = 30 */
.card-title { color: red; }                     /* 0,0,1,0 = 10 */
/* First wins (30 > 10) */

/* Challenge: Need to override nested styles */
.card.featured .card-header .card-title { 
  color: green; 
} /* 0,0,4,0 = 40 - wins */

/* Solution 1: Flatten selectors (BEM) */
.card-title { }        /* 0,0,1,0 = 10 */
.card-title--featured { } /* 0,0,1,0 = 10 */
/* Same specificity, order matters */

/* Solution 2: Use CSS Layers */
@layer components, variants;

@layer components {
  .card .card-title { color: blue; }
}

@layer variants {
  .card-title { color: green; } /* Wins */
}

/* Solution 3: CSS custom properties */
.card-title {
  color: var(--title-color, blue);
}
.card-title--featured {
  --title-color: green; /* Override */
}

/* Practical: Keep nesting shallow */
.card-title { } /* Better than .card .card-header .card-title */
```
