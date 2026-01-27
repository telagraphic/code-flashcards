What is the :is() selector and how does it work?
?

```css
/* :is() - Groups multiple selectors, takes highest specificity */

/* Basic syntax */
:is(.class1, .class2, .class3) {
  /* Styles elements matching any selector */
}

/* Example */
:is(h1, h2, h3) {
  font-weight: bold;
  margin-top: 1rem;
}
/* Styles all h1, h2, and h3 elements */

/* :is() specificity:
   - Takes highest specificity from arguments
   - :is(.class, #id) = 0,1,0,0 (100) - highest
   - :is(div, span) = 0,0,0,1 (1) - highest
*/

/* Practical: Simplify selector lists */
/* Without :is() */
header .nav a,
header .nav button,
header .nav span {
  color: blue;
}

/* With :is() */
header .nav :is(a, button, span) {
  color: blue;
}

/* Benefits:
   - Shorter code
   - Easier to maintain
   - Forgiving (invalid selectors don't break entire rule)
*/

/* Practical: Component variants */
:is(.btn-primary, .btn-secondary, .btn-danger) {
  padding: 10px 20px;
  border-radius: 4px;
}
```
