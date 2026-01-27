What happens in the Layout (Reflow) step of the Critical Rendering Path?
?

```javascript
// Layout (Reflow): Calculate positions and sizes of all elements
// Happens when element geometry changes

// Layout is triggered by:
// 1. Changing size properties
element.style.width = '200px'; // Triggers Layout
element.style.height = '100px'; // Triggers Layout

// 2. Changing position properties
element.style.left = '50px'; // Triggers Layout
element.style.top = '100px'; // Triggers Layout

// 3. Reading layout properties (forces synchronous layout)
const width = element.offsetWidth; // Forces Layout calculation
const height = element.offsetHeight; // Forces Layout

// 4. DOM structure changes
parent.appendChild(newElement); // Triggers Layout

// 5. Window resize
window.addEventListener('resize', () => {
  // Triggers Layout for affected elements
});

// Practical: Avoid layout thrashing
// BAD: Multiple layout-triggering operations
for (let i = 0; i < 100; i++) {
  element.style.width = i + 'px'; // 100 layouts!
}

// GOOD: Batch changes or use transforms
element.style.width = '100px'; // Single layout

// Or use CSS transforms (doesn't trigger layout)
element.style.transform = 'translateX(100px)'; // No layout, goes to Composite

// Practical: Read layout properties efficiently
// Batch reads together
const rect = element.getBoundingClientRect(); // Forces layout
const width = rect.width;
const height = rect.height;
// Do all reads before any writes

// Layout is expensive - minimize triggers
// Use transforms/opacity for animations (skip Layout)
```
