How do you use Object.fromEntries() with filtering and mapping?
?

```javascript
// Object.fromEntries() with filtering and mapping

// Practical: Filter and transform object
function filterAndTransform(obj, filterFn, transformFn) {
  return Object.fromEntries(
    Object.entries(obj)
      .filter(([key, value]) => filterFn(key, value))
      .map(([key, value]) => [key, transformFn(value, key)])
  );
}

const data = { name: 'Alice', age: 30, email: 'alice@example.com', active: true };
const result = filterAndTransform(
  data,
  (key, value) => typeof value === 'string',
  (value) => value.toUpperCase()
);
// { name: 'ALICE', email: 'ALICE@EXAMPLE.COM' }

// Practical: Map object values
function mapValues(obj, mapper) {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [key, mapper(value, key)])
  );
}

const prices = { laptop: 999, mouse: 25, keyboard: 75 };
const discounted = mapValues(prices, price => price * 0.9);
// { laptop: 899.1, mouse: 22.5, keyboard: 67.5 }

// Practical: Combine multiple arrays into object
function zipToObject(keys, values) {
  return Object.fromEntries(
    keys.map((key, index) => [key, values[index]])
  );
}

const keys = ['name', 'age', 'email'];
const values = ['Alice', 30, 'alice@example.com'];
const user = zipToObject(keys, values);
// { name: 'Alice', age: 30, email: 'alice@example.com' }

// Practical: Convert FormData to nested object
function formDataToNestedObject(formData) {
  const obj = {};
  
  for (const [key, value] of formData) {
    const keys = key.split('.');
    let current = obj;
    
    for (let i = 0; i < keys.length - 1; i++) {
      const k = keys[i];
      if (!(k in current)) {
        current[k] = {};
      }
      current = current[k];
    }
    
    current[keys[keys.length - 1]] = value;
  }
  
  return obj;
}

// Usage
const formData = new FormData();
formData.append('user.name', 'Alice');
formData.append('user.age', '30');
formData.append('settings.theme', 'dark');
const nested = formDataToNestedObject(formData);
// { user: { name: 'Alice', age: '30' }, settings: { theme: 'dark' } }

// Practical: Merge arrays into object with custom key
function arrayToObject(array, keyFn, valueFn = item => item) {
  return Object.fromEntries(
    array.map(item => [keyFn(item), valueFn(item)])
  );
}

const users = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' }
];

const userMap = arrayToObject(
  users,
  user => user.id,
  user => ({ name: user.name, email: user.email })
);
// { 1: { name: 'Alice', email: '...' }, 2: { name: 'Bob', email: '...' } }
```
