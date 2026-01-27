What is getBoundingClientRect and how do you use it?
?

```javascript
// getBoundingClientRect: Get element position and size relative to viewport
// Returns DOMRect with position and dimensions

// Basic usage
const element = document.getElementById('box');
const rect = element.getBoundingClientRect();

// Properties:
console.log(rect.left);    // Distance from left edge of viewport
console.log(rect.top);     // Distance from top edge of viewport
console.log(rect.right);   // Distance from right edge of viewport
console.log(rect.bottom);  // Distance from bottom edge of viewport
console.log(rect.width);   // Element width
console.log(rect.height);  // Element height
console.log(rect.x);       // Same as left
console.log(rect.y);       // Same as top

// Practical: Check if element is in viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= window.innerHeight &&
    rect.right <= window.innerWidth
  );
}

// Practical: Check if element is partially visible
function isPartiallyVisible(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.bottom > 0 &&
    rect.right > 0 &&
    rect.top < window.innerHeight &&
    rect.left < window.innerHeight
  );
}

// Practical: Get element center point
function getElementCenter(element) {
  const rect = element.getBoundingClientRect();
  return {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2
  };
}

// Note: getBoundingClientRect() forces layout calculation
// Batch reads together for better performance
```
