How do you override styles with IDs vs classes?
?

```css
/* Specificity Challenge 2: ID vs Classes */

/* Problem: ID has higher specificity than classes */
#header .menu-item { color: blue; }  /* 0,1,1,0 = 110 */
.menu-item.active { color: red; }    /* 0,0,2,0 = 20 */
/* First wins (110 > 20) */

/* Challenge: Need to override ID selector */
#header .menu-item.active { color: green; } /* 0,1,2,0 = 120 - wins */

/* Solution 1: Add more classes (not ideal) */
#header .menu-item.active.highlight { } /* 0,1,3,0 = 130 */

/* Solution 2: Use CSS Layers */
@layer base, overrides;

@layer base {
  #header .menu-item { color: blue; }
}

@layer overrides {
  .menu-item.active { color: green; } /* Wins in later layer */
}

/* Solution 3: Avoid IDs in CSS (best practice) */
.header .menu-item { } /* 0,0,2,0 = 20 */
.menu-item.active { }  /* 0,0,2,0 = 20 */
/* Order matters, easier to manage */

/* Practical: Use classes for styling, IDs for JavaScript */
/* Keep CSS specificity low and manageable */
```
