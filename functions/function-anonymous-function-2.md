How do you use an anonymous function as an event handler?
?

```javascript
// Anonymous function as event handler
document.getElementById('loginButton').addEventListener('click', function(event) {
  event.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  
  if (username && password) {
    authenticateUser(username, password);
  } else {
    alert('Please fill in all fields');
  }
});

// Another example: form validation
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const email = document.getElementById('email').value;
  if (!email.includes('@')) {
    alert('Invalid email address');
    return;
  }
  submitForm();
});
```
