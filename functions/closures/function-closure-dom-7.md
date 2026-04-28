How do you use closures to create an animation controller?
?

```javascript
// Closure manages animation state and requestAnimationFrame

function createAnimationController(elementId) {
  const element = document.getElementById(elementId);
  
  // Private state
  let animationId = null;
  let startTime = null;
  let isRunning = false;
  let currentAnimation = null;
  
  const animate = function(timestamp) {
    if (!isRunning || !currentAnimation) return;
    
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / currentAnimation.duration, 1);
    
    // Apply easing (closure over currentAnimation)
    const easedProgress = currentAnimation.easing
      ? currentAnimation.easing(progress)
      : progress;
    
    // Update element (closure over element)
    currentAnimation.update(element, easedProgress);
    
    if (progress < 1) {
      animationId = requestAnimationFrame(animate);
    } else {
      isRunning = false;
      if (currentAnimation.onComplete) {
        currentAnimation.onComplete();
      }
    }
  };
  
  return {
    start: (animation) => {
      // animation = { duration, update, easing?, onComplete? }
      if (isRunning) {
        cancelAnimationFrame(animationId);
      }
      currentAnimation = animation;
      startTime = null;
      isRunning = true;
      animationId = requestAnimationFrame(animate);
    },
    
    stop: () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      isRunning = false;
      animationId = null;
    },
    
    isRunning: () => isRunning,
    
    destroy: () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      isRunning = false;
      currentAnimation = null;
    }
  };
}

// Usage: animate a box
const boxController = createAnimationController('animated-box');

boxController.start({
  duration: 1000,
  easing: (t) => t * t,  // Ease-in quadratic
  update: (el, progress) => {
    el.style.transform = `translateX(${progress * 300}px)`;
    el.style.opacity = 1 - progress * 0.5;
  },
  onComplete: () => console.log('Animation done')
});

// Stop animation early
boxController.stop();
```
