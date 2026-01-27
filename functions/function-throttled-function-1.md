How do you create a throttled function for scroll events?
?

```javascript
// Throttle utility function
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

// Scroll handler
function handleScroll() {
  const scrollY = window.scrollY;
  const header = document.getElementById('header');
  
  if (scrollY > 100) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  
  console.log('Scroll position:', scrollY);
}

// Create throttled scroll handler (max once per 100ms)
const throttledScroll = throttle(handleScroll, 100);

// Attach throttled handler
window.addEventListener('scroll', throttledScroll);
```
