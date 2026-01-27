How do you create a function expression assigned to a variable?
?

```javascript
// Function expression - assigned to variable
const greetUser = function(name) {
  return `Hello, ${name}!`;
};

// Usage
const message = greetUser('Alice');
console.log(message); // "Hello, Alice!"

// Practical example: conditional function assignment
const getUserRole = function(userId) {
  if (userId === 1) {
    return 'admin';
  } else if (userId === 2) {
    return 'moderator';
  } else {
    return 'user';
  }
};

const role = getUserRole(1);
document.getElementById('role').textContent = role;
```
