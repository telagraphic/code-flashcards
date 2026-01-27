What is the :where() selector and how does it work?
?

```css
/* :where() - Groups selectors with 0 specificity
   Always has specificity of 0,0,0,0 */

/* Basic syntax */
:where(.class1, .class2, .class3) {
  /* Styles elements, but specificity is always 0 */
}

/* Example */
:where(h1, h2, h3) {
  font-weight: bold;
}
/* Specificity: 0,0,0,0 (can be easily overridden) */

/* :where() vs :is() */
:is(.class, #id) { }  /* Specificity: 0,1,0,0 (100) - highest */
:where(.class, #id) { } /* Specificity: 0,0,0,0 (0) - always 0 */

/* Practical: Reset styles that are easy to override */
:where(h1, h2, h3, h4, h5, h6) {
  margin: 0;
  font-weight: normal;
}
/* Can be overridden by any selector */

/* Benefits:
   - Zero specificity - easy to override
   - Forgiving selector (invalid selectors don't break rule)
   - Useful for resets and base styles
*/

/* Practical: Component library base styles */
:where(.button, .btn, [role="button"]) {
  padding: 10px 20px;
  border: none;
  cursor: pointer;
}
/* Easy to override with any class */
```
