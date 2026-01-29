What is a function declaration and when should you use it?
?

```javascript
// Function declaration - hoisted, named, reusable
function calculateTotal(price, tax) {
  return price + (price * tax);
}

// Use cases:
// 1. Reusable utility functions
function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
}

// 2. Functions you want to call before definition (hoisting)
displayWelcome(); // Works even though defined below

function displayWelcome() {
  console.log('Welcome!');
}

// 3. Named functions for better stack traces
function processUserData(user) {
  return validateUser(user) && saveUser(user);
}

// 4. Recursive functions
function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}
```
