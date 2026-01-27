What is the Critical Rendering Path and what are its main steps?
?

```javascript
// Critical Rendering Path: sequence browser follows to render a page
// Steps: JavaScript → Styles → Layout → Paint → Composite

// 1. JavaScript: Execute scripts, modify DOM/CSS
// 2. Styles: Calculate computed styles for elements
// 3. Layout (Reflow): Calculate element positions and sizes
// 4. Paint: Fill pixels for each element
// 5. Composite: Layer elements together for final display

// Each step can trigger the next step
// Optimizing CRP improves page load and performance

// Example: Changing element style triggers full cycle
const element = document.getElementById('box');
element.style.width = '200px'; // Triggers: Styles → Layout → Paint → Composite

// Modern web apps optimize CRP by:
// - Minimizing layout thrashing
// - Using CSS transforms instead of position changes
// - Batching DOM reads/writes
// - Using requestAnimationFrame for visual updates
```
