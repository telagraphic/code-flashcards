How do you use closures to create a form handler with validation state?
?

```javascript
// Closure manages form state, validation, and submission

function createFormHandler(formId, options = {}) {
  const form = document.getElementById(formId);
  const { onSubmit, validators = {} } = options;
  
  // Private state
  let errors = {};
  let isSubmitting = false;
  let touched = {};  // Track which fields user has interacted with
  
  const validate = function(fieldName, value) {
    const validator = validators[fieldName];
    if (!validator) return null;
    return validator(value);  // Returns error message or null
  };
  
  const showError = function(fieldName, message) {
    const errorEl = form.querySelector(`[data-error="${fieldName}"]`);
    if (errorEl) {
      errorEl.textContent = message || '';
      errorEl.style.display = message ? 'block' : 'none';
    }
  };
  
  const handleBlur = function(event) {
    const { name, value } = event.target;
    touched[name] = true;
    const error = validate(name, value);
    errors[name] = error;
    showError(name, error);
  };
  
  const handleInput = function(event) {
    const { name, value } = event.target;
    // Only validate if field has been touched (closure over touched)
    if (touched[name]) {
      const error = validate(name, value);
      errors[name] = error;
      showError(name, error);
    }
  };
  
  const handleSubmit = async function(event) {
    event.preventDefault();
    if (isSubmitting) return;
    
    // Validate all fields
    const formData = new FormData(form);
    let hasErrors = false;
    
    for (const [name, value] of formData) {
      touched[name] = true;
      const error = validate(name, value);
      errors[name] = error;
      showError(name, error);
      if (error) hasErrors = true;
    }
    
    if (hasErrors) return;
    
    isSubmitting = true;
    form.querySelector('[type="submit"]').disabled = true;
    
    try {
      if (onSubmit) await onSubmit(Object.fromEntries(formData));
    } finally {
      isSubmitting = false;
      form.querySelector('[type="submit"]').disabled = false;
    }
  };
  
  form.addEventListener('submit', handleSubmit);
  form.addEventListener('blur', handleBlur, true);  // Capture phase
  form.addEventListener('input', handleInput);
  
  return {
    reset: () => {
      form.reset();
      errors = {};
      touched = {};
      form.querySelectorAll('[data-error]').forEach(el => {
        el.style.display = 'none';
      });
    },
    getErrors: () => ({ ...errors }),
    destroy: () => {
      form.removeEventListener('submit', handleSubmit);
      form.removeEventListener('blur', handleBlur, true);
      form.removeEventListener('input', handleInput);
    }
  };
}

const loginForm = createFormHandler('login-form', {
  validators: {
    email: (v) => !v.includes('@') ? 'Invalid email' : null,
    password: (v) => v.length < 8 ? 'Min 8 characters' : null
  },
  onSubmit: async (data) => {
    await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }
});
```
