How does hoisting work with function declarations?
?

```javascript
// Function declarations are hoisted - can be called before definition
console.log(greet('Alice')); // "Hello, Alice!" - works!

function greet(name) {
  return `Hello, ${name}!`;
}

// The function is "hoisted" to the top of its scope
// JavaScript processes declarations before executing code

// Practical example: organizing code by importance
function initializeApp() {
  setupEventListeners();
  loadUserData();
  renderUI();
}

// These can be defined later in the file
function setupEventListeners() {
  document.addEventListener('click', handleClick);
}

function loadUserData() {
  // Load data logic
}

function renderUI() {
  // Render logic
}

// Call at the end - all functions are already hoisted
initializeApp();
```
