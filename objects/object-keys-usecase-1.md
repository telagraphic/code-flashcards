How do you use Object.keys() for validation and property checking?
?

```javascript
// Object.keys() for validation

// Practical: Validate required fields
function validateRequired(obj, requiredFields) {
  const missing = [];
  const objKeys = Object.keys(obj);
  
  for (const field of requiredFields) {
    if (!objKeys.includes(field)) {
      missing.push(field);
    }
  }
  
  return {
    valid: missing.length === 0,
    missing
  };
}

const user = { name: 'Alice', age: 30 };
const result = validateRequired(user, ['name', 'email']);
// { valid: false, missing: ['email'] }

// Practical: Check for unexpected fields
function validateSchema(obj, allowedFields) {
  const objKeys = Object.keys(obj);
  const unexpected = objKeys.filter(key => !allowedFields.includes(key));
  
  return {
    valid: unexpected.length === 0,
    unexpected
  };
}

const data = { name: 'Alice', age: 30, invalid: 'field' };
const result = validateSchema(data, ['name', 'age', 'email']);
// { valid: false, unexpected: ['invalid'] }

// Practical: Compare object structures
function haveSameKeys(obj1, obj2) {
  const keys1 = Object.keys(obj1).sort();
  const keys2 = Object.keys(obj2).sort();
  
  return keys1.length === keys2.length &&
         keys1.every((key, index) => key === keys2[index]);
}

const obj1 = { a: 1, b: 2 };
const obj2 = { b: 3, a: 4 };
console.log(haveSameKeys(obj1, obj2)); // true

// Practical: Get keys by value type
function getKeysByType(obj, type) {
  return Object.keys(obj).filter(key => typeof obj[key] === type);
}

const data = { name: 'Alice', age: 30, active: true, email: 'alice@example.com' };
const stringKeys = getKeysByType(data, 'string');
// ['name', 'email']

// Practical: Sort object by keys
function sortByKeys(obj) {
  const sorted = {};
  Object.keys(obj).sort().forEach(key => {
    sorted[key] = obj[key];
  });
  return sorted;
}

const unsorted = { z: 3, a: 1, m: 2 };
const sorted = sortByKeys(unsorted);
// { a: 1, m: 2, z: 3 }
```
