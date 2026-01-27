How do you handle !important conflicts?
?

```css
/* Specificity Challenge 3: !important conflicts */

/* Problem: Multiple !important declarations */
.button { color: blue !important; }        /* 10 + important */
.button.primary { color: red !important; } /* 20 + important */
/* Second wins (higher specificity + important) */

/* Challenge: Need to override !important */
#submit.button.primary { 
  color: green !important; 
} /* 110 + important - wins */

/* Solution 1: Increase specificity (not ideal) */
#page #submit.button.primary { } /* Higher specificity */

/* Solution 2: Use CSS Layers */
@layer base, overrides;

@layer base {
  .button { color: blue !important; }
}

@layer overrides {
  .button { color: green !important; } /* Wins in later layer */
}

/* Solution 3: Avoid !important (best practice) */
/* Use proper specificity instead */
.button.primary { color: red; } /* 20 - sufficient */

/* Practical: Only use !important for:
   - Utility classes that must override
   - Third-party library overrides
   - Inline style overrides (rare)
*/

/* Better: Use CSS custom properties */
.button {
  --button-color: blue;
  color: var(--button-color);
}
.button.primary {
  --button-color: red; /* Easy override */
}
```
