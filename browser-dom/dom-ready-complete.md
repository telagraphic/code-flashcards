What is the 'complete' readyState and when is it used?
?

```javascript
// document.readyState: 'complete'
// Document and all resources (images, stylesheets) are fully loaded

// Check readyState
console.log(document.readyState); // 'complete' (after window.load)

// Practical: window.load fires when readyState becomes 'complete'
window.addEventListener('load', () => {
  console.log(document.readyState); // 'complete'
  // Everything is loaded
  // All images, stylesheets, scripts are ready
});

// During 'complete' state:
// - DOM is ready
// - All resources are loaded
// - Page is fully rendered
// - Safe to measure layout

// Practical: Measure page load performance
window.addEventListener('load', () => {
  const perfData = performance.timing;
  const loadTime = perfData.loadEventEnd - perfData.navigationStart;
  console.log(`Page load time: ${loadTime}ms`);
});

// Practical: Initialize after everything loaded
function initializeAfterLoad() {
  if (document.readyState === 'complete') {
    // Everything loaded
    initializeHeavyFeatures();
  } else {
    window.addEventListener('load', initializeAfterLoad);
  }
}

// Practical: Check if page fully loaded
function pageLoaded(callback) {
  if (document.readyState === 'complete') {
    callback();
  } else {
    window.addEventListener('load', callback);
  }
}

pageLoaded(() => {
  // Safe to:
  // - Measure element dimensions
  // - Initialize heavy features
  // - Start animations
  // - Load additional resources
  console.log('Page fully loaded!');
});

// 'complete' state is best for:
// - Performance measurements
// - Heavy initialization
// - Features that need all resources
```
