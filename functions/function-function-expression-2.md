How do you use a function expression to create a closure that encapsulates private data?
?

```javascript
// Function expression creating a closure
const createCounter = function() {
  let count = 0; // Private variable
  
  return function() {
    count++;
    return count;
  };
};

// Each instance has its own private count
const counter1 = createCounter();
const counter2 = createCounter();

console.log(counter1()); // 1
console.log(counter1()); // 2
console.log(counter2()); // 1 (separate instance)

// Practical example: user session tracker
const createSessionTracker = function() {
  let sessionCount = 0;
  let lastAccess = null;
  
  return {
    increment: function() {
      sessionCount++;
      lastAccess = new Date();
    },
    getCount: function() {
      return sessionCount;
    },
    getLastAccess: function() {
      return lastAccess;
    }
  };
};
```
