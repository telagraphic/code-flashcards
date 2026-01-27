What is optional chaining (?.) and how do you use it?
?

```javascript
// Optional chaining (?.) safely accesses nested properties
// Returns undefined if any part of chain is null/undefined

const user = {
  name: 'Alice',
  address: {
    street: '123 Main St',
    city: 'New York'
  }
};

// Safe property access
console.log(user?.name); // 'Alice'
console.log(user?.address?.city); // 'New York'
console.log(user?.address?.zip); // undefined (safe, no error)

// Without optional chaining (old way)
const city = user && user.address && user.address.city;

// With optional chaining
const city2 = user?.address?.city;

// Practical: API response handling
async function getUserData(userId) {
  const response = await fetch(`/api/users/${userId}`);
  const data = await response.json();
  
  return {
    name: data?.user?.name ?? 'Unknown',
    email: data?.user?.contact?.email ?? 'no-email@example.com',
    city: data?.user?.address?.city ?? 'Unknown'
  };
}

// Optional chaining with arrays
const users = [
  { name: 'Alice', friends: ['Bob', 'Charlie'] }
];

console.log(users?.[0]?.name); // 'Alice'
console.log(users?.[0]?.friends?.[0]); // 'Bob'
console.log(users?.[99]?.name); // undefined (safe)
```
