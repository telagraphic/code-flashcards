What is an arrow function and when should you use it?
?

```javascript
// Arrow function - concise syntax, lexical 'this'
const greet = (name) => `Hello, ${name}!`;

// Use cases:
// 1. Array methods (map, filter, reduce)
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
const evens = numbers.filter(n => n % 2 === 0);
const sum = numbers.reduce((acc, n) => acc + n, 0);

// 2. Callbacks with preserved 'this' context
class Button {
  constructor() {
    this.clicks = 0;
  }
  
  setup() {
    // Arrow function preserves 'this'
    document.addEventListener('click', () => {
      this.clicks++;
      console.log(`Clicked ${this.clicks} times`);
    });
  }
}

// 3. Short, single-expression functions
const square = x => x * x;
const isEven = n => n % 2 === 0;
const getFullName = (first, last) => `${first} ${last}`;

// 4. Promise chains
fetch('/api/data')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
```
