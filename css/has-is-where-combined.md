How do you combine :has(), :is(), and :where() together?
?

```css
/* Combining :has(), :is(), and :where() */

/* Challenge 1: Complex form validation */
/* Style form group when it has invalid text inputs */
.form-group:has(:is(input[type="text"],
                    input[type="email"],
                    input[type="password"]):invalid) {
  border-color: red;
}

/* Challenge 2: Component variants with :where() base */
:where(.card, .panel):has(:is(.button, .link)) {
  padding: 1.5rem;
}

/* Easy to override */
.card { padding: 1rem; } /* Specificity: 10 - wins */

/* Challenge 3: Navigation with active states */
nav:has(:is(.nav-item, .menu-item).active) {
  background-color: #f0f0f0;
}

nav :where(.nav-item, .menu-item):is(.active, :hover) {
  color: blue;
}

/* Challenge 4: Grid layout based on content */
.gallery:has(:is(.item:has(img), .item:has(video))) {
  grid-template-columns: repeat(3, 1fr);
}

.gallery:not(:has(:is(.item:has(img), .item:has(video)))) {
  grid-template-columns: 1fr;
}

/* Challenge 5: Form with multiple input types */
form:has(:is(input[type="text"],
              input[type="email"],
              textarea):invalid) button[type="submit"] {
  opacity: 0.5;
  pointer-events: none;
}

/* Challenge 6: Card system with flexible content */
:where(.card):has(:is(img, video, .media)) {
  display: grid;
  grid-template-columns: 1fr 2fr;
}

:where(.card):not(:has(:is(img, video, .media))) {
  display: block;
}

/* Challenge 7: Menu with conditional styling */
.menu:has(:is(.menu-item.active, .menu-item:hover)) {
  border-bottom: 2px solid blue;
}

.menu :where(.menu-item):is(.active, :hover) {
  background-color: rgba(0, 0, 0, 0.1);
}

/* Challenge 8: Responsive component system */
@media (max-width: 768px) {
  :where(.container):has(:is(.sidebar, .aside)) {
    flex-direction: column;
  }
  
  :where(.container):not(:has(:is(.sidebar, .aside))) {
    flex-direction: row;
  }
}
```
