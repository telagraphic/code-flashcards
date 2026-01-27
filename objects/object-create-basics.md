What is Object.create() and how does it work?
?

```javascript
// Object.create(): Creates new object with specified prototype
// Allows creating objects without constructor functions

// Basic usage
const prototype = {
  greet() {
    return `Hello, I'm ${this.name}`;
  }
};

const person = Object.create(prototype);
person.name = 'Alice';
console.log(person.greet()); // "Hello, I'm Alice"

// Practical: Prototype-based inheritance
const animal = {
  speak() {
    return `${this.name} makes a sound`;
  }
};

const dog = Object.create(animal);
dog.name = 'Buddy';
dog.speak = function() {
  return `${this.name} barks!`;
};

console.log(dog.speak()); // "Buddy barks!"

// Practical: Create object with null prototype
const obj = Object.create(null);
obj.name = 'Alice';
console.log(obj.toString); // undefined (no Object.prototype)

// Practical: Property descriptors
const obj = Object.create(null, {
  name: {
    value: 'Alice',
    writable: false,
    enumerable: true,
    configurable: false
  },
  age: {
    value: 30,
    writable: true,
    enumerable: true,
    configurable: true
  }
});

obj.name = 'Bob'; // Silent failure (writable: false)
console.log(obj.name); // 'Alice'

// Practical: Create object with methods
const calculator = Object.create({
  add(a, b) {
    return a + b;
  },
  subtract(a, b) {
    return a - b;
  }
});

console.log(calculator.add(5, 3)); // 8

// Object.create() vs new Constructor():
// - Object.create(): Sets prototype directly
// - new: Calls constructor function
```
