Challenge: How do you use :has() for complex conditional layouts?
?

```css
/* Challenge 1: Responsive grid based on content */
/* Make grid 2 columns when items have images, 1 column otherwise */
.gallery:has(.item:has(img)) {
  grid-template-columns: repeat(2, 1fr);
}

.gallery:not(:has(.item:has(img))) {
  grid-template-columns: 1fr;
}

/* Challenge 2: Show/hide elements based on sibling state */
/* Show action button only when item is selected */
.list-item:has(.checkbox:checked) .action-button {
  display: inline-block;
}

.list-item:not(:has(.checkbox:checked)) .action-button {
  display: none;
}

/* Challenge 3: Conditional card layout */
/* Stack layout when card has video, side-by-side otherwise */
.card-container:has(.card:has(video)) {
  flex-direction: column;
}

.card-container:not(:has(.card:has(video))) {
  flex-direction: row;
}

/* Challenge 4: Style parent based on multiple children */
/* Highlight section when it has both required and optional fields */
.section:has(.required):has(.optional) {
  border: 2px solid blue;
}

/* Challenge 5: Count-based styling */
/* Style container differently based on number of items */
.container:has(:nth-child(5)):not(:has(:nth-child(6))) {
  /* Exactly 5 items */
  grid-template-columns: repeat(5, 1fr);
}

.container:has(:nth-child(6)) {
  /* 6 or more items */
  grid-template-columns: repeat(3, 1fr);
}

/* Challenge 6: Empty state handling */
/* Show empty state message when list has no items */
.list:not(:has(.list-item))::after {
  content: "No items to display";
  display: block;
  text-align: center;
  padding: 2rem;
  color: #999;
}
```
