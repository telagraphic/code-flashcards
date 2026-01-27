How do you use the spread operator (...) with objects?
?

```javascript
// Spread operator expands object properties

// Copy object
const original = { name: 'Alice', age: 30 };
const copy = { ...original };
console.log(copy); // { name: 'Alice', age: 30 }

// Merge objects
const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3, d: 4 };
const merged = { ...obj1, ...obj2 };
console.log(merged); // { a: 1, b: 2, c: 3, d: 4 }

// Override properties
const base = { name: 'Alice', age: 30 };
const updated = { ...base, age: 31 };
console.log(updated); // { name: 'Alice', age: 31 }

// Practical: Default values with overrides
function createUser(userData) {
  return {
    name: 'Guest',
    age: 0,
    role: 'user',
    ...userData // Override with provided data
  };
}

const user = createUser({ name: 'Alice', age: 30 });
console.log(user); // { name: 'Alice', age: 30, role: 'user' }

// Practical: Immutable updates
function updateUser(user, updates) {
  return {
    ...user,
    ...updates
  };
}

const user1 = { name: 'Alice', age: 30 };
const user2 = updateUser(user1, { age: 31 });
console.log(user1); // { name: 'Alice', age: 30 } (unchanged)
console.log(user2); // { name: 'Alice', age: 31 }
```
