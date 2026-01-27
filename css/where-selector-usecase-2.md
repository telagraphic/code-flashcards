How do you use :where() to reduce specificity conflicts?
?

```css
/* :where() to reduce specificity conflicts */

/* Problem: High specificity from :is() */
:is(.card, .panel) .title { } /* Specificity: 20 */
.title { } /* Specificity: 10 - loses */

/* Solution: Use :where() for lower specificity */
:where(.card, .panel) .title { } /* Specificity: 10 */
.title { } /* Specificity: 10 - order matters */

/* Practical: Third-party library overrides */
/* Library styles */
.library-button { padding: 20px; } /* Specificity: 10 */

/* Your override with :where() */
:where(.library-button) { padding: 10px; } /* Specificity: 0 */
/* Still loses! Need to match specificity */

/* Better: Use :where() in library, override with class */
:where(.library-button) { padding: 20px; } /* Specificity: 0 */
.my-button { padding: 10px; } /* Specificity: 10 - wins */

/* Practical: Component variants */
:where(.btn-primary, .btn-secondary) {
  padding: 10px 20px;
}

/* Easy to create specific variant */
.btn-primary.large { padding: 15px 30px; } /* Specificity: 20 - wins */

/* Challenge: Nested :where() */
:where(.container) :where(.item) {
  margin: 1rem;
}
/* Total specificity: 0 - very easy to override */

.container .item { margin: 0; } /* Specificity: 20 - wins */
```
