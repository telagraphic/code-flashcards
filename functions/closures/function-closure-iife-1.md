How do closures work with IIFEs (Immediately Invoked Function Expressions)?
?

```javascript
// IIFE creates closure and executes immediately, creating private scope

// Module pattern with IIFE
const CounterModule = (function() {
  let count = 0; // Private variable
  
  // Functions have closure over count
  function increment() {
    count++;
    return count;
  }
  
  function decrement() {
    count--;
    return count;
  }
  
  function getCount() {
    return count;
  }
  
  // Return public API
  return { increment, decrement, getCount };
})(); // Immediately invoked

console.log(CounterModule.increment()); // 1
console.log(CounterModule.getCount()); // 1
// count is not accessible outside

// IIFE with parameters (dependency injection)
const UserService = (function(database, logger) {
  let users = []; // Private
  
  function addUser(name) {
    users.push({ name, id: users.length + 1 });
    logger.log(`User added: ${name}`);
  }
  
  function getUsers() {
    return database.query('SELECT * FROM users');
  }
  
  return { addUser, getUsers };
})(mockDatabase, console); // Inject dependencies

// Practical: Avoiding global namespace pollution
(function() {
  const privateConfig = { apiKey: 'secret' };
  const privateHelper = () => { /* ... */ };
  
  // Only expose what's needed
  window.PublicAPI = {
    init: function() {
      // Can access privateConfig and privateHelper
      privateHelper();
    }
  };
})();
```
