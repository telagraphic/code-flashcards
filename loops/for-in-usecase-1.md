How do you use for...in for object manipulation and validation?
?

```javascript
// for...in for object manipulation

// Practical: Object validation
function validateObject(obj, schema) {
  const errors = [];
  
  for (const key in schema) {
    if (!(key in obj)) {
      errors.push(`Missing required field: ${key}`);
      continue;
    }
    
    const expectedType = schema[key];
    const actualType = typeof obj[key];
    
    if (actualType !== expectedType) {
      errors.push(`${key} should be ${expectedType}, got ${actualType}`);
    }
  }
  
  return errors.length === 0 ? null : errors;
}

// Usage
const user = { name: 'Alice', age: 30 };
const schema = { name: 'string', age: 'number', email: 'string' };
const errors = validateObject(user, schema);

// Practical: Deep object cloning
function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  
  const cloned = Array.isArray(obj) ? [] : {};
  
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloned[key] = typeof obj[key] === 'object' 
        ? deepClone(obj[key])
        : obj[key];
    }
  }
  
  return cloned;
}

// Practical: Object transformation
function transformObject(obj, transformer) {
  const result = {};
  
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const newKey = transformer.key ? transformer.key(key) : key;
      const newValue = transformer.value 
        ? transformer.value(obj[key], key)
        : obj[key];
      result[newKey] = newValue;
    }
  }
  
  return result;
}

// Usage
const user = { firstName: 'Alice', lastName: 'Smith' };
const transformed = transformObject(user, {
  key: (k) => k.replace(/([A-Z])/g, '_$1').toLowerCase(),
  value: (v) => v.toUpperCase()
});

// Practical: Count object properties
function countProperties(obj) {
  let count = 0;
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      count++;
    }
  }
  return count;
}

// Practical: Filter object properties
function filterObject(obj, predicate) {
  const result = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key) && predicate(obj[key], key)) {
      result[key] = obj[key];
    }
  }
  return result;
}

// Usage: Remove null/undefined values
const data = { name: 'Alice', age: null, email: 'alice@example.com' };
const cleaned = filterObject(data, (value) => value != null);
```
