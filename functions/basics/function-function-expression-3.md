How do you use a function expression in a module pattern?
?

```javascript
// Module pattern using function expression
const UserModule = (function() {
  // Private variables
  let users = [];
  
  // Private function
  const validateUser = function(user) {
    return user.name && user.email;
  };
  
  // Public API
  return {
    addUser: function(user) {
      if (validateUser(user)) {
        users.push(user);
        return true;
      }
      return false;
    },
    getUsers: function() {
      return users.slice(); // Return copy
    },
    getUserCount: function() {
      return users.length;
    }
  };
})();

// Usage
UserModule.addUser({ name: 'Alice', email: 'alice@example.com' });
console.log(UserModule.getUserCount()); // 1
```
