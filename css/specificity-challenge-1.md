How do you solve specificity conflicts with multiple classes?
?

```css
/* Specificity Challenge 1: Multiple classes */

/* Problem: Equal specificity, order matters */
.button { color: blue; }        /* 0,0,1,0 = 10 */
.button.primary { color: red; } /* 0,0,2,0 = 20 - wins */

/* Challenge: Need to override .button.primary */
.button.primary.active { color: green; } /* 0,0,3,0 = 30 - wins */

/* Solution 1: Increase specificity */
.button.primary.active { } /* Higher specificity */

/* Solution 2: Use CSS Layers */
@layer base, overrides;

@layer base {
  .button.primary { color: red; }
}

@layer overrides {
  .button.primary { color: green; } /* Wins regardless */
}

/* Solution 3: Use :where() to reduce specificity */
:where(.button).primary { color: red; } /* 0,0,1,0 = 10 */
.button.primary { color: green; }       /* 0,0,2,0 = 20 - wins */

/* Practical: BEM methodology avoids conflicts */
.block__element--modifier { } /* 0,0,1,0 = 10 */
/* Single class, easy to override */
```
