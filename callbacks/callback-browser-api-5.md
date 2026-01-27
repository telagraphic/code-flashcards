How do you use a callback with requestAnimationFrame for smooth animations?
?

```javascript
// requestAnimationFrame uses a callback for animation frames
// Provides smooth 60fps animations

let position = 0;
const element = document.getElementById('animatedElement');

function animate() {
  // Callback function executed before next repaint
  position += 2;
  element.style.left = position + 'px';
  
  // Continue animation if not reached end
  if (position < 500) {
    requestAnimationFrame(animate); // Recursive callback
  }
}

// Start animation
requestAnimationFrame(animate);

// Practical example: fade in effect
let opacity = 0;
const fadeElement = document.getElementById('fadeIn');

function fadeIn() {
  opacity += 0.02;
  fadeElement.style.opacity = opacity;
  
  if (opacity < 1) {
    requestAnimationFrame(fadeIn);
  }
}

requestAnimationFrame(fadeIn);
```
