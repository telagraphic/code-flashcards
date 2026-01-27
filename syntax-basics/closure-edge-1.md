What are common closure pitfalls and how do you avoid them?
?

```javascript
// Pitfall 1: Closure over loop variable (var)
var functions = [];
for (var i = 0; i < 3; i++) {
  functions.push(function() {
    return i; // All return 3 (same i)
  });
}

console.log(functions[0]()); // 3
console.log(functions[1]()); // 3
console.log(functions[2]()); // 3

// Fix: Use let or IIFE
var functions2 = [];
for (let i = 0; i < 3; i++) {
  functions2.push(function() {
    return i; // Each returns correct value
  });
}

// Pitfall 2: Closure capturing object reference
function createHandlers() {
  const handlers = [];
  const obj = { value: 0 };
  
  for (let i = 0; i < 3; i++) {
    handlers.push(function() {
      return obj.value; // All reference same obj
    });
  }
  
  obj.value = 10; // Changes affect all closures
  return handlers;
}

const handlers = createHandlers();
console.log(handlers[0]()); // 10 (not 0!)

// Fix: Capture primitive value
function createHandlersFixed() {
  const handlers = [];
  
  for (let i = 0; i < 3; i++) {
    const value = i; // Capture primitive
    handlers.push(function() {
      return value; // Each has own value
    });
  }
  
  return handlers;
}

// Pitfall 3: Memory leaks with DOM references
function attachHandler() {
  const element = document.getElementById('large-element');
  const data = new Array(1000000).fill(0); // Large data
  
  element.addEventListener('click', function() {
    console.log(data.length); // Closure keeps data in memory
  });
  
  // Even if element removed, closure keeps reference
}

// Fix: Remove listeners and null references
function attachHandlerFixed() {
  const element = document.getElementById('large-element');
  const data = new Array(1000000).fill(0);
  
  function handler() {
    console.log(data.length);
  }
  
  element.addEventListener('click', handler);
  
  // Clean up when done
  return function cleanup() {
    element.removeEventListener('click', handler);
    // data = null; // Help GC
  };
}
```
