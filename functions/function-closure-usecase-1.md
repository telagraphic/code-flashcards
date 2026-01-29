What are common use cases for closures?
?

```javascript
// Use case 1: Data privacy / Encapsulation
function createBankAccount(initialBalance) {
  let balance = initialBalance; // Private
  
  return {
    deposit: (amount) => {
      balance += amount;
      return balance;
    },
    withdraw: (amount) => {
      if (amount <= balance) {
        balance -= amount;
        return balance;
      }
      return 'Insufficient funds';
    },
    getBalance: () => balance
  };
}

const account = createBankAccount(100);
account.deposit(50); // 150
// balance is not directly accessible

// Use case 2: Function factories / Partial application
function createMultiplier(multiplier) {
  return function(number) {
    return number * multiplier;
  };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);
console.log(double(5)); // 10
console.log(triple(5)); // 15

// Use case 3: Memoization / Caching
function createMemoizedFunction(fn) {
  const cache = {}; // Private cache
  
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache[key]) {
      return cache[key];
    }
    const result = fn(...args);
    cache[key] = result;
    return result;
  };
}

const expensiveFunction = (n) => n * n;
const memoized = createMemoizedFunction(expensiveFunction);
memoized(5); // Calculates and caches
memoized(5); // Returns from cache

// Use case 4: Event handlers with state
function createButtonHandler(buttonId) {
  let clickCount = 0;
  
  return function(event) {
    clickCount++;
    console.log(`Button ${buttonId} clicked ${clickCount} times`);
  };
}

document.getElementById('btn').addEventListener(
  'click',
  createButtonHandler('submit')
);
```
