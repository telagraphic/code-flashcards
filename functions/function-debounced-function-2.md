How do you create a debounced function for window resize events?
?

```javascript
// Debounce utility
function debounce(func, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

// Expensive resize handler
function handleResize() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  
  // Expensive calculations
  updateLayout(width, height);
  recalculatePositions();
  console.log(`Resized to ${width}x${height}`);
}

// Debounce resize handler (wait 250ms after resize stops)
const debouncedResize = debounce(handleResize, 250);

// Attach debounced handler
window.addEventListener('resize', debouncedResize);
```
