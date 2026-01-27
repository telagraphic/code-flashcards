What's the difference between client, scroll, and offset dimensions?
?

```javascript
// Comparison of client, scroll, and offset properties

const element = document.getElementById('box');

// CLIENT dimensions (content + padding, no border/scrollbar)
element.clientWidth;   // Content width + padding
element.clientHeight;  // Content height + padding
element.clientLeft;    // Left border width
element.clientTop;     // Top border width

// SCROLL dimensions (total scrollable content)
element.scrollWidth;   // Total content width (including hidden)
element.scrollHeight;  // Total content height (including hidden)
element.scrollLeft;    // Horizontal scroll position
element.scrollTop;     // Vertical scroll position

// OFFSET dimensions (total size including border)
element.offsetWidth;   // Content + padding + border + scrollbar
element.offsetHeight;  // Content + padding + border + scrollbar
element.offsetLeft;    // Position relative to offsetParent
element.offsetTop;     // Position relative to offsetParent

// Visual breakdown:
// offsetWidth = clientWidth + borderLeft + borderRight + scrollbar
// scrollHeight >= clientHeight (if content overflows)

// Practical: Check if element has scrollbar
function hasVerticalScrollbar(element) {
  return element.scrollHeight > element.clientHeight;
}

function hasHorizontalScrollbar(element) {
  return element.scrollWidth > element.clientWidth;
}

// Practical: Scroll to bottom
function scrollToBottom(element) {
  element.scrollTop = element.scrollHeight - element.clientHeight;
}

// Practical: Get scroll percentage
function getScrollPercentage(element) {
  const maxScroll = element.scrollHeight - element.clientHeight;
  return (element.scrollTop / maxScroll) * 100;
}

// Practical: Detect scroll position
function isScrolledToTop(element) {
  return element.scrollTop === 0;
}

function isScrolledToBottom(element) {
  return element.scrollTop + element.clientHeight >= element.scrollHeight;
}

// When to use each:
// - clientWidth/Height: Content area size
// - scrollWidth/Height: Total scrollable size
// - offsetWidth/Height: Total element size
// - getBoundingClientRect(): Viewport-relative position (preferred)
```
