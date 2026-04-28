How do you create an IIFE (Immediately Invoked Function Expression) to create private scope?
?

```javascript
// IIFE creates private scope
(function() {
  // Private variables - not accessible outside
  let privateCounter = 0;
  const privateData = [];
  
  // Private function
  function incrementCounter() {
    privateCounter++;
  }
  
  // Expose public API
  window.CounterModule = {
    increment: function() {
      incrementCounter();
      return privateCounter;
    },
    getCount: function() {
      return privateCounter;
    }
  };
})();

// Usage - privateCounter is not accessible
CounterModule.increment();
console.log(CounterModule.getCount()); // 1
// console.log(privateCounter); // Error: privateCounter is not defined
```
