How do you destructure nested objects and provide default values?
?

```javascript
// Nested object destructuring
const user = {
  name: 'Alice',
  address: {
    street: '123 Main St',
    city: 'New York',
    zip: '10001'
  },
  preferences: {
    theme: 'dark',
    notifications: true
  }
};

// Destructure nested properties
const {
  name,
  address: { city, zip },
  preferences: { theme }
} = user;

console.log(city); // 'New York'
console.log(theme); // 'dark'

// Default values for missing properties
const {
  name: userName = 'Guest',
  age = 0,
  role = 'user'
} = { name: 'Bob' };

console.log(userName); // 'Bob'
console.log(age); // 0 (default)
console.log(role); // 'user' (default)

// Practical: Extract nested API data with defaults
const apiResponse = {
  data: {
    user: {
      id: 123,
      name: 'Alice'
    }
  }
};

const {
  data: {
    user: {
      id,
      name,
      email = 'no-email@example.com'
    } = {}
  } = {}
} = apiResponse;

console.log(id); // 123
console.log(email); // 'no-email@example.com' (default)
```
