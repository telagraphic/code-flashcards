What is a for...in loop and how does it work?
?

```javascript
// for...in loop: Iterates over enumerable properties of objects
// Returns keys (property names), not values

// Basic for...in loop
const obj = {
  name: 'Alice',
  age: 30,
  email: 'alice@example.com'
};

for (const key in obj) {
  console.log(`${key}: ${obj[key]}`);
}
// name: Alice
// age: 30
// email: alice@example.com

// Practical: Object property iteration
const user = {
  id: 1,
  name: 'Bob',
  role: 'admin',
  active: true
};

for (const property in user) {
  console.log(`${property} = ${user[property]}`);
}

// Practical: Check object properties
function hasRequiredFields(obj, requiredFields) {
  for (const field of requiredFields) {
    if (!(field in obj)) {
      return false;
    }
  }
  return true;
}

// Practical: Copy object properties
function copyProperties(source, target) {
  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      target[key] = source[key];
    }
  }
  return target;
}

// Important: for...in iterates over enumerable properties
// Includes inherited properties unless filtered

// Practical: Filter own properties only
for (const key in obj) {
  if (obj.hasOwnProperty(key)) {
    // Only own properties
    console.log(key);
  }
}

// Note: for...in works with arrays but returns indices (as strings)
const arr = ['a', 'b', 'c'];
for (const index in arr) {
  console.log(index); // '0', '1', '2' (strings!)
  console.log(typeof index); // 'string'
}
```
