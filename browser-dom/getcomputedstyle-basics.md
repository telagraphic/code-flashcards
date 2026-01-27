What is getComputedStyle and how do you use it?
?

```javascript
// getComputedStyle: Get final computed CSS values for element
// Returns resolved styles after all CSS rules applied

// Basic usage
const element = document.getElementById('box');
const computed = window.getComputedStyle(element);

// Get specific property
const color = computed.color;
const fontSize = computed.fontSize;
const display = computed.display;

console.log(`Color: ${color}, Font size: ${fontSize}`);

// Practical: Read all computed styles
function getElementStyles(element) {
  const computed = getComputedStyle(element);
  return {
    color: computed.color,
    backgroundColor: computed.backgroundColor,
    width: computed.width,
    height: computed.height,
    margin: computed.margin,
    padding: computed.padding
  };
}

// Practical: Check if element is visible
function isElementVisible(element) {
  const computed = getComputedStyle(element);
  return computed.display !== 'none' && 
         computed.visibility !== 'hidden' &&
         computed.opacity !== '0';
}

// Practical: Get pseudo-element styles
const pseudoStyles = getComputedStyle(element, '::before');
const beforeContent = pseudoStyles.content;

// Practical: Compare computed vs inline styles
const inlineColor = element.style.color; // May be empty
const computedColor = getComputedStyle(element).color; // Always has value

// getComputedStyle returns:
// - Resolved values (e.g., '16px' not '1em')
// - All properties, even if not explicitly set
// - Final values after CSS cascade

// Note: getComputedStyle forces style calculation
// Use sparingly to avoid performance issues
```
