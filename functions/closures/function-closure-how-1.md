What are ways a closure can be created in a function?
?

```javascript
// 1. Return a function (classic)
function createCounter() {
  let count = 0;
  return function() {
    count++;
    return count;
  };
}

// 2. Pass a function as a callback (closure over outer vars)
function runLater(fn) {
  setTimeout(fn, 1000);
}

let message = 'Hello';
runLater(function() {
  console.log(message);  // closure over message
});

// 3. Assign to a variable or property
function setup() {
  let id = 1;
  const nextId = function() {
    return id++;
  };
  window.getNextId = nextId;  // closure over id
}

// 4. Store in a data structure
const handlers = [];
function registerHandler() {
  let clicks = 0;
  handlers.push(function() {
    clicks++;
    return clicks;
  });
}
```
