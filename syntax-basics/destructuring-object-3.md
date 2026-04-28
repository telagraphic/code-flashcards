How do you destructure objects with rest operator and computed properties?
?

```javascript
// Rest operator in destructuring
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

// Practical: Separate required from optional
function createUser({ name, email, ...optional }) {
  const user = {
    name,
    email,
    ...optional, // Spread optional properties
    createdAt: Date.now()
  };
  return user;
}

// Computed property names in destructuring
const key = 'name';
const { [key]: userName } = { name: 'Alice' };
console.log(userName); // 'Alice'

// Practical: Extract dynamic properties
function extractFields(obj, ...fields) {
  const result = {};
  fields.forEach(field => {
    if (obj[field] !== undefined) {
      result[field] = obj[field];
    }
  });
  return result;
}

// Use an HOF instead
function extract(...fields) {
  return function(object) {
    const result = {};

    fields.forEach(field => {
      if (object[field]) !== undefined {
        result[field] = object[field];
      }
    })

    return result;
  } 
}



const extractObjectFields = extract('id', 'name', 'email');
const fieldsFromObject = extractObejctFields(user);


const user = { id: 1, name: 'Alice', email: 'alice@example.com' };
const { id, ...userInfo } = extractFields(user, 'id', 'name', 'email');
```
