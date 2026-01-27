Challenge: How do you use :where() to solve specificity problems?
?

```css
/* Challenge 1: Override nested selectors */
/* Base styles with :where() */
:where(.card) :where(.title) {
  font-size: 1.5rem;
}

/* Easy override */
.title { font-size: 2rem; } /* Specificity: 10 - wins */

/* Challenge 2: Component library integration */
/* Library uses :where() for base styles */
:where(.library-component) {
  padding: 20px;
  background: white;
}

/* Your styles easily override */
.library-component {
  padding: 15px; /* Specificity: 10 - wins */
  background: #f0f0f0; /* Specificity: 10 - wins */
}

/* Challenge 3: Reset conflicting styles */
/* Multiple sources define same selector */
:where(header, footer) .link {
  color: blue;
}

/* Easy to override anywhere */
.link { color: red; } /* Specificity: 10 - wins */
header .link { color: green; } /* Specificity: 20 - wins */

/* Challenge 4: Utility classes with :where() */
:where(.text-center, .text-left, .text-right) {
  text-align: center;
}

/* Can override with element selector */
p { text-align: left; } /* Specificity: 1 - wins */

/* Challenge 5: Form styling hierarchy */
/* Base form styles with :where() */
:where(form) :where(input, select, textarea) {
  border: 1px solid #ccc;
}

/* Easy to create specific form styles */
.form-modern input {
  border: 2px solid blue; /* Specificity: 20 - wins */
}

/* Challenge 6: Navigation menu reset */
:where(nav) :where(ul, ol) {
  list-style: none;
  padding: 0;
}

:where(nav) :where(a, button) {
  text-decoration: none;
  color: inherit;
}

/* Easy to style specific navigation */
.nav-primary a {
  color: blue; /* Specificity: 20 - wins */
  font-weight: bold; /* Specificity: 20 - wins */
}

/* Challenge 7: Card component system */
:where(.card) :where(.header, .body, .footer) {
  padding: 1rem;
}

/* Override for specific card type */
.card.featured .header {
  padding: 2rem; /* Specificity: 30 - wins */
}
```
