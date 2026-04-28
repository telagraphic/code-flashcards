How do you define a method inside an object?
?

```javascript
// Object with methods
const user = {
  name: 'John',
  email: 'john@example.com',
  // Method using shorthand syntax
  greet() {
    return `Hello, I'm ${this.name}`;
  },
  // Method using traditional syntax
  updateEmail: function(newEmail) {
    this.email = newEmail;
    return this.email;
  },
  // Method that calls another method
  getProfile() {
    return {
      name: this.name,
      email: this.email,
      greeting: this.greet()
    };
  }
};

// Usage
console.log(user.greet()); // "Hello, I'm John"
user.updateEmail('john.doe@example.com');
console.log(user.getProfile());
```
