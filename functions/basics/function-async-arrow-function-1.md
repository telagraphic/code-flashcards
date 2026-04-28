How do you create an async arrow function for handling button click events that fetch data?
?

```javascript
// Async arrow function as event handler
const handleSearch = async (event) => {
  event.preventDefault();
  const query = document.getElementById('searchInput').value;
  
  try {
    const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
    const results = await response.json();
    displayResults(results);
  } catch (error) {
    console.error('Search failed:', error);
    showError('Search failed. Please try again.');
  }
};

// Attach to button
document.getElementById('searchButton').addEventListener('click', handleSearch);
```
