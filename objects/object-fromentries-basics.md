What is Object.fromEntries() and how does it work?
?

```javascript
// Object.fromEntries(): Creates object from array of [key, value] pairs
// Inverse of Object.entries()

// Basic usage
const entries = [
  ['name', 'Alice'],
  ['age', 30],
  ['email', 'alice@example.com']
];

const obj = Object.fromEntries(entries);
console.log(obj);
// { name: 'Alice', age: 30, email: 'alice@example.com' }

// Practical: Convert Map to object
const map = new Map([
  ['key1', 'value1'],
  ['key2', 'value2']
]);
const objFromMap = Object.fromEntries(map);
console.log(objFromMap); // { key1: 'value1', key2: 'value2' }

// Practical: Convert array of pairs to object
const pairs = [['a', 1], ['b', 2], ['c', 3]];
const objFromPairs = Object.fromEntries(pairs);
console.log(objFromPairs); // { a: 1, b: 2, c: 3 }

// Practical: Transform array to object with key mapping
const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' }
];

const userMap = Object.fromEntries(
  users.map(user => [user.id, user])
);
console.log(userMap);
// { 1: { id: 1, name: 'Alice' }, 2: { id: 2, name: 'Bob' } }

// Practical: Query string to object
function queryStringToObject(queryString) {
  const params = new URLSearchParams(queryString);
  return Object.fromEntries(params);
}

const obj = queryStringToObject('name=Alice&age=30');
console.log(obj); // { name: 'Alice', age: '30' }

// Object.fromEntries() is the inverse of Object.entries()
const original = { a: 1, b: 2 };
const entries = Object.entries(original);
const reconstructed = Object.fromEntries(entries);
console.log(original); // { a: 1, b: 2 }
console.log(reconstructed); // { a: 1, b: 2 }
```
