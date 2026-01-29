How do closures work with function declarations?
?

```javascript
// Function declarations create closures over outer scope variables

function createCounter() {
  let count = 0; // Private variable in outer scope
  
  // Function declaration - creates closure over count
  function increment() {
    count++; // Accesses count from outer scope
    return count;
  }
  
  function decrement() {
    count--; // Same closure, same count variable
    return count;
  }
  
  function getCount() {
    return count; // All functions share same closure
  }
  
  return { increment, decrement, getCount };
}

const counter1 = createCounter();
const counter2 = createCounter();

console.log(counter1.increment()); // 1
console.log(counter1.increment()); // 2
console.log(counter2.increment()); // 1 (separate closure)
console.log(counter1.getCount()); // 2

// Practical: Module pattern with function declarations
function createUserModule() {
  let users = []; // Private data
  
  function addUser(name) {
    users.push({ name, id: users.length + 1 });
  }
  
  function getUsers() {
    return [...users]; // Return copy
  }
  
  function getUserCount() {
    return users.length;
  }
  
  return { addUser, getUsers, getUserCount };
}

const userModule = createUserModule();
userModule.addUser('Alice');
console.log(userModule.getUserCount()); // 1
```
