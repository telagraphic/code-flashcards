How does the Event Loop handle DOM updates and rendering?
?

```javascript
// DOM updates are batched and rendered efficiently
// Browser optimizes updates between event loop cycles

// Practical: DOM updates are batched
// Multiple DOM changes in one task are batched
function updateDOM() {
  element1.style.color = 'red';
  element2.style.color = 'blue';
  element3.style.color = 'green';
  // All changes batched, single render
}

// Practical: requestAnimationFrame timing
// Runs before next repaint (~16ms for 60fps)
function animate() {
  element.style.left = position + 'px';
  position++;
  
  requestAnimationFrame(animate); // Schedules before next paint
}

requestAnimationFrame(animate);

// Practical: Microtasks vs Macrotasks
Promise.resolve().then(() => {
  console.log('Microtask');
  // Runs before next render
});

setTimeout(() => {
  console.log('Macrotask');
  // Runs after current task and microtasks
}, 0);

// Practical: Synchronous layout reads force immediate layout
function badExample() {
  element.style.width = '200px';
  const width = element.offsetWidth; // Forces synchronous layout
  element.style.height = width + 'px';
  // Layout happens immediately, blocking
}

function goodExample() {
  element.style.width = '200px';
  element.style.height = '200px';
  // Layout deferred until read or next frame
  requestAnimationFrame(() => {
    const width = element.offsetWidth; // Read in next frame
  });
}

// Render phase happens:
// - After microtasks complete
// - Before next macrotask (if time allows)
// - Target: 60fps (every ~16ms)

// Practical: Measure frame time
let lastTime = performance.now();
function measureFrame() {
  const now = performance.now();
  const frameTime = now - lastTime;
  console.log(`Frame time: ${frameTime}ms`);
  lastTime = now;
  requestAnimationFrame(measureFrame);
}
requestAnimationFrame(measureFrame);
```
