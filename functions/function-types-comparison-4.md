How do IIFEs compare to regular functions and when to use each?
?

```javascript
// Regular Function
// - Must be called explicitly
// - Can be called multiple times
// - Creates scope when called

function setup() {
  const config = { apiKey: 'secret' };
  // Setup code
}

setup(); // Must call explicitly
setup(); // Can call again

// IIFE (Immediately Invoked Function Expression)
// - Executes immediately
// - Runs only once
// - Creates isolated scope immediately

(function() {
  const config = { apiKey: 'secret' };
  // Setup code runs immediately
})();

// Use cases comparison:

// Regular function: Reusable initialization
function initializeApp() {
  // Can call multiple times
  setupEventListeners();
  loadConfig();
}

initializeApp();
// Can call again if needed
initializeApp();

// IIFE: One-time setup, module pattern
(function() {
  // Private scope
  let counter = 0;
  
  // Public API
  window.App = {
    increment: () => ++counter,
    getCount: () => counter
  };
})(); // Runs immediately, once

// IIFE with parameters
(function(global, $) {
  // Use $ as jQuery, global as window
  global.myApp = { /* ... */ };
})(window, jQuery);
```
