What is the 'interactive' readyState and when is it used?
?

```javascript
// document.readyState: 'interactive'
// DOM is ready, but resources (images, stylesheets) may still be loading

// Check readyState
console.log(document.readyState); // 'interactive' (after DOMContentLoaded)

// Practical: DOMContentLoaded fires when readyState becomes 'interactive'
document.addEventListener('DOMContentLoaded', () => {
  console.log(document.readyState); // 'interactive'
  // DOM is fully parsed and ready
  // Safe to manipulate DOM
  initializeApp();
});

// During 'interactive' state:
// - DOM is fully constructed
// - Scripts have executed
// - Images/stylesheets may still be loading
// - User can interact with page

// Practical: Initialize app when DOM ready
function initializeApp() {
  if (document.readyState === 'interactive' || document.readyState === 'complete') {
    // DOM is ready
    setupEventListeners();
    renderInitialContent();
  } else {
    // Wait for DOM
    document.addEventListener('DOMContentLoaded', initializeApp);
  }
}

initializeApp();

// Practical: Check if DOM is ready
function domReady(callback) {
  if (document.readyState === 'interactive' || document.readyState === 'complete') {
    callback();
  } else {
    document.addEventListener('DOMContentLoaded', callback);
  }
}

domReady(() => {
  console.log('DOM is ready!');
});

// 'interactive' is most common state for DOM manipulation
// Equivalent to jQuery's $(document).ready()
```
