How do you use bind() to create a bound function that preserves the 'this' context?
?

```javascript
// Object with method
const user = {
  name: 'John',
  greet: function() {
    console.log(`Hello, I'm ${this.name}`);
  }
};

// Bound function preserves 'this' context
const boundGreet = user.greet.bind(user);

// Now 'this' refers to user even when called differently
setTimeout(boundGreet, 1000); // "Hello, I'm John"

// Without bind, 'this' would be undefined or window
setTimeout(user.greet, 1000); // "Hello, I'm undefined"
```
