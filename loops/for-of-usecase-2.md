How do you use for...of with break and continue?
?

```javascript
// for...of with break and continue

// Practical: Find first matching item and exit
const users = [
  { id: 1, name: 'Alice', role: 'user' },
  { id: 2, name: 'Bob', role: 'admin' },
  { id: 3, name: 'Charlie', role: 'user' }
];

let adminUser = null;
for (const user of users) {
  if (user.role === 'admin') {
    adminUser = user;
    break; // Exit loop when found
  }
}

// Practical: Skip invalid items
const items = [1, -5, 3, -2, 4, -1];
const validItems = [];

for (const item of items) {
  if (item < 0) {
    continue; // Skip negative numbers
  }
  validItems.push(item);
}
console.log(validItems); // [1, 3, 4]

// Practical: Process until condition met
const transactions = [10, 20, 30, 40, 50];
let total = 0;
let processedCount = 0;

for (const amount of transactions) {
  total += amount;
  processedCount++;
  
  if (total >= 100) {
    break; // Stop when threshold reached
  }
}

console.log(`Processed ${processedCount} transactions`);

// Practical: Validate form fields - stop at first error
function validateFormFields(fields) {
  const errors = [];
  
  for (const field of fields) {
    if (!field.value || field.value.trim() === '') {
      errors.push({
        field: field.name,
        message: 'Required field'
      });
      break; // Stop validation on first error
    }
    
    if (field.type === 'email' && !field.value.includes('@')) {
      errors.push({
        field: field.name,
        message: 'Invalid email'
      });
      break;
    }
  }
  
  return errors;
}

// Practical: Process items with error handling
async function processItemsWithRetry(items) {
  const results = [];
  
  for (const item of items) {
    let retries = 3;
    let success = false;
    
    while (retries > 0 && !success) {
      try {
        const result = await processItem(item);
        results.push(result);
        success = true;
      } catch (error) {
        retries--;
        if (retries === 0) {
          console.error(`Failed to process ${item.id}`);
          break; // Exit retry loop, continue to next item
        }
      }
    }
  }
  
  return results;
}
```
