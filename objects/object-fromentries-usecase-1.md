How do you use Object.fromEntries() for data transformation?
?

```javascript
// Object.fromEntries() for data transformation

// Practical: Transform array to lookup object
const items = [
  { id: 1, name: 'Laptop', price: 999 },
  { id: 2, name: 'Mouse', price: 25 },
  { id: 3, name: 'Keyboard', price: 75 }
];

// Create lookup by ID
const itemsById = Object.fromEntries(
  items.map(item => [item.id, item])
);
console.log(itemsById[1]); // { id: 1, name: 'Laptop', ... }

// Create lookup by name
const itemsByName = Object.fromEntries(
  items.map(item => [item.name.toLowerCase(), item])
);
console.log(itemsByName['laptop']); // { id: 1, name: 'Laptop', ... }

// Practical: Group array items by property
function groupBy(array, keyFn) {
  const groups = new Map();
  
  for (const item of array) {
    const key = keyFn(item);
    if (!groups.has(key)) {
      groups.set(key, []);
    }
    groups.get(key).push(item);
  }
  
  return Object.fromEntries(groups);
}

const users = [
  { name: 'Alice', role: 'admin' },
  { name: 'Bob', role: 'user' },
  { name: 'Charlie', role: 'admin' }
];

const grouped = groupBy(users, user => user.role);
// { admin: [{ name: 'Alice', ... }, { name: 'Charlie', ... }],
//   user: [{ name: 'Bob', ... }] }

// Practical: Transform object keys
function transformKeys(obj, keyTransformer) {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [
      keyTransformer(key),
      value
    ])
  );
}

const data = { user_name: 'Alice', user_age: 30 };
const camelCase = transformKeys(data, key => {
  return key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
});
// { userName: 'Alice', userAge: 30 }

// Practical: Invert object (swap keys and values)
function invertObject(obj) {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [value, key])
  );
}

const mapping = { a: 1, b: 2, c: 3 };
const inverted = invertObject(mapping);
// { 1: 'a', 2: 'b', 3: 'c' }
```
