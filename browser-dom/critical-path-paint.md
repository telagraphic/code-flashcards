What happens in the Paint step of the Critical Rendering Path?
?

```javascript
// Paint: Fill pixels for visible elements
// Creates visual representation of elements

// Paint happens after Layout
// Paints elements in layers based on stacking context

// Paint is triggered by:
// 1. Visual property changes
element.style.color = 'red'; // Triggers Paint
element.style.backgroundColor = 'blue'; // Triggers Paint
element.style.border = '1px solid black'; // Triggers Paint

// 2. Layout changes (paint follows layout)
element.style.width = '200px'; // Layout → Paint

// 3. Visibility changes
element.style.display = 'block'; // Triggers Paint

// 4. Opacity changes (can trigger Paint)
element.style.opacity = '0.5'; // May trigger Paint

// Practical: Optimize paint operations
// BAD: Multiple paint-triggering changes
element.style.color = 'red';
element.style.backgroundColor = 'blue';
element.style.border = '1px solid black'; // Multiple paints

// GOOD: Batch changes or use classes
element.className = 'styled'; // Single paint

// Practical: Use will-change hint
element.style.willChange = 'transform'; // Hints browser to optimize

// Paint areas: Browser only repaints changed regions
// Minimize paint area for better performance

// Practical: Avoid expensive paint operations
// Gradients, shadows, filters are expensive to paint
element.style.boxShadow = '0 0 10px rgba(0,0,0,0.5)'; // Expensive paint

// Paint output: Pixel data for each layer
// Next step: Composite layers together
```
