How do you create a debounced function for form validation?
?

```javascript
// Debounce utility
function debounce(func, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

// Validation function
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValid = emailRegex.test(email);
  
  const errorElement = document.getElementById('emailError');
  if (!isValid && email.length > 0) {
    errorElement.textContent = 'Invalid email format';
    errorElement.style.display = 'block';
  } else {
    errorElement.style.display = 'none';
  }
  
  return isValid;
}

// Create debounced validator (wait 500ms after user stops typing)
const debouncedValidateEmail = debounce(validateEmail, 500);

// Use in email input
document.getElementById('emailInput').addEventListener('input', (e) => {
  debouncedValidateEmail(e.target.value);
});
```
