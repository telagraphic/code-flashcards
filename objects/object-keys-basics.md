What is Object.keys() and how does it work?
?

```javascript
// Object.keys(): Returns array of object's own enumerable property names
// Returns keys as strings

// Basic usage
const user = {
  name: 'Alice',
  age: 30,
  email: 'alice@example.com'
};

const keys = Object.keys(user);
console.log(keys); // ['name', 'age', 'email']

// Practical: Iterate over object keys
Object.keys(user).forEach(key => {
  console.log(`${key}: ${user[key]}`);
});

// Practical: Check if object has properties
function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

console.log(isEmpty({})); // true
console.log(isEmpty({ a: 1 })); // false

// Practical: Get count of properties
function getPropertyCount(obj) {
  return Object.keys(obj).length;
}

// Practical: Check if object has specific keys
function hasAllKeys(obj, requiredKeys) {
  const objKeys = Object.keys(obj);
  return requiredKeys.every(key => objKeys.includes(key));
}

const user = { name: 'Alice', age: 30 };
console.log(hasAllKeys(user, ['name', 'age'])); // true
console.log(hasAllKeys(user, ['name', 'email'])); // false

// Practical: Get keys matching pattern
function getKeysMatching(obj, pattern) {
  return Object.keys(obj).filter(key => pattern.test(key));
}

const data = { userName: 'Alice', userAge: 30, userEmail: 'alice@example.com' };
const userKeys = getKeysMatching(data, /^user/);
console.log(userKeys); // ['userName', 'userAge', 'userEmail']

// Object.keys() only returns own enumerable properties
// Does not include inherited properties or non-enumerable properties
```
