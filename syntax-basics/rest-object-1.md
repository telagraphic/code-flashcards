How do you use the rest operator (...) to collect remaining object properties?
?

```javascript
// Rest operator in object destructuring collects remaining properties

const user = {
  id: 1,
  name: 'Alice',
  email: 'alice@example.com',
  role: 'admin',
  createdAt: '2024-01-01'
};

// Extract some properties, collect rest
const { id, name, ...rest } = user;
console.log(id); // 1
console.log(name); // 'Alice'
console.log(rest); // { email: '...', role: '...', createdAt: '...' }

// Practical: Separate known from unknown properties
function processUser({ id, name, ...metadata }) {
  console.log(`Processing user ${id}: ${name}`);
  // metadata contains all other properties
  return { id, name, metadata };
}

// Practical: Remove properties
function omit(obj, ...keysToOmit) {
  const { [keysToOmit[0]]: omitted, ...rest } = obj;
  return keysToOmit.length > 1 
    ? omit(rest, ...keysToOmit.slice(1))
    : rest;
}

const user = { id: 1, name: 'Alice', email: 'alice@example.com' };
const withoutEmail = omit(user, 'email');
console.log(withoutEmail); // { id: 1, name: 'Alice' }

// Practical: Extract specific fields
function extractFields(obj, ...fields) {
  const result = {};
  fields.forEach(field => {
    if (obj[field] !== undefined) {
      result[field] = obj[field];
    }
  });
  return result;
}

const { id, name, ...otherData } = user;
const extracted = extractFields(user, 'id', 'name');
```
