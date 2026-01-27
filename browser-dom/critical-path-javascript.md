What happens in the JavaScript step of the Critical Rendering Path?
?

```javascript
// JavaScript step: Execute scripts and modify DOM/CSS
// Can trigger subsequent steps (Styles, Layout, Paint, Composite)

// JavaScript execution can:
// 1. Modify DOM structure
document.body.appendChild(newElement); // Triggers Layout

// 2. Modify CSS styles
element.style.color = 'red'; // Triggers Styles → Layout → Paint

// 3. Read layout properties (forces synchronous layout)
const width = element.offsetWidth; // Forces Layout calculation

// 4. Trigger reflows/repaints
element.style.display = 'none'; // Triggers Layout → Paint

// Practical: Minimize layout thrashing
// BAD: Reading and writing alternates (triggers multiple layouts)
for (let i = 0; i < items.length; i++) {
  items[i].style.width = items[i].offsetWidth + 10 + 'px'; // Layout on each iteration!
}

// GOOD: Batch reads, then batch writes
const widths = items.map(item => item.offsetWidth); // Single layout
items.forEach((item, i) => {
  item.style.width = widths[i] + 10 + 'px'; // Single layout
});

// Practical: Use requestAnimationFrame for visual updates
function animate() {
  element.style.left = position + 'px';
  position++;
  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);

// JavaScript execution blocks rendering
// Long-running scripts delay paint and composite steps
```
