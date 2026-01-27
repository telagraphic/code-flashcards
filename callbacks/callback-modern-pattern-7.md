How do you use callbacks with debouncing and throttling patterns?
?

```javascript
// Callbacks are essential for debouncing and throttling

// Debounce: delay callback execution until after pause
function debounce(callback, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(function() {
      callback.apply(this, args); // Execute callback after delay
    }, delay);
  };
}

// Throttle: limit callback execution frequency
function throttle(callback, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      callback.apply(this, args); // Execute callback
      inThrottle = true;
      setTimeout(function() {
        inThrottle = false;
      }, limit);
    }
  };
}

// Usage: search input with debounced callback
const debouncedSearch = debounce(function(query) {
  performSearch(query); // Callback executed after user stops typing
}, 300);

document.getElementById('search').addEventListener('input', function(e) {
  debouncedSearch(e.target.value);
});

// Usage: scroll handler with throttled callback
const throttledScroll = throttle(function() {
  updateScrollPosition(); // Callback executed max once per 100ms
}, 100);

window.addEventListener('scroll', throttledScroll);
```
