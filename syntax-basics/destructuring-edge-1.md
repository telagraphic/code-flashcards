How do you destructure function parameters and return values?
?

```javascript
// Destructuring function parameters
function greet({ name, age = 0 }) {
  return `Hello, ${name}! You are ${age} years old.`;
}

greet({ name: 'Alice', age: 30 });
greet({ name: 'Bob' }); // age defaults to 0

// Destructure return values
function getUser() {
  return {
    id: 1,
    name: 'Alice',
    email: 'alice@example.com',
    role: 'admin'
  };
}

const { name, email } = getUser();
console.log(name, email);

// Practical: API response handling
async function fetchUserData(userId) {
  const response = await fetch(`/api/users/${userId}`);
  const { data, status, error } = await response.json();
  
  if (error) {
    throw new Error(error);
  }
  
  return data;
}

// Destructure in for...of loops
const users = [
  { name: 'Alice', age: 30 },
  { name: 'Bob', age: 25 }
];

for (const { name, age } of users) {
  console.log(`${name} is ${age} years old`);
}

// Destructure in map/filter
const names = users.map(({ name }) => name);
const adults = users.filter(({ age }) => age >= 18);
```
