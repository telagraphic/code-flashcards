How do you use requestAnimationFrame for batching DOM reads and writes?
?

```javascript
// requestAnimationFrame for efficient DOM operations
// Batch reads and writes to avoid layout thrashing

// Practical: Batch DOM reads
function batchReads() {
  const elements = document.querySelectorAll('.item');
  const data = [];
  
  // Batch all reads
  elements.forEach(element => {
    data.push({
      width: element.offsetWidth,
      height: element.offsetHeight,
      top: element.offsetTop,
      left: element.offsetLeft
    });
  });
  
  // Process data
  processData(data);
}

// Schedule reads before next paint
requestAnimationFrame(batchReads);

// Practical: Batch DOM writes
function batchWrites() {
  const updates = [
    { element: el1, style: 'color: red' },
    { element: el2, style: 'color: blue' },
    { element: el3, style: 'color: green' }
  ];
  
  // Batch all writes
  updates.forEach(({ element, style }) => {
    element.setAttribute('style', style);
  });
  
  // Single layout/paint
}

requestAnimationFrame(batchWrites);

// Practical: Read-then-write pattern
function readThenWrite() {
  // Phase 1: Read all layout properties
  const rect1 = element1.getBoundingClientRect();
  const rect2 = element2.getBoundingClientRect();
  
  // Phase 2: Calculate based on reads
  const newPosition = calculatePosition(rect1, rect2);
  
  // Phase 3: Write all changes
  element1.style.left = newPosition.x + 'px';
  element2.style.top = newPosition.y + 'px';
  
  // Single layout triggered
}

requestAnimationFrame(readThenWrite);

// Practical: Intersection Observer alternative
function checkVisibility() {
  const elements = document.querySelectorAll('.item');
  
  elements.forEach(element => {
    const rect = element.getBoundingClientRect();
    const isVisible = (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= window.innerHeight &&
      rect.right <= window.innerWidth
    );
    
    element.classList.toggle('visible', isVisible);
  });
  
  requestAnimationFrame(checkVisibility);
}

requestAnimationFrame(checkVisibility);
```
