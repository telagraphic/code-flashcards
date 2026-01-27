What is requestAnimationFrame and how does it work?
?

```javascript
// requestAnimationFrame: Schedules callback before next repaint
// Optimized for smooth animations at display refresh rate

// Basic usage
function animate() {
  // Update animation state
  position += 1;
  element.style.left = position + 'px';
  
  // Schedule next frame
  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);

// requestAnimationFrame benefits:
// 1. Synchronized with display refresh rate (60fps)
// 2. Pauses when tab is hidden (saves resources)
// 3. Runs before next paint (optimal timing)

// Practical: Cancel animation
let animationId;
function startAnimation() {
  function animate() {
    element.style.left = position + 'px';
    position++;
    animationId = requestAnimationFrame(animate);
  }
  animationId = requestAnimationFrame(animate);
}

function stopAnimation() {
  cancelAnimationFrame(animationId);
}

// Practical: One-time callback
requestAnimationFrame(() => {
  // Runs once before next repaint
  element.classList.add('visible');
});

// requestAnimationFrame vs setTimeout
// setTimeout: Fixed delay, may run when tab hidden
setTimeout(() => {
  // May run when tab hidden, wastes resources
}, 16);

// requestAnimationFrame: Adaptive timing, pauses when hidden
requestAnimationFrame(() => {
  // Pauses when tab hidden, efficient
});

// Practical: Measure frame rate
let lastTime = performance.now();
let frameCount = 0;

function measureFPS() {
  frameCount++;
  const now = performance.now();
  
  if (now - lastTime >= 1000) {
    console.log(`FPS: ${frameCount}`);
    frameCount = 0;
    lastTime = now;
  }
  
  requestAnimationFrame(measureFPS);
}

requestAnimationFrame(measureFPS);
```
