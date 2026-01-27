How do you use spread operator for nested objects and conditional properties?
?

```javascript
// Spread with nested objects (shallow copy)
const user = {
  name: 'Alice',
  address: {
    street: '123 Main St',
    city: 'New York'
  }
};

const userCopy = { ...user };
userCopy.address.city = 'Boston';
console.log(user.address.city); // 'Boston' (nested object shared!)

// Deep copy pattern
const deepCopy = {
  ...user,
  address: {
    ...user.address,
    city: 'Boston'
  }
};

// Practical: Merging nested configurations
const defaultConfig = {
  api: {
    url: 'https://api.example.com',
    timeout: 5000
  },
  ui: {
    theme: 'light'
  }
};

const userConfig = {
  api: {
    timeout: 10000
  }
};

const finalConfig = {
  ...defaultConfig,
  api: {
    ...defaultConfig.api,
    ...userConfig.api
  }
};
console.log(finalConfig.api.timeout); // 10000

// Conditional properties with spread
function createUser(name, includeEmail = false) {
  return {
    name,
    ...(includeEmail && { email: `${name}@example.com` })
  };
}

console.log(createUser('Alice', true)); // { name: 'Alice', email: 'alice@example.com' }
console.log(createUser('Bob', false)); // { name: 'Bob' }

// Practical: State updates with nested objects
function updateNestedState(state, path, value) {
  const [key, ...rest] = path;
  return {
    ...state,
    [key]: rest.length
      ? updateNestedState(state[key] || {}, rest, value)
      : value
  };
}
```
