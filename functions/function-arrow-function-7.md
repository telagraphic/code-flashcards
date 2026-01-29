What are edge cases and special syntax for arrow functions?
?

```javascript
// 1. Returning object literal - must wrap in parentheses
const getUser = () => ({ name: 'Alice', age: 25 });
// Without parentheses, braces are interpreted as function body
// const getUser = () => { name: 'Alice', age: 25 }; // SyntaxError

// 2. Returning function - parentheses needed
const createMultiplier = factor => x => x * factor;
const double = createMultiplier(2);
console.log(double(5)); // 10

// 3. Arrow function as property in object literal
const obj = {
  name: 'Test',
  // Method shorthand with arrow
  greet: () => `Hello from ${this.name}`, // 'this' is not obj!
  // Regular method (better for 'this')
  greetProper: function() {
    return `Hello from ${this.name}`;
  }
};

// 4. Arrow function in class field (preserves 'this')
class Button {
  handleClick = () => {
    console.log(this); // 'this' refers to Button instance
  };
}

// 5. Arrow function with void operator
const log = message => void console.log(message);
// Returns undefined explicitly

// 6. Arrow function with comma operator
const process = x => (console.log(x), x * 2);
// Executes both, returns last value

// 7. Arrow function as IIFE
(() => {
  console.log('Immediately invoked arrow function');
})();

// 8. Arrow function with type annotations (TypeScript)
// const add = (a: number, b: number): number => a + b;
```
