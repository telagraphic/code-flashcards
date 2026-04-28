How do you refactor scattered form validation into a closure module?
?

```javascript
// ❌ BEFORE: Validation logic scattered and duplicated

var formErrors = {};
var formTouched = {};

function validateEmail() {
  var email = document.getElementById('email').value;
  var errorEl = document.getElementById('email-error');
  
  if (!email) {
    formErrors.email = 'Email is required';
    errorEl.textContent = formErrors.email;
    errorEl.style.display = 'block';
    return false;
  }
  if (!email.includes('@')) {
    formErrors.email = 'Invalid email';
    errorEl.textContent = formErrors.email;
    errorEl.style.display = 'block';
    return false;
  }
  formErrors.email = null;
  errorEl.style.display = 'none';
  return true;
}

function validatePassword() {
  var password = document.getElementById('password').value;
  var errorEl = document.getElementById('password-error');
  
  if (!password) {
    formErrors.password = 'Password is required';
    errorEl.textContent = formErrors.password;
    errorEl.style.display = 'block';
    return false;
  }
  if (password.length < 8) {
    formErrors.password = 'Password must be 8+ characters';
    errorEl.textContent = formErrors.password;
    errorEl.style.display = 'block';
    return false;
  }
  // ... more duplicated error display logic
}

// Problems:
// - Duplicated error display logic
// - Global state (formErrors, formTouched)
// - Hard to add new fields
// - No way to reset or reuse

// ────────────────────────────────────────────────────────────

// ✅ AFTER: Closure-based form validator

function createFormValidator(formId, config) {
  const form = document.getElementById(formId);
  
  // Private state
  const errors = {};
  const touched = {};
  const validators = config.validators || {};
  
  // Private: show/hide error for a field
  const showError = (fieldName, message) => {
    const errorEl = form.querySelector(`[data-error="${fieldName}"]`);
    if (errorEl) {
      errorEl.textContent = message || '';
      errorEl.style.display = message ? 'block' : 'none';
    }
  };
  
  // Private: validate single field
  const validateField = (fieldName, value) => {
    const validator = validators[fieldName];
    if (!validator) return null;
    
    // Validator returns error message or null
    return validator(value);
  };
  
  // Private: validate all fields
  const validateAll = () => {
    const formData = new FormData(form);
    let isValid = true;
    
    for (const [name, value] of formData) {
      touched[name] = true;
      const error = validateField(name, value);
      errors[name] = error;
      showError(name, error);
      if (error) isValid = false;
    }
    
    return isValid;
  };
  
  // Event handlers (closures over state)
  const handleBlur = (event) => {
    const { name, value } = event.target;
    if (!name) return;
    
    touched[name] = true;
    const error = validateField(name, value);
    errors[name] = error;
    showError(name, error);
  };
  
  const handleInput = (event) => {
    const { name, value } = event.target;
    if (!name || !touched[name]) return;
    
    // Re-validate on input only if field was touched
    const error = validateField(name, value);
    errors[name] = error;
    showError(name, error);
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!validateAll()) return;
    
    if (config.onSubmit) {
      const formData = Object.fromEntries(new FormData(form));
      await config.onSubmit(formData);
    }
  };
  
  // Attach listeners
  form.addEventListener('blur', handleBlur, true);
  form.addEventListener('input', handleInput);
  form.addEventListener('submit', handleSubmit);
  
  // Public API
  return {
    validate: validateAll,
    getErrors: () => ({ ...errors }),
    reset: () => {
      form.reset();
      Object.keys(errors).forEach(key => {
        errors[key] = null;
        touched[key] = false;
        showError(key, null);
      });
    },
    destroy: () => {
      form.removeEventListener('blur', handleBlur, true);
      form.removeEventListener('input', handleInput);
      form.removeEventListener('submit', handleSubmit);
    }
  };
}

// Usage
const loginForm = createFormValidator('login-form', {
  validators: {
    email: (v) => !v ? 'Required' : !v.includes('@') ? 'Invalid email' : null,
    password: (v) => !v ? 'Required' : v.length < 8 ? 'Min 8 chars' : null
  },
  onSubmit: async (data) => {
    await fetch('/api/login', { method: 'POST', body: JSON.stringify(data) });
  }
});

// Improvements:
// ✓ DRY — error display logic in one place
// ✓ Configurable validators
// ✓ Private state (errors, touched)
// ✓ Reusable for any form
// ✓ Proper cleanup
```
