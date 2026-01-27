How do you use requestAnimationFrame for smooth animations?
?

```javascript
// requestAnimationFrame for smooth 60fps animations

// Practical: Fade in animation
function fadeIn(element, duration = 1000) {
  const startTime = performance.now();
  const startOpacity = 0;
  const endOpacity = 1;
  
  function animate(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    const opacity = startOpacity + (endOpacity - startOpacity) * progress;
    element.style.opacity = opacity;
    
    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  }
  
  requestAnimationFrame(animate);
}

fadeIn(document.getElementById('box'));

// Practical: Smooth scroll animation
function smoothScrollTo(targetY, duration = 1000) {
  const startY = window.scrollY;
  const distance = targetY - startY;
  const startTime = performance.now();
  
  function animate(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Easing function (ease-in-out)
    const ease = progress < 0.5
      ? 2 * progress * progress
      : 1 - Math.pow(-2 * progress + 2, 2) / 2;
    
    window.scrollTo(0, startY + distance * ease);
    
    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  }
  
  requestAnimationFrame(animate);
}

smoothScrollTo(500);

// Practical: Transform-based animation (composite only)
function animateTransform(element) {
  let position = 0;
  
  function animate() {
    position += 2;
    element.style.transform = `translateX(${position}px)`;
    
    if (position < 500) {
      requestAnimationFrame(animate);
    }
  }
  
  requestAnimationFrame(animate);
}

// Uses Composite step only (fastest)
animateTransform(document.getElementById('box'));
```
