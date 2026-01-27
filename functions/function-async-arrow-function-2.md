How do you use an async arrow function in a promise chain?
?

```javascript
// Async arrow function in promise chain
const processData = async (data) => {
  const cleaned = await cleanData(data);
  const validated = await validateData(cleaned);
  return validated;
};

// Usage with promise chain
fetch('/api/data')
  .then(response => response.json())
  .then(data => processData(data))
  .then(result => {
    console.log('Processed:', result);
    updateUI(result);
  })
  .catch(error => console.error('Error:', error));
```
