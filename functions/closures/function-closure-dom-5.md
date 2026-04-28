How do you use closures to track scroll position and trigger actions?
?

```javascript
// Closure maintains scroll tracking state

function createScrollTracker(options = {}) {
  const { threshold = 100, onScrollDown, onScrollUp, onReachBottom } = options;
  
  // Private state
  let lastScrollY = window.scrollY;
  let ticking = false;  // For requestAnimationFrame throttling
  
  const update = function() {
    const currentScrollY = window.scrollY;
    const direction = currentScrollY > lastScrollY ? 'down' : 'up';
    const delta = Math.abs(currentScrollY - lastScrollY);
    
    // Only trigger if scrolled more than threshold
    if (delta > threshold) {
      if (direction === 'down' && onScrollDown) {
        onScrollDown(currentScrollY);
      } else if (direction === 'up' && onScrollUp) {
        onScrollUp(currentScrollY);
      }
      lastScrollY = currentScrollY;
    }
    
    // Check if reached bottom
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    if (currentScrollY + clientHeight >= scrollHeight - 50) {
      if (onReachBottom) onReachBottom();
    }
    
    ticking = false;
  };
  
  // Handler uses requestAnimationFrame for performance
  const handleScroll = function() {
    if (!ticking) {
      requestAnimationFrame(update);  // Closure over update
      ticking = true;
    }
  };
  
  window.addEventListener('scroll', handleScroll, { passive: true });
  
  return {
    getLastPosition: () => lastScrollY,
    reset: () => {
      lastScrollY = window.scrollY;
    },
    destroy: () => {
      window.removeEventListener('scroll', handleScroll);
    }
  };
}

// Usage: show/hide header on scroll
const tracker = createScrollTracker({
  threshold: 50,
  onScrollDown: () => {
    document.querySelector('header').classList.add('hidden');
  },
  onScrollUp: () => {
    document.querySelector('header').classList.remove('hidden');
  },
  onReachBottom: () => {
    console.log('Load more content...');
  }
});
```
