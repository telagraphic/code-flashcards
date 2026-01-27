How do you create a throttled function for drag operations?
?

```javascript
// Throttle utility
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Drag handler - expensive operation
function handleDrag(event) {
  const x = event.clientX;
  const y = event.clientY;
  
  // Update element position
  const draggedElement = document.getElementById('draggable');
  draggedElement.style.left = x + 'px';
  draggedElement.style.top = y + 'px';
  
  // Expensive calculations
  updateCollisionDetection(x, y);
  console.log(`Dragged to ${x}, ${y}`);
}

// Create throttled drag handler (max once per 50ms)
const throttledDrag = throttle(handleDrag, 50);

// Attach to mousemove during drag
let isDragging = false;
document.getElementById('draggable').addEventListener('mousedown', () => {
  isDragging = true;
});

document.addEventListener('mousemove', (e) => {
  if (isDragging) {
    throttledDrag(e);
  }
});

document.addEventListener('mouseup', () => {
  isDragging = false;
});
```
