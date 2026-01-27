Why are callbacks useful in JavaScript programming?
?

```javascript
// Callbacks enable:
// 1. Asynchronous programming
// 2. Event-driven programming
// 3. Code reusability and customization

// Example: Customizable data processing
function processData(data, transformCallback) {
  const processed = transformCallback(data);
  return processed;
}

// Different callbacks for different transformations
const double = processData([1, 2, 3], function(arr) {
  return arr.map(n => n * 2);
});

const uppercase = processData(['hello', 'world'], function(arr) {
  return arr.map(str => str.toUpperCase());
});

console.log(double); // [2, 4, 6]
console.log(uppercase); // ['HELLO', 'WORLD']

// Same function, different behaviors via callbacks
```
