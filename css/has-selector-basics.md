What is the :has() selector and how does it work?
?

```css
/* :has() - Parent selector (selects parent based on children)
   Also called "forgiving selector" */

/* Basic syntax */
.parent:has(.child) {
  /* Styles parent that contains .child */
}

/* Example */
.card:has(.button) {
  border: 2px solid blue;
}
/* Styles .card that contains .button */

/* :has() specificity:
   - Adds specificity of argument selector
   - :has(.class) = 0,0,1,0 (10)
   - :has(#id) = 0,1,0,0 (100)
*/

/* Practical: Style parent based on child state */
.form-group:has(input:invalid) {
  border-color: red;
}
/* Styles form-group when it contains invalid input */

/* Practical: Conditional styling */
.menu:has(.menu-item.active) {
  background-color: #f0f0f0;
}
/* Styles menu when it has active menu item */

/* Browser support: Modern browsers (2022+) */
/* Use @supports for fallback */
@supports selector(:has(*)) {
  .parent:has(.child) {
    /* Styles */
  }
}
```
