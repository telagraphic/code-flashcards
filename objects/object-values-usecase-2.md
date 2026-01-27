How do you use Object.values() for nested objects and collections?
?

```javascript
// Object.values() for nested structures

// Practical: Flatten nested object values
function flattenValues(obj) {
  const result = [];
  
  for (const value of Object.values(obj)) {
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      result.push(...flattenValues(value));
    } else {
      result.push(value);
    }
  }
  
  return result;
}

const nested = {
  user: { name: 'Alice', age: 30 },
  settings: { theme: 'dark', notifications: true }
};

console.log(flattenValues(nested));
// ['Alice', 30, 'dark', true]

// Practical: Extract values from nested objects
function extractNestedValues(obj, key) {
  const result = [];
  
  for (const value of Object.values(obj)) {
    if (typeof value === 'object' && value !== null) {
      if (key in value) {
        result.push(value[key]);
      }
      // Recursively search nested objects
      result.push(...extractNestedValues(value, key));
    }
  }
  
  return result;
}

const data = {
  users: [
    { name: 'Alice', role: 'admin' },
    { name: 'Bob', role: 'user' }
  ],
  settings: { admin: { name: 'System' } }
};

console.log(extractNestedValues(data, 'name'));
// ['Alice', 'Bob', 'System']

// Practical: Sum nested numeric values
function sumNestedNumbers(obj) {
  let sum = 0;
  
  for (const value of Object.values(obj)) {
    if (typeof value === 'number') {
      sum += value;
    } else if (typeof value === 'object' && value !== null) {
      sum += sumNestedNumbers(value);
    }
  }
  
  return sum;
}

const data = {
  sales: { q1: 1000, q2: 1500 },
  expenses: { q1: 500, q2: 600 }
};

console.log(sumNestedNumbers(data)); // 3600

// Practical: Collect all values of specific type recursively
function collectValuesByType(obj, type) {
  const result = [];
  
  for (const value of Object.values(obj)) {
    if (typeof value === type) {
      result.push(value);
    } else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      result.push(...collectValuesByType(value, type));
    }
  }
  
  return result;
}

const data = {
  user: { name: 'Alice', email: 'alice@example.com' },
  metadata: { description: 'User account' }
};

const strings = collectValuesByType(data, 'string');
// ['Alice', 'alice@example.com', 'User account']

// Practical: Find value in nested structure
function findValue(obj, predicate) {
  for (const value of Object.values(obj)) {
    if (predicate(value)) {
      return value;
    }
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      const found = findValue(value, predicate);
      if (found !== undefined) {
        return found;
      }
    }
  }
  return undefined;
}

const data = {
  users: { alice: { id: 1 }, bob: { id: 2 } },
  admin: { id: 999 }
};

const admin = findValue(data, value => value.id === 999);
// { id: 999 }
```
