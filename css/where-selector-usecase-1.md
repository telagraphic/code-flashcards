How do you use :where() for reset styles and base styles?
?

```css
/* :where() for resets and base styles */

/* Reset headings - easy to override */
:where(h1, h2, h3, h4, h5, h6) {
  margin: 0;
  font-weight: normal;
  line-height: 1.2;
}

/* Can be overridden easily */
h1 { font-size: 2rem; } /* Specificity: 1 - wins */

/* Practical: Form element resets */
:where(input, textarea, select, button) {
  font-family: inherit;
  font-size: inherit;
  margin: 0;
  padding: 0;
}

/* Easy to override */
.form-input {
  padding: 10px; /* Specificity: 10 - wins */
}

/* Practical: List resets */
:where(ul, ol) {
  list-style: none;
  padding: 0;
  margin: 0;
}

/* Practical: Link resets */
:where(a) {
  text-decoration: none;
  color: inherit;
}

/* Challenge: Component library base */
:where(.card, .panel, .box) {
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

/* All can be overridden with single class */
.card { padding: 2rem; } /* Specificity: 10 - wins */
```
