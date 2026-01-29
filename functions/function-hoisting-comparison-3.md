What are common hoisting pitfalls and how to avoid them?
?

```javascript
// Pitfall 1: Assuming function expressions are hoisted
function example1() {
  // processData(); // TypeError: processData is not a function
  
  var processData = function() {
    return 'processed';
  };
  
  processData(); // Works here
}

// Pitfall 2: Using arrow functions before definition
function example2() {
  // const result = calculate(5); // ReferenceError
  
  const calculate = (x) => x * 2;
  
  const result = calculate(5); // Works here
}

// Pitfall 3: Function declaration overwriting
function example3() {
  function log(message) {
    console.log('First:', message);
  }
  
  function log(message) {
    console.log('Second:', message); // Overwrites first
  }
  
  log('test'); // "Second: test" - unexpected!
}

// Best practices:
// 1. Define functions before use (especially expressions/arrows)
// 2. Use function declarations when you need hoisting
// 3. Be aware of duplicate function declarations
// 4. Use const/let instead of var for function expressions

// Good pattern:
const processUser = function(user) {
  return user.name.toUpperCase();
};

const users = [{ name: 'alice' }];
const processed = users.map(processUser);
```
