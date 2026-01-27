How do you use :is() to simplify complex selector lists?
?

```css
/* :is() for simplifying selector lists */

/* Before: Repetitive selectors */
article h1,
article h2,
article h3,
article h4 {
  color: #333;
  margin-bottom: 1rem;
}

/* After: Cleaner with :is() */
article :is(h1, h2, h3, h4) {
  color: #333;
  margin-bottom: 1rem;
}

/* Practical: Form input styling */
form :is(input[type="text"],
         input[type="email"],
         input[type="password"],
         textarea) {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
}

/* Practical: Navigation links */
nav :is(a, button) {
  padding: 10px 15px;
  text-decoration: none;
  color: inherit;
}

/* Practical: Card components */
.card :is(.card-header, .card-body, .card-footer) {
  padding: 1rem;
}

/* Practical: State combinations */
:is(.active, .selected, .current) {
  background-color: blue;
  color: white;
}

/* Challenge: Combine with pseudo-classes */
:is(button, a):is(:hover, :focus) {
  outline: 2px solid blue;
}
```
