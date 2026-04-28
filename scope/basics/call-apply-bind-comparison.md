When should you use call(), apply(), or bind()?
?

```javascript
// Comparison and when to use each

// call() - Use when:
// 1. You know the exact number of arguments
// 2. You want immediate execution
// 3. Arguments are individual values

function greet(greeting, name) {
  return `${greeting}, ${name}!`;
}

greet.call(null, 'Hello', 'Alice'); // 'Hello, Alice!'

// apply() - Use when:
// 1. You have an array of arguments
// 2. You want immediate execution
// 3. Number of arguments is variable

const args = ['Hi', 'Bob'];
greet.apply(null, args); // 'Hi, Bob!'

// bind() - Use when:
// 1. You want to create a new function
// 2. You need to preserve 'this' context
// 3. You want partial application
// 4. Function will be called later

const boundGreet = greet.bind(null, 'Hey');
boundGreet('Charlie'); // 'Hey, Charlie!'

// Practical: Modern alternatives
// ES6 spread operator replaces apply() for arrays
const numbers = [1, 2, 3];
Math.max.apply(null, numbers); // Old way
Math.max(...numbers); // Modern way

// Arrow functions preserve 'this', reducing need for bind()
class Component {
  constructor() {
    this.value = 10;
  }
  
  // Old way with bind
  oldMethod() {
    setTimeout(function() {
      console.log(this.value); // Needs bind
    }.bind(this), 100);
  }
  
  // Modern way with arrow function
  newMethod() {
    setTimeout(() => {
      console.log(this.value); // 'this' preserved automatically
    }, 100);
  }
}

// When to still use bind/call/apply:
// 1. Method borrowing (call/apply)
// 2. Partial application (bind)
// 3. Dynamic method invocation (call/apply)
// 4. Converting array-like objects (call/apply)
```
