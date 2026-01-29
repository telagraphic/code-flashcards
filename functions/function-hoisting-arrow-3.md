How do arrow functions compare to function declarations for hoisting?
?

```javascript
// Function declaration - hoisted, can call before definition
console.log(declaredFunc()); // "Works!" - hoisted

function declaredFunc() {
  return 'Works!';
}

// Arrow function - NOT hoisted, must define before use
// console.log(arrowFunc()); // ReferenceError

const arrowFunc = () => {
  return 'Does not work before definition';
};

console.log(arrowFunc()); // "Does not work before definition"

// Practical example: choosing the right type
// Use function declaration when you want hoisting
function setupApp() {
  // Can call helper functions defined later
  initializeDatabase();
  setupRoutes();
  startServer();
}

function initializeDatabase() { /* ... */ }
function setupRoutes() { /* ... */ }
function startServer() { /* ... */ }

// Use arrow function when order matters or for callbacks
const handleClick = () => {
  console.log('Button clicked');
};

document.addEventListener('click', handleClick);
```
