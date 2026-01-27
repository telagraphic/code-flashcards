Challenge: How do you use :is() for advanced selector patterns?
?

```css
/* Challenge 1: Nested :is() with different contexts */
/* Style headings in articles OR sections, but only when they have links */
:is(article, section) :is(h1, h2, h3):has(a) {
  color: blue;
}

/* Challenge 2: Combine :is() with attribute selectors */
/* Style inputs that are text-based OR have specific attributes */
:is(input[type="text"],
     input[type="email"],
     input[type="password"],
     input[type="search"]):is([required], [aria-required="true"]) {
  border-left: 3px solid red;
}

/* Challenge 3: :is() with child combinators */
/* Style direct children that are headings OR have specific classes */
.container > :is(h1, h2, h3, .section-title) {
  margin-top: 2rem;
}

/* Challenge 4: :is() for responsive breakpoints */
@media (max-width: 768px) {
  :is(.sidebar, .aside, .widget):not(:is(.sticky, .fixed)) {
    display: none;
  }
}

/* Challenge 5: :is() with :not() for exclusions */
/* Style all buttons except primary and secondary */
:is(button, [role="button"]):not(:is(.btn-primary, .btn-secondary)) {
  background-color: #f0f0f0;
}

/* Challenge 6: Complex form styling */
/* Style form groups that contain required fields */
.form-group:has(:is(input[required], select[required], textarea[required])) {
  border-left: 3px solid orange;
}

.form-group:has(:is(input[required], select[required], textarea[required]):invalid) {
  border-left-color: red;
}

/* Challenge 7: Card component variants */
/* Style cards that are featured OR have images */
:is(.card.featured, .card:has(img)) {
  grid-column: span 2;
  background-color: #f9f9f9;
}

/* Challenge 8: Navigation states */
/* Active or hover state for navigation items */
nav :is(.nav-item, .menu-item):is(.active, :hover):not(:disabled) {
  background-color: rgba(0, 0, 0, 0.1);
  transform: translateX(5px);
}
```
