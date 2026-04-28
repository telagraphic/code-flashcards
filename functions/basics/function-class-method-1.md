How do you define methods inside an ES6 class?
?

```javascript
// ES6 class with methods
class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }
  
  // Class method
  greet() {
    return `Hello, I'm ${this.name}`;
  }
  
  // Method that modifies state
  updateEmail(newEmail) {
    this.email = newEmail;
    return this.email;
  }
  
  // Method that returns formatted data
  getProfile() {
    return {
      name: this.name,
      email: this.email,
      greeting: this.greet()
    };
  }
}

// Usage
const user = new User('Alice', 'alice@example.com');
console.log(user.greet()); // "Hello, I'm Alice"
user.updateEmail('alice.smith@example.com');
console.log(user.getProfile());
```
