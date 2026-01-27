How do you use a for loop when a condition is met?
?

```javascript
// for loop with condition check - break when condition met

// Practical: Find first matching item
const users = [
  { id: 1, name: 'Alice', role: 'user' },
  { id: 2, name: 'Bob', role: 'admin' },
  { id: 3, name: 'Charlie', role: 'user' }
];

let adminUser = null;
for (let i = 0; i < users.length; i++) {
  if (users[i].role === 'admin') {
    adminUser = users[i];
    break; // Exit when condition met
  }
}
console.log(adminUser); // { id: 2, name: 'Bob', role: 'admin' }

// Practical: Validate form fields - stop at first error
function validateForm(fields) {
  const errors = [];
  for (let i = 0; i < fields.length; i++) {
    if (!fields[i].value || fields[i].value.trim() === '') {
      errors.push({ field: fields[i].name, message: 'Required field' });
      break; // Stop validation on first error
    }
  }
  return errors;
}

// Practical: Search in array - exit early when found
function findUserById(users, targetId) {
  for (let i = 0; i < users.length; i++) {
    if (users[i].id === targetId) {
      return users[i]; // Return immediately when found
    }
  }
  return null; // Not found
}

// Practical: Check if all items meet condition
function allItemsValid(items) {
  for (let i = 0; i < items.length; i++) {
    if (!items[i].isValid) {
      return false; // Exit early if any invalid
    }
  }
  return true; // All valid
}

// Practical: Process until threshold reached
const transactions = [10, 20, 30, 40, 50];
let total = 0;
let count = 0;
for (let i = 0; i < transactions.length; i++) {
  total += transactions[i];
  count++;
  if (total >= 100) {
    break; // Stop when threshold reached
  }
}
console.log(`Processed ${count} transactions, total: ${total}`);
```
