What is Object.values() and how does it work?
?

```javascript
// Object.values(): Returns array of object's own enumerable property values
// Returns values in same order as Object.keys()

// Basic usage
const user = {
  name: 'Alice',
  age: 30,
  email: 'alice@example.com'
};

const values = Object.values(user);
console.log(values); // ['Alice', 30, 'alice@example.com']

// Practical: Iterate over object values
Object.values(user).forEach(value => {
  console.log(value);
});

// Practical: Check if object contains value
function hasValue(obj, targetValue) {
  return Object.values(obj).includes(targetValue);
}

const user = { name: 'Alice', age: 30 };
console.log(hasValue(user, 'Alice')); // true
console.log(hasValue(user, 'Bob')); // false

// Practical: Get all values of specific type
function getValuesByType(obj, type) {
  return Object.values(obj).filter(value => typeof value === type);
}

const data = { name: 'Alice', age: 30, active: true, email: 'alice@example.com' };
const strings = getValuesByType(data, 'string');
console.log(strings); // ['Alice', 'alice@example.com']

// Practical: Sum numeric values
function sumNumericValues(obj) {
  return Object.values(obj)
    .filter(value => typeof value === 'number')
    .reduce((sum, value) => sum + value, 0);
}

const data = { a: 10, b: 20, c: 'text', d: 30 };
console.log(sumNumericValues(data)); // 60

// Practical: Find unique values
function getUniqueValues(obj) {
  return [...new Set(Object.values(obj))];
}

const data = { a: 1, b: 2, c: 1, d: 3 };
console.log(getUniqueValues(data)); // [1, 2, 3]

// Object.values() only returns own enumerable property values
// Does not include inherited properties
```
