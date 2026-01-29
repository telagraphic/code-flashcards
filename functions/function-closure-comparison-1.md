How do closures differ across function types?
?

```javascript
// All function types create closures, but with subtle differences

// 1. Function Declaration - standard closure
function createCounter1() {
  let count = 0;
  function increment() {
    count++; // Closure over count
    return count;
  }
  return increment;
}

// 2. Function Expression - same closure behavior
function createCounter2() {
  let count = 0;
  const increment = function() {
    count++; // Same closure behavior
    return count;
  };
  return increment;
}

// 3. Arrow Function - closure + lexical 'this'
function createCounter3() {
  let count = 0;
  const increment = () => {
    count++; // Closure works the same
    return count;
  };
  return increment;
}

// Key difference: 'this' binding
const obj = {
  value: 10,
  
  // Function declaration/expression - dynamic 'this'
  regularMethod: function() {
    return function() {
      return this.value; // 'this' is lost
    };
  },
  
  // Arrow function - lexical 'this'
  arrowMethod: function() {
    return () => {
      return this.value; // 'this' preserved from arrowMethod
    };
  }
};

const regular = obj.regularMethod();
const arrow = obj.arrowMethod();
console.log(regular()); // undefined (lost 'this')
console.log(arrow()); // 10 (preserved 'this')

// IIFE - creates closure immediately
const module = (function() {
  let private = 'secret';
  
  // All function types inside IIFE create closures
  function getPrivate() {
    return private;
  }
  
  const setPrivate = function(value) {
    private = value;
  };
  
  const resetPrivate = () => {
    private = 'secret';
  };
  
  return { getPrivate, setPrivate, resetPrivate };
})();

// All closures work the same - main difference is 'this' binding
```
