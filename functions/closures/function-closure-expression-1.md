How do closures work with function expressions?
?

```javascript
// Function expressions create closures just like declarations

function createCalculator() {
  let history = []; // Private variable
  
  // Function expression - creates closure
  const add = function(a, b) {
    const result = a + b;
    history.push({ operation: 'add', result });
    return result;
  };
  
  const subtract = function(a, b) {
    const result = a - b;
    history.push({ operation: 'subtract', result });
    return result;
  };
  
  const getHistory = function() {
    return [...history]; // Closure accesses history
  };
  
  return { add, subtract, getHistory };
}

const calc = createCalculator();
calc.add(5, 3); // 8
calc.subtract(10, 4); // 6
console.log(calc.getHistory()); // Array of operations

// Practical: Event handler factory with closures
function createEventHandler(elementId) {
  let clickCount = 0; // Private state
  
  const handler = function(event) {
    clickCount++; // Closure over clickCount
    console.log(`Element ${elementId} clicked ${clickCount} times`);
  };
  
  return handler;
}

const buttonHandler = createEventHandler('submit-btn');
document.getElementById('submit-btn').addEventListener('click', buttonHandler);
```
