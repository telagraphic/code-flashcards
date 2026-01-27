How do you use Object.assign() for object merging and defaults?
?

```javascript
// Object.assign() for merging and defaults

// Practical: Configuration with defaults
function createConfig(userConfig) {
  const defaults = {
    apiUrl: 'https://api.example.com',
    timeout: 5000,
    retries: 3,
    headers: {
      'Content-Type': 'application/json'
    }
  };
  
  return Object.assign({}, defaults, userConfig);
}

const config = createConfig({ timeout: 10000 });
// { apiUrl: 'https://api.example.com', timeout: 10000, retries: 3, ... }

// Practical: Update object with partial data
function updateUser(user, updates) {
  return Object.assign({}, user, updates);
}

const user = { id: 1, name: 'Alice', age: 30 };
const updated = updateUser(user, { age: 31, email: 'alice@example.com' });
// { id: 1, name: 'Alice', age: 31, email: 'alice@example.com' }

// Practical: Merge multiple configuration sources
function mergeConfigs(base, env, user) {
  return Object.assign({}, base, env, user);
}

const baseConfig = { apiUrl: 'https://api.example.com' };
const envConfig = { timeout: 5000 };
const userConfig = { timeout: 10000 };
const finalConfig = mergeConfigs(baseConfig, envConfig, userConfig);
// { apiUrl: 'https://api.example.com', timeout: 10000 }

// Practical: Add properties to existing object
function addProperties(obj, ...properties) {
  return Object.assign({}, obj, ...properties);
}

const user = { name: 'Alice' };
const withAge = addProperties(user, { age: 30 });
const withEmail = addProperties(withAge, { email: 'alice@example.com' });

// Practical: Combine form data
function combineFormData(form1, form2) {
  return Object.assign({}, form1, form2);
}

const personalInfo = { name: 'Alice', age: 30 };
const contactInfo = { email: 'alice@example.com', phone: '123-456-7890' };
const complete = combineFormData(personalInfo, contactInfo);

// Practical: Spread operator alternative (modern)
// Object.assign({}, obj1, obj2) is equivalent to { ...obj1, ...obj2 }
const merged = { ...obj1, ...obj2 };
```
