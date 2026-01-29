How do you choose the right function type for your use case?
?

```javascript
// Decision tree for choosing function types:

// 1. Need hoisting? → Function Declaration
function setup() {
  initialize(); // Works - hoisted
}

function initialize() {
  // Setup code
}

// 2. Array methods / callbacks? → Arrow Function
const numbers = [1, 2, 3];
const doubled = numbers.map(n => n * 2);

// 3. Need lexical 'this'? → Arrow Function
class Component {
  setup() {
    button.onClick(() => {
      this.handleClick(); // 'this' preserved
    });
  }
}

// 4. Need to preserve 'this' but can't use arrow? → Bind
const handler = obj.method.bind(obj);
setTimeout(handler, 100);

// 5. One-time execution with private scope? → IIFE
(function() {
  const private = 'hidden';
  window.public = { /* API */ };
})();

// 6. Conditional assignment? → Function Expression
let processor;
if (condition) {
  processor = function() { /* ... */ };
}

// 7. Method on object? → Regular Function or Arrow
const obj = {
  // Regular if you need 'this'
  method: function() {
    return this.value;
  },
  // Arrow if you don't need 'this'
  utility: () => {
    return 'static';
  }
};

// 8. Constructor? → Regular Function (not arrow)
function User(name) {
  this.name = name;
}
```
