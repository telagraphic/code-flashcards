What is Object.entries() and how does it work?
?

```javascript
// Object.entries(): Returns array of [key, value] pairs from object
// Returns enumerable own properties

// Basic usage
const user = {
  name: 'Alice',
  age: 30,
  email: 'alice@example.com'
};

const entries = Object.entries(user);
console.log(entries);
// [['name', 'Alice'], ['age', 30], ['email', 'alice@example.com']]

// Practical: Iterate over object properties
for (const [key, value] of Object.entries(user)) {
  console.log(`${key}: ${value}`);
}

// Practical: Convert object to array for array methods
const doubled = Object.entries(user).map(([key, value]) => {
  if (typeof value === 'number') {
    return [key, value * 2];
  }
  return [key, value];
});
console.log(Object.fromEntries(doubled));

// Practical: Filter object properties
const filtered = Object.entries(user)
  .filter(([key, value]) => typeof value === 'string')
  .reduce((obj, [key, value]) => {
    obj[key] = value;
    return obj;
  }, {});

// Practical: Sort object properties
const sorted = Object.entries(user)
  .sort(([a], [b]) => a.localeCompare(b))
  .reduce((obj, [key, value]) => {
    obj[key] = value;
    return obj;
  }, {});

// Object.entries() only returns own enumerable properties
// Does not include inherited properties
```
