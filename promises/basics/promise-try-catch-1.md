How do you use try/catch blocks with async/await for error handling?
?

```javascript
// try/catch provides synchronous-like error handling for async code
async function submitForm(formData) {
  try {
    // All await calls are in try block
    const response = await fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const result = await response.json();
    showSuccessMessage('Form submitted successfully!');
    return result;
  } catch (error) {
    // Catches errors from any await in try block
    console.error('Form submission error:', error);
    showErrorMessage('Failed to submit form. Please try again.');
    throw error; // Re-throw if needed
  }
}

// try/catch works naturally with async/await
// More readable than .catch() chains for complex flows
```
