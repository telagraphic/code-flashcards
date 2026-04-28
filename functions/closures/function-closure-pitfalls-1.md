What are common closure pitfalls and how to avoid them?
?

```javascript
// Pitfall 1: Loop variable closure (var)
var functions = [];
for (var i = 0; i < 3; i++) {
  functions.push(function() {
    return i; // All closures share same i (3)
  });
}
console.log(functions[0]()); // 3 (not 0!)

// Fix 1: Use let (block-scoped)
const functions2 = [];
for (let i = 0; i < 3; i++) {
  functions2.push(function() {
    return i; // Each closure has own i
  });
}

// Fix 2: IIFE to create new scope
const functions3 = [];
for (var i = 0; i < 3; i++) {
  (function(j) {
    functions3.push(function() {
      return j; // Closure over j, not i
    });
  })(i);
}

// Pitfall 2: Closure over object reference
function createHandlers() {
  const handlers = [];
  const obj = { value: 0 };
  
  for (let i = 0; i < 3; i++) {
    handlers.push(function() {
      return obj.value; // All reference same obj
    });
  }
  
  obj.value = 10; // Affects all closures!
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
  const element = document.getElementById('large');
  const data = new Array(1000000).fill(0);
  
  element.addEventListener('click', function() {
    console.log(data.length); // Closure keeps data in memory
  });
  // Even if element removed, closure keeps reference
}


attachHandler();
// Now what?
// - attachHandler() has finished
// - But the anonymous function is still attached to the element
// - That function closes over 'data'
// - So 'data' (4MB) cannot be garbage collected
// - Even if you later do: element.remove()
//   The listener still exists, still references 'data'


// Fix: Remove listeners and null references
function attachHandlerFixed() {
  const element = document.getElementById('large');
  const data = new Array(1000000).fill(0);
  
  const handler = function() {  // Named reference!
    console.log(data.length);
  };
  
  element.addEventListener('click', handler);
  
  // Return a cleanup function
  return () => {
    element.removeEventListener('click', handler);  // Can remove it!
    // Now: nothing references 'handler'
    // So 'handler' can be garbage collected
    // So 'data' (which handler closed over) can also be garbage collected
  };
}

const cleanup = attachHandlerFixed();

// Later, when you're done with the element:
cleanup();
// Now 'data' (4MB) is freed
```

// Closure chain that blocks garbage collection:

element.addEventListener ──references──> handler ──closes over──> data

// After cleanup():

element.addEventListener ──(removed)──> handler ──closes over──> data
                                            ↑
                                      (nothing references it now)
                                            ↓
                                   GARBAGE COLLECTED (along with data)
