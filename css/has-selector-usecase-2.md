How do you use :has() for card and component styling?
?

```css
/* :has() for component-based styling */

/* Style card when it contains image */
.card:has(img) {
  display: flex;
  flex-direction: column;
}

.card:has(img) .card-content {
  padding-top: 1rem;
}

/* Style card when it has no image */
.card:not(:has(img)) .card-content {
  padding: 1.5rem;
}

/* Practical: Navigation menu with active item */
.nav:has(.nav-item.active) {
  background-color: #f0f0f0;
}

.nav:has(.nav-item.active) .nav-item {
  opacity: 0.7;
}

.nav:has(.nav-item.active) .nav-item.active {
  opacity: 1;
  font-weight: bold;
}

/* Practical: Grid layout adjustments */
.grid:has(.card.featured) {
  grid-template-columns: 2fr 1fr 1fr;
}

.grid:not(:has(.card.featured)) {
  grid-template-columns: repeat(3, 1fr);
}

/* Challenge: Style container when it has exactly 3 children */
.container:has(:nth-child(3):last-child) {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
```
