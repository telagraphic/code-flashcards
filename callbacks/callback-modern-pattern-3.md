How do you use callbacks for form validation and submission?
?

```javascript
// Callbacks pattern for form handling

// Validation callback
function validateForm(formData, onSuccess, onError) {
  const errors = [];
  
  if (!formData.email || !formData.email.includes('@')) {
    errors.push('Invalid email');
  }
  
  if (!formData.password || formData.password.length < 8) {
    errors.push('Password must be at least 8 characters');
  }
  
  // Execute appropriate callback
  if (errors.length === 0) {
    onSuccess(formData);
  } else {
    onError(errors);
  }
}

// Usage
document.getElementById('myForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const formData = {
    email: document.getElementById('email').value,
    password: document.getElementById('password').value
  };
  
  validateForm(
    formData,
    function(data) {
      // Success callback
      submitForm(data);
      showSuccessMessage('Form submitted successfully!');
    },
    function(errors) {
      // Error callback
      displayErrors(errors);
    }
  );
});
```
