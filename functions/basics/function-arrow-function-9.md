What are common syntax mistakes with arrow functions?
?

```javascript
// MISTAKE 1: Forgetting parentheses for object return
// const getUser = () => { name: 'Alice' }; // SyntaxError
// CORRECT: Wrap object in parentheses
const getUser = () => ({ name: 'Alice' });

// MISTAKE 2: Using braces without return for value
// const double = x => { x * 2 }; // Returns undefined
// CORRECT: Either implicit return or explicit return
const double1 = x => x * 2; // Implicit
const double2 = x => { return x * 2; }; // Explicit

// MISTAKE 3: Forgetting parentheses for multiple parameters
// const add = a, b => a + b; // SyntaxError
// CORRECT: Use parentheses
const add = (a, b) => a + b;

// MISTAKE 4: Forgetting parentheses for zero parameters
// const getTime = => new Date(); // SyntaxError
// CORRECT: Use parentheses
const getTime = () => new Date();

// MISTAKE 5: Using arrow function as constructor
// const User = (name) => { this.name = name; };
// const user = new User('Alice'); // TypeError
// CORRECT: Use regular function for constructors
function User(name) {
  this.name = name;
}

// MISTAKE 6: Using arrow function when you need 'arguments'
// const sum = () => console.log(arguments); // ReferenceError
// CORRECT: Use regular function or rest parameters
const sum = (...args) => console.log(args);

// MISTAKE 7: Using arrow function when you need dynamic 'this'
const obj = {
  name: 'Test',
  // Wrong: 'this' is not obj
  greet: () => console.log(this.name), // undefined
  // Correct: Use regular function
  greetCorrect: function() {
    console.log(this.name); // "Test"
  }
};
```
