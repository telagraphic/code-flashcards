How do you create a function declaration for form validation?
?

```javascript
// Function declaration for email validation
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Function declaration for password validation
function validatePassword(password) {
  return password.length >= 8 && 
         /[A-Z]/.test(password) && 
         /[a-z]/.test(password) && 
         /[0-9]/.test(password);
}

// Usage in form handler
function handleFormSubmit(event) {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  
  if (!validateEmail(email)) {
    alert('Invalid email address');
    return;
  }
  
  if (!validatePassword(password)) {
    alert('Password must be at least 8 characters with uppercase, lowercase, and number');
    return;
  }
  
  submitForm(email, password);
}
```
