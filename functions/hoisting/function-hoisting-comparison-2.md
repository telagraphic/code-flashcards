How do class methods behave with hoisting?
?

```javascript
// Class declarations are hoisted, but in a "temporal dead zone"
// You cannot use a class before it's declared

// const user = new User(); // ReferenceError

class User {
  constructor(name) {
    this.name = name;
  }
  
  // Methods are NOT hoisted separately
  // They're part of the class, which must be defined first
  greet() {
    return `Hello, ${this.name}!`;
  }
  
  // Static methods also not hoisted
  static createAdmin(name) {
    return new User(name);
  }
}

// Now it works
const user = new User('Alice');
console.log(user.greet()); // "Hello, Alice!"

// Practical example: class with method
class Calculator {
  add(a, b) {
    return a + b;
  }
  
  multiply(a, b) {
    return a * b;
  }
}

// Must instantiate after class definition
const calc = new Calculator();
console.log(calc.add(2, 3)); // 5
```
