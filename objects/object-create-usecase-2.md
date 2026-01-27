How do you use Object.create() for property descriptors and immutability?
?

```javascript
// Object.create() with property descriptors

// Practical: Create immutable properties
function createImmutableObject(data) {
  const descriptors = {};
  
  for (const [key, value] of Object.entries(data)) {
    descriptors[key] = {
      value: value,
      writable: false,
      enumerable: true,
      configurable: false
    };
  }
  
  return Object.create(null, descriptors);
}

const config = createImmutableObject({
  apiUrl: 'https://api.example.com',
  timeout: 5000
});

// config.apiUrl = 'new'; // Silent failure
console.log(config.apiUrl); // 'https://api.example.com'

// Practical: Create object with getters/setters
const user = Object.create({}, {
  _name: {
    value: '',
    writable: true,
    enumerable: false
  },
  name: {
    get() {
      return this._name;
    },
    set(value) {
      if (typeof value === 'string' && value.length > 0) {
        this._name = value;
      } else {
        throw new Error('Invalid name');
      }
    },
    enumerable: true,
    configurable: true
  }
});

user.name = 'Alice';
console.log(user.name); // 'Alice'

// Practical: Private properties pattern
function createPrivateObject(publicData, privateData) {
  const obj = Object.create(null, {});
  
  // Add public properties
  Object.assign(obj, publicData);
  
  // Store private data in closure
  const privateStore = { ...privateData };
  
  // Add methods that can access private data
  obj.getPrivate = function(key) {
    return privateStore[key];
  };
  
  obj.setPrivate = function(key, value) {
    privateStore[key] = value;
  };
  
  return obj;
}

const user = createPrivateObject(
  { name: 'Alice' },
  { password: 'secret123', token: 'abc123' }
);

console.log(user.name); // 'Alice'
console.log(user.password); // undefined
console.log(user.getPrivate('password')); // 'secret123'

// Practical: Read-only configuration object
function createConfig(defaults, overrides) {
  const config = Object.create(null);
  
  // Add defaults as read-only
  for (const [key, value] of Object.entries(defaults)) {
    Object.defineProperty(config, key, {
      value: value,
      writable: false,
      enumerable: true
    });
  }
  
  // Add overrides (also read-only)
  for (const [key, value] of Object.entries(overrides)) {
    Object.defineProperty(config, key, {
      value: value,
      writable: false,
      enumerable: true
    });
  }
  
  return config;
}

const config = createConfig(
  { apiUrl: 'https://api.example.com' },
  { timeout: 10000 }
);
// config.timeout = 5000; // Silent failure
```
