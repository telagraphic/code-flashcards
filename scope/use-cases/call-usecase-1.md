How do you use call() to borrow methods from other objects?
?

```javascript
// call() allows borrowing methods from other objects

// Array-like object borrowing array methods
const arrayLike = {
  0: 'apple',
  1: 'banana',
  2: 'cherry',
  length: 3
};

// Borrow Array.prototype.slice to convert to real array
const realArray = Array.prototype.slice.call(arrayLike);
console.log(realArray); // ['apple', 'banana', 'cherry']

// Borrow Array.prototype.forEach
Array.prototype.forEach.call(arrayLike, function(item, index) {
  console.log(`${index}: ${item}`);
});

// Practical: Convert NodeList to array
const nodeList = document.querySelectorAll('.item');
const itemsArray = Array.prototype.slice.call(nodeList);
itemsArray.forEach(item => {
  item.classList.add('processed');
});

// Practical: Borrow methods for validation
const validator = {
  minLength: 5,
  validate: function(value) {
    return value.length >= this.minLength;
  }
};

const input1 = { value: 'hello' };
const input2 = { value: 'hi' };

console.log(validator.validate.call(input1, input1.value)); // true
console.log(validator.validate.call(input2, input2.value)); // false

// Practical: Method delegation
class User {
  constructor(name) {
    this.name = name;
  }
  
  greet() {
    return `Hello, I'm ${this.name}`;
  }
}

class Admin {
  constructor(name) {
    this.name = name;
  }
}

const admin = new Admin('Bob');
const user = new User('Alice');

// Admin borrows User's greet method
console.log(user.greet.call(admin)); // 'Hello, I'm Bob'
```
