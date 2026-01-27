How do you use Object.entries() for object transformation and filtering?
?

```javascript
// Object.entries() for transformation

// Practical: Transform object values
function transformObject(obj, transformer) {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [
      key,
      transformer(value, key)
    ])
  );
}

const user = { name: 'Alice', age: 30 };
const transformed = transformObject(user, (value, key) => {
  if (key === 'name') return value.toUpperCase();
  if (key === 'age') return value + 1;
  return value;
});
// { name: 'ALICE', age: 31 }

// Practical: Filter object by value type
function filterByType(obj, type) {
  return Object.fromEntries(
    Object.entries(obj).filter(([key, value]) => typeof value === type)
  );
}

const data = { name: 'Alice', age: 30, active: true, email: 'alice@example.com' };
const strings = filterByType(data, 'string');
// { name: 'Alice', email: 'alice@example.com' }

// Practical: Remove null/undefined values
function removeNullish(obj) {
  return Object.fromEntries(
    Object.entries(obj).filter(([key, value]) => 
      value !== null && value !== undefined
    )
  );
}

const userData = { name: 'Alice', age: null, email: 'alice@example.com' };
const cleaned = removeNullish(userData);
// { name: 'Alice', email: 'alice@example.com' }

// Practical: Convert object to query string
function objectToQueryString(obj) {
  return Object.entries(obj)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
}

const params = { name: 'Alice', age: 30, city: 'New York' };
const queryString = objectToQueryString(params);
// 'name=Alice&age=30&city=New%20York'

// Practical: Deep clone with entries
function shallowClone(obj) {
  return Object.fromEntries(Object.entries(obj));
}
```
