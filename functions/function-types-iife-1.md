What is an IIFE and when should you use it?
?

```javascript
// IIFE - Immediately Invoked Function Expression
// Executes immediately, creates private scope

// Use cases:
// 1. Creating private scope/modules
(function() {
  let privateCounter = 0;
  
  window.Counter = {
    increment: () => ++privateCounter,
    getCount: () => privateCounter
  };
})();

Counter.increment();
console.log(Counter.getCount()); // 1
// privateCounter is not accessible outside

// 2. Avoiding global namespace pollution
(function() {
  const config = { apiKey: 'secret' };
  const helper = function() { /* ... */ };
  // These don't pollute global scope
})();

// 3. Initialization code that runs once
(function() {
  // Setup code that runs immediately
  document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
  });
  
  function initializeApp() {
    // App initialization
  }
})();

// 4. Creating closures with captured variables
const buttons = [];
for (var i = 0; i < 3; i++) {
  (function(index) {
    buttons.push(function() {
      console.log('Button', index);
    });
  })(i);
}
```
