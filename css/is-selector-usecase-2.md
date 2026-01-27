How do you use :is() with pseudo-classes and combinators?
?

```css
/* :is() with pseudo-classes */

/* Style headings in different states */
:is(h1, h2, h3):is(:hover, :focus) {
  color: blue;
  text-decoration: underline;
}

/* Practical: Form validation states */
:is(input, textarea, select):is(:invalid, :required) {
  border-color: red;
}

:is(input, textarea, select):is(:valid, :optional) {
  border-color: green;
}

/* Practical: Interactive elements */
:is(button, a, [role="button"]):is(:hover, :focus, :active) {
  transform: scale(1.05);
  transition: transform 0.2s;
}

/* Practical: Nested :is() */
:is(.card, .panel):is(:has(.button), :has(.link)) {
  padding: 1.5rem;
}

/* Challenge: Complex state combinations */
:is(.menu-item, .nav-link):is(.active, :hover):not(:disabled) {
  background-color: #f0f0f0;
  font-weight: bold;
}

/* Challenge: Responsive typography */
@media (max-width: 768px) {
  :is(h1, h2, h3, h4, h5, h6) {
    font-size: clamp(1rem, 4vw, 2rem);
  }
}

/* Practical: Component variants */
:is(.btn-primary, .btn-secondary):is(:hover, :focus) {
  opacity: 0.9;
}

:is(.btn-primary, .btn-secondary):disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
```
