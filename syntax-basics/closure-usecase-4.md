How do you use closures for debouncing and throttling?
?

```javascript
// Closure for debouncing (delay execution until pause)
function debounce(func, delay) {
  let timeoutId; // Private variable in closure
  
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

// Usage: Search input
const searchInput = document.getElementById('search');
const debouncedSearch = debounce(function(query) {
  performSearch(query);
}, 300);

searchInput.addEventListener('input', (e) => {
  debouncedSearch(e.target.value);
});

// Closure for throttling (limit execution frequency)
function throttle(func, limit) {
  let inThrottle; // Private variable
  
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

// Usage: Scroll handler
const throttledScroll = throttle(function() {
  updateScrollPosition();
}, 100);

window.addEventListener('scroll', throttledScroll);

// Practical: Combined debounce and throttle
function createRateLimiter(fn, delay, maxCalls) {
  let callCount = 0;
  let lastReset = Date.now();
  
  return function(...args) {
    const now = Date.now();
    
    if (now - lastReset >= delay) {
      callCount = 0;
      lastReset = now;
    }
    
    if (callCount < maxCalls) {
      callCount++;
      return fn(...args);
    }
  };
}
```
