How do you use an async function to handle form submission with error handling?
?

```javascript
// Async function for form submission
async function submitForm(formData) {
  try {
    const response = await fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Form submission failed:', error);
    throw error;
  }
}

// Usage in form handler
document.getElementById('myForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  try {
    const result = await submitForm(Object.fromEntries(formData));
    alert('Form submitted successfully!');
  } catch (error) {
    alert('Submission failed. Please try again.');
  }
});
```
