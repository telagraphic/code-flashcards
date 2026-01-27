How do you use Object.keys() for dynamic property access and iteration?
?

```javascript
// Object.keys() for dynamic access

// Practical: Dynamic property access
function getNestedValue(obj, path) {
  const keys = path.split('.');
  let current = obj;
  
  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = current[key];
    } else {
      return undefined;
    }
  }
  
  return current;
}

const user = { profile: { name: 'Alice', settings: { theme: 'dark' } } };
console.log(getNestedValue(user, 'profile.settings.theme')); // 'dark'

// Practical: Set nested property dynamically
function setNestedValue(obj, path, value) {
  const keys = path.split('.');
  const lastKey = keys.pop();
  let current = obj;
  
  for (const key of keys) {
    if (!(key in current) || typeof current[key] !== 'object') {
      current[key] = {};
    }
    current = current[key];
  }
  
  current[lastKey] = value;
}

const user = {};
setNestedValue(user, 'profile.settings.theme', 'dark');
// { profile: { settings: { theme: 'dark' } } }

// Practical: Pick specific keys from object
function pick(obj, keys) {
  return Object.keys(obj)
    .filter(key => keys.includes(key))
    .reduce((result, key) => {
      result[key] = obj[key];
      return result;
    }, {});
}

const user = { name: 'Alice', age: 30, email: 'alice@example.com', role: 'admin' };
const publicData = pick(user, ['name', 'email']);
// { name: 'Alice', email: 'alice@example.com' }

// Practical: Omit specific keys
function omit(obj, keysToOmit) {
  return Object.keys(obj)
    .filter(key => !keysToOmit.includes(key))
    .reduce((result, key) => {
      result[key] = obj[key];
      return result;
    }, {});
}

const user = { name: 'Alice', password: 'secret', email: 'alice@example.com' };
const safeData = omit(user, ['password']);
// { name: 'Alice', email: 'alice@example.com' }

// Practical: Map over keys
function mapKeys(obj, mapper) {
  return Object.keys(obj).reduce((result, key) => {
    const newKey = mapper(key);
    result[newKey] = obj[key];
    return result;
  }, {});
}

const data = { user_name: 'Alice', user_age: 30 };
const camelCase = mapKeys(data, key => {
  return key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
});
// { userName: 'Alice', userAge: 30 }
```
