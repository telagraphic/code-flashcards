What are offsetWidth, offsetHeight, and related offset properties?
?

```javascript
// Offset dimensions: Element size including padding and border

// offsetWidth / offsetHeight
// Total width/height including padding, border, scrollbar (if any)
const element = document.getElementById('box');
const width = element.offsetWidth;
const height = element.offsetHeight;

// offsetLeft / offsetTop
// Position relative to offsetParent (nearest positioned ancestor)
const left = element.offsetLeft;
const top = element.offsetTop;

// offsetParent
// Nearest positioned ancestor (position: relative/absolute/fixed)
const parent = element.offsetParent;

// Practical: Get element dimensions
function getElementDimensions(element) {
  return {
    width: element.offsetWidth,
    height: element.offsetHeight,
    left: element.offsetLeft,
    top: element.offsetTop
  };
}

// offsetWidth includes:
// - Content width
// - Padding (left + right)
// - Border (left + right)
// - Scrollbar (if present)

// Does NOT include:
// - Margin
// - Transform scale

// Practical: Calculate total size including margin
function getTotalSize(element) {
  const computed = getComputedStyle(element);
  const marginLeft = parseFloat(computed.marginLeft) || 0;
  const marginRight = parseFloat(computed.marginRight) || 0;
  const marginTop = parseFloat(computed.marginTop) || 0;
  const marginBottom = parseFloat(computed.marginBottom) || 0;
  
  return {
    totalWidth: element.offsetWidth + marginLeft + marginRight,
    totalHeight: element.offsetHeight + marginTop + marginBottom
  };
}

// Practical: Get position relative to document
function getDocumentPosition(element) {
  let left = element.offsetLeft;
  let top = element.offsetTop;
  let parent = element.offsetParent;
  
  while (parent) {
    left += parent.offsetLeft;
    top += parent.offsetTop;
    parent = parent.offsetParent;
  }
  
  return { left, top };
}

// Note: offsetWidth/offsetHeight force layout calculation
// Use getBoundingClientRect() for better performance when possible
```
