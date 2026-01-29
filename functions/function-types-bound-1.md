What is a bound function and when should you use it?
?

```javascript
// Bound function - preserves 'this' context using bind()

// Use cases:
// 1. Preserving 'this' in callbacks
const user = {
  name: 'Alice',
  greet: function() {
    console.log(`Hello, I'm ${this.name}`);
  }
};

const boundGreet = user.greet.bind(user);
setTimeout(boundGreet, 1000); // "Hello, I'm Alice"

// Without bind, 'this' would be lost
setTimeout(user.greet, 1000); // "Hello, I'm undefined"

// 2. Partial application (pre-filling arguments)
function multiply(a, b, c) {
  return a * b * c;
}

const double = multiply.bind(null, 2);
console.log(double(3, 4)); // 24 (2 * 3 * 4)

// 3. Event handlers that need object context
class FormHandler {
  constructor() {
    this.data = [];
  }
  
  handleSubmit(event) {
    event.preventDefault();
    this.data.push(event.target.value);
  }
  
  setup() {
    // Bind to preserve 'this'
    document.getElementById('form')
      .addEventListener('submit', this.handleSubmit.bind(this));
  }
}

// 4. Passing methods as callbacks
const obj = {
  value: 42,
  getValue: function() {
    return this.value;
  }
};

const getValue = obj.getValue.bind(obj);
setTimeout(getValue, 100); // Returns 42
```
