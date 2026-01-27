What is the Object type in JavaScript and how is it used?
?

```javascript
// Object: Collection of key-value pairs (properties)
// Non-primitive type, passed by reference

// Object creation
const obj1 = {}; // Object literal
const obj2 = new Object(); // Constructor
const obj3 = Object.create(null); // Create with no prototype

// Object properties
const user = {
  name: 'Alice',
  age: 30,
  email: 'alice@example.com',
  'property-with-dash': 'value' // Bracket notation for special keys
};

// Accessing properties
console.log(user.name); // Dot notation
console.log(user['name']); // Bracket notation
console.log(user['property-with-dash']); // Required for special keys

// Practical: Configuration objects
const config = {
  apiUrl: 'https://api.example.com',
  timeout: 5000,
  retries: 3,
  headers: {
    'Content-Type': 'application/json'
  }
};

// Practical: Data modeling
const product = {
  id: 1,
  name: 'Laptop',
  price: 999.99,
  inStock: true,
  tags: ['electronics', 'computers'],
  specifications: {
    cpu: 'Intel i7',
    ram: '16GB',
    storage: '512GB SSD'
  }
};

// Practical: Method definitions
const calculator = {
  add(a, b) {
    return a + b;
  },
  subtract(a, b) {
    return a - b;
  },
  multiply: function(a, b) {
    return a * b;
  }
};

// Practical: Object methods
const keys = Object.keys(user); // ['name', 'age', 'email']
const values = Object.values(user); // ['Alice', 30, 'alice@example.com']
const entries = Object.entries(user); // [['name', 'Alice'], ...]

// Practical: Object manipulation
const updated = { ...user, age: 31 }; // Spread operator
const merged = Object.assign({}, user, { role: 'admin' });

// Practical: Property checking
if ('name' in user) {
  console.log('Property exists');
}

// Practical: Freezing objects
const frozen = Object.freeze(user); // Prevents modifications
// frozen.age = 31; // Silent failure in strict mode

// Objects are reference types
const objA = { value: 1 };
const objB = objA; // Same reference
objB.value = 2;
console.log(objA.value); // 2 (both changed)
```
