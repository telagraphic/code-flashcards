What is a complex scenario using for...in in modern web apps?
?

```javascript
// Complex: Deep object processing with nested structures

// Practical: Deep object transformation with path tracking
function deepTransform(obj, transformer, path = '') {
  if (obj === null || typeof obj !== 'object') {
    return transformer(obj, path);
  }
  
  if (Array.isArray(obj)) {
    return obj.map((item, index) => 
      deepTransform(item, transformer, `${path}[${index}]`)
    );
  }
  
  const result = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const currentPath = path ? `${path}.${key}` : key;
      const value = obj[key];
      
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        result[key] = deepTransform(value, transformer, currentPath);
      } else if (Array.isArray(value)) {
        result[key] = value.map((item, index) =>
          deepTransform(item, transformer, `${currentPath}[${index}]`)
        );
      } else {
        result[key] = transformer(value, currentPath);
      }
    }
  }
  
  return result;
}

// Usage: Transform API response with validation
const apiResponse = {
  user: {
    name: 'Alice',
    email: 'alice@example.com',
    settings: {
      theme: 'dark',
      notifications: true
    }
  },
  items: [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' }
  ]
};

const transformed = deepTransform(apiResponse, (value, path) => {
  if (path.includes('email') && typeof value === 'string') {
    return value.toLowerCase();
  }
  return value;
});

// Complex: Object diff with nested comparison
function deepDiff(obj1, obj2, path = '') {
  const diff = {};
  
  // Check all keys in obj2
  for (const key in obj2) {
    if (obj2.hasOwnProperty(key)) {
      const currentPath = path ? `${path}.${key}` : key;
      const val1 = obj1[key];
      const val2 = obj2[key];
      
      if (typeof val2 === 'object' && val2 !== null && !Array.isArray(val2)) {
        if (typeof val1 === 'object' && val1 !== null && !Array.isArray(val1)) {
          const nestedDiff = deepDiff(val1, val2, currentPath);
          Object.assign(diff, nestedDiff);
        } else {
          diff[currentPath] = { old: val1, new: val2 };
        }
      } else if (val1 !== val2) {
        diff[currentPath] = { old: val1, new: val2 };
      }
    }
  }
  
  // Check for removed keys
  for (const key in obj1) {
    if (obj1.hasOwnProperty(key) && !(key in obj2)) {
      const currentPath = path ? `${path}.${key}` : key;
      diff[currentPath] = { old: obj1[key], new: undefined };
    }
  }
  
  return diff;
}

// Complex: Configuration inheritance chain
function resolveConfig(configs) {
  let resolved = {};
  
  // Merge configs in order (later overrides earlier)
  for (const config of configs) {
    for (const key in config) {
      if (config.hasOwnProperty(key)) {
        if (typeof config[key] === 'object' && 
            config[key] !== null && 
            !Array.isArray(config[key]) &&
            typeof resolved[key] === 'object' &&
            resolved[key] !== null &&
            !Array.isArray(resolved[key])) {
          resolved[key] = resolveConfig([resolved[key], config[key]]);
        } else {
          resolved[key] = config[key];
        }
      }
    }
  }
  
  return resolved;
}

// Usage: Environment-specific configuration
const baseConfig = { api: { url: 'https://api.example.com' } };
const devConfig = { api: { timeout: 5000 }, debug: true };
const prodConfig = { api: { timeout: 10000 }, debug: false };

const finalConfig = resolveConfig([baseConfig, devConfig, prodConfig]);
```
