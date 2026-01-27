How do you use closures for data privacy and encapsulation?
?

```javascript
// Closure for private variables and methods
function createBankAccount(initialBalance) {
  let balance = initialBalance; // Private variable
  
  return {
    // Public methods that access private balance
    deposit: function(amount) {
      balance += amount;
      return balance;
    },
    
    withdraw: function(amount) {
      if (amount <= balance) {
        balance -= amount;
        return balance;
      }
      throw new Error('Insufficient funds');
    },
    
    getBalance: function() {
      return balance;
    }
  };
}

const account = createBankAccount(100);
console.log(account.getBalance()); // 100
account.deposit(50);
console.log(account.getBalance()); // 150
// console.log(account.balance); // undefined (private)

// Practical: Module pattern
const UserModule = (function() {
  let users = []; // Private
  
  return {
    addUser: function(user) {
      users.push(user);
    },
    
    getUserCount: function() {
      return users.length;
    },
    
    getUsers: function() {
      return [...users]; // Return copy
    }
  };
})();

UserModule.addUser({ name: 'Alice' });
console.log(UserModule.getUserCount()); // 1
// console.log(UserModule.users); // undefined (private)
```
