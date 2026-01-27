How do you get client dimensions (viewport without scrollbar)?
?

```javascript
// Client dimensions: Viewport excluding scrollbar

// document.documentElement.clientWidth / clientHeight
// Viewport width/height excluding scrollbar
const clientWidth = document.documentElement.clientWidth;
const clientHeight = document.documentElement.clientHeight;

// Practical: Get viewport without scrollbar
function getViewportSize() {
  return {
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight
  };
}

// Difference from window.innerWidth:
// - window.innerWidth: Includes scrollbar
// - clientWidth: Excludes scrollbar

// Practical: Calculate scrollbar width
const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
console.log(`Scrollbar width: ${scrollbarWidth}px`);

// Practical: Full viewport modal
function showFullscreenModal() {
  const modal = document.getElementById('modal');
  modal.style.width = document.documentElement.clientWidth + 'px';
  modal.style.height = document.documentElement.clientHeight + 'px';
}

// Practical: Center element in viewport
function centerElement(element) {
  const viewportWidth = document.documentElement.clientWidth;
  const viewportHeight = document.documentElement.clientHeight;
  const elementWidth = element.offsetWidth;
  const elementHeight = element.offsetHeight;
  
  element.style.left = (viewportWidth - elementWidth) / 2 + 'px';
  element.style.top = (viewportHeight - elementHeight) / 2 + 'px';
}

// Practical: Responsive calculations
function isViewportPortrait() {
  return document.documentElement.clientHeight > document.documentElement.clientWidth;
}

function getViewportAspectRatio() {
  return document.documentElement.clientWidth / document.documentElement.clientHeight;
}
```
