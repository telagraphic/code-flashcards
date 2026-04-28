How do you create a constructor function to create object instances?
?

```javascript
// Constructor function
function User(name, email) {
  this.name = name;
  this.email = email;
  this.createdAt = new Date();
}

// Add methods to prototype
User.prototype.greet = function() {
  return `Hello, I'm ${this.name}`;
};

User.prototype.updateEmail = function(newEmail) {
  this.email = newEmail;
};

// Create instances using 'new'
const user1 = new User('Alice', 'alice@example.com');
const user2 = new User('Bob', 'bob@example.com');

console.log(user1.greet()); // "Hello, I'm Alice"
console.log(user2.greet()); // "Hello, I'm Bob"
```
