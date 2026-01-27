How do closures work with loops and event handlers?
?

```javascript
// Closure in loops - common gotcha
// Problem: All closures share same variable
for (var i = 0; i < 3; i++) {
  setTimeout(function() {
    console.log(i); // Prints 3, 3, 3 (all share same i)
  }, 100);
}

// Solution 1: Use let (block-scoped)
for (let i = 0; i < 3; i++) {
  setTimeout(function() {
    console.log(i); // Prints 0, 1, 2 (each iteration has own i)
  }, 100);
}

// Solution 2: IIFE to create new scope
for (var i = 0; i < 3; i++) {
  (function(j) {
    setTimeout(function() {
      console.log(j); // Prints 0, 1, 2
    }, 100);
  })(i);
}

// Practical: Event handlers with closures
function createButtonHandlers(buttons) {
  const handlers = [];
  
  for (let i = 0; i < buttons.length; i++) {
    handlers.push(function() {
      console.log(`Button ${i} clicked`);
      // Each handler has access to its own i
    });
  }
  
  return handlers;
}

const buttons = document.querySelectorAll('.btn');
const handlers = createButtonHandlers(buttons);
buttons.forEach((btn, i) => {
  btn.addEventListener('click', handlers[i]);
});
```
