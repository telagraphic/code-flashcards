What is a function expression and when should you use it?
?

```javascript
// Function expression - assigned to variable, not hoisted
const greet = function(name) {
  return `Hello, ${name}!`;
};

// Use cases:
// 1. Conditional function assignment
let getUserRole;
if (userType === 'admin') {
  getUserRole = function() {
    return 'Administrator';
  };
} else {
  getUserRole = function() {
    return 'User';
  };
}

// 2. Functions passed as arguments
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(function(n) {
  return n * 2;
});

// 3. Functions assigned to object properties
const calculator = {
  add: function(a, b) {
    return a + b;
  },
  multiply: function(a, b) {
    return a * b;
  }
};

// 4. When you need to control when function is available
const processData = function(data) {
  // Function only available after this point
  return data.map(item => item.value);
};
```
