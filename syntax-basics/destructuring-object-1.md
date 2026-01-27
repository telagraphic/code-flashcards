How do you destructure properties from an object?
?

```javascript
// Basic object destructuring
const user = {
  name: 'Alice',
  age: 30,
  email: 'alice@example.com'
};

// Destructure into variables
const { name, age, email } = user;
console.log(name); // 'Alice'
console.log(age); // 30

// Destructure with different variable names
const { name: userName, age: userAge } = user;
console.log(userName); // 'Alice'

// Practical: Extract data from API response
async function fetchUser(userId) {
  const response = await fetch(`/api/users/${userId}`);
  const user = await response.json();
  
  const { id, name, email, role } = user;
  return { id, name, email, role };
}

// Destructure function parameters
function displayUser({ name, email }) {
  console.log(`${name} - ${email}`);
}

displayUser({ name: 'Bob', email: 'bob@example.com' });
```
