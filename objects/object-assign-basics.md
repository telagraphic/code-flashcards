What is Object.assign() and how does it work?
?

```javascript
// Object.assign(): Copies properties from source objects to target object
// Returns the target object (mutates target)

// Basic usage
const target = {};
const source = { a: 1, b: 2 };
Object.assign(target, source);
console.log(target); // { a: 1, b: 2 }

// Multiple sources (later sources override earlier)
const target = { a: 1 };
const source1 = { b: 2 };
const source2 = { c: 3, a: 10 };
Object.assign(target, source1, source2);
console.log(target); // { a: 10, b: 2, c: 3 }

// Practical: Clone object (shallow copy)
const original = { name: 'Alice', age: 30 };
const clone = Object.assign({}, original);
clone.age = 31;
console.log(original.age); // 30 (unchanged)
console.log(clone.age); // 31

// Practical: Merge objects
function mergeObjects(...objects) {
  return Object.assign({}, ...objects);
}

const obj1 = { a: 1 };
const obj2 = { b: 2 };
const obj3 = { c: 3 };
const merged = mergeObjects(obj1, obj2, obj3);
// { a: 1, b: 2, c: 3 }

// Practical: Default values
function createUser(userData) {
  return Object.assign({
    name: 'Guest',
    age: 0,
    role: 'user'
  }, userData);
}

const user = createUser({ name: 'Alice', age: 30 });
// { name: 'Alice', age: 30, role: 'user' }

// Important: Object.assign() does shallow copy
// Nested objects are copied by reference
const original = { nested: { value: 1 } };
const clone = Object.assign({}, original);
clone.nested.value = 2;
console.log(original.nested.value); // 2 (changed!)
```
