How do you use destructuring with default values and fallback patterns?
?

```javascript
// Complex default value patterns
function processUser({
  name = 'Anonymous',
  age = 0,
  email = 'no-email@example.com',
  preferences: {
    theme = 'light',
    notifications = false
  } = {}
} = {}) {
  return {
    name,
    age,
    email,
    theme,
    notifications
  };
}

// Works with empty object
processUser(); // All defaults used

// Works with partial data
processUser({ name: 'Alice' }); // name: 'Alice', others default

// Practical: Configuration with defaults
function createConfig({
  apiUrl = 'https://api.example.com',
  timeout = 5000,
  retries = 3,
  headers = {}
} = {}) {
  return {
    apiUrl,
    timeout,
    retries,
    headers
  };
}

const config = createConfig({ timeout: 10000 });
console.log(config); // { apiUrl: 'https://api.example.com', timeout: 10000, ... }

// Destructuring with null/undefined handling
const user = null;
const { name = 'Guest' } = user || {};
console.log(name); // 'Guest'

// Practical: Safe destructuring
function safeDestructure(obj) {
  const {
    nested: {
      deep: {
        value = 'default'
      } = {}
    } = {}
  } = obj || {};
  return value;
}

safeDestructure(null); // 'default'
safeDestructure({}); // 'default'
safeDestructure({ nested: { deep: { value: 'actual' } } }); // 'actual'
```
