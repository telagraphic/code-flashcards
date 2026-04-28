How do you create a throttled function for API rate limiting?
?

```javascript
// Throttle utility
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

// API call function
async function trackUserActivity(activity) {
  try {
    const response = await fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ activity, timestamp: Date.now() })
    });
    return response.json();
  } catch (error) {
    console.error('Tracking failed:', error);
  }
}

// Create throttled tracker (max once per 1000ms = 1 second)
const throttledTrack = throttle(trackUserActivity, 1000);

// Track mouse movements (throttled to once per second)
document.addEventListener('mousemove', (e) => {
  throttledTrack({
    type: 'mousemove',
    x: e.clientX,
    y: e.clientY
  });
});

// Track clicks (throttled to once per second)
document.addEventListener('click', (e) => {
  throttledTrack({
    type: 'click',
    target: e.target.tagName
  });
});
```
