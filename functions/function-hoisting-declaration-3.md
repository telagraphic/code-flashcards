How do function declarations behave with duplicate names?
?

```javascript
// When multiple function declarations have the same name,
// the last one wins (overwrites previous ones)

function processData(data) {
  return data.toUpperCase();
}

// Later in the code...
function processData(data) {
  return data.toLowerCase(); // This overwrites the first one
}

console.log(processData('Hello')); // "hello" - uses the last definition

// Practical example: conditional function definition
// All declarations are hoisted, so the last one takes precedence
function getConfig() {
  return { mode: 'development' };
}

// In production build, this might replace the above
function getConfig() {
  return { mode: 'production' };
}

// Be careful: this can lead to unexpected behavior
function log(message) {
  console.log('Log:', message);
}

function log(message) {
  console.error('Error:', message); // Overwrites previous log
}

log('test'); // "Error: test" - not what you might expect!
```
