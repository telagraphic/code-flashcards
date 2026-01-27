What is the 'loading' readyState and when is it used?
?

```javascript
// document.readyState: 'loading'
// Document is still loading

// Check readyState
console.log(document.readyState); // 'loading' (during initial load)

// Practical: Detect loading state
if (document.readyState === 'loading') {
  console.log('Document is still loading');
  // Scripts haven't finished executing
  // DOM not fully parsed
}

// During 'loading' state:
// - HTML is being parsed
// - Scripts are being executed
// - DOM is being constructed
// - Stylesheets are being loaded

// Practical: Wait for DOM to be ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    // DOM is ready, but resources may still be loading
    initializeApp();
  });
} else {
  // Already loaded
  initializeApp();
}

// 'loading' → 'interactive' → 'complete'
// 'loading': Document is loading
// 'interactive': DOM is ready, but resources still loading
// 'complete': Document and resources fully loaded

// Practical: Early script execution
// Scripts in <head> run during 'loading' state
// Can check readyState to determine behavior
if (document.readyState === 'loading') {
  // Set up early event listeners
  document.addEventListener('DOMContentLoaded', handler);
}
```
