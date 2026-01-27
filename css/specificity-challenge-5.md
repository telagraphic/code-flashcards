How do you handle specificity with attribute selectors and pseudo-classes?
?

```css
/* Specificity Challenge 5: Attributes and pseudo-classes */

/* Problem: Attribute selectors have class-level specificity */
input[type="text"] { color: blue; }      /* 0,0,1,1 = 11 */
input.text-input { color: red; }          /* 0,0,1,1 = 11 */
/* Order matters (equal specificity) */

/* Challenge: Combining attributes and classes */
input[type="text"].form-control:focus { 
  color: green; 
} /* 0,0,3,1 = 31 - wins */

/* Solution 1: Use :where() to reduce specificity */
:where(input[type="text"]) { color: blue; } /* 0,0,0,1 = 1 */
input.text-input { color: red; }            /* 0,0,1,1 = 11 - wins */

/* Solution 2: Use CSS Layers */
@layer base, states;

@layer base {
  input[type="text"] { color: blue; }
}

@layer states {
  input:focus { color: green; } /* Wins */
}

/* Solution 3: Separate concerns */
/* Use classes for styling, attributes for selection */
.text-input { color: blue; } /* 0,0,1,0 = 10 */
.text-input:focus { color: green; } /* 0,0,2,0 = 20 - wins */

/* Practical: Pseudo-classes add specificity */
.button:hover { }     /* 0,0,2,0 = 20 */
.button:active { }     /* 0,0,2,0 = 20 */
.button:focus { }      /* 0,0,2,0 = 20 */
/* All equal, order matters */
```
