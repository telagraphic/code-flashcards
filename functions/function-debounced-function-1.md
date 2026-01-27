How do you create a debounced function for search input to delay API calls?
?

```javascript
// Debounce utility function
function debounce(func, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

// Search function
function performSearch(query) {
  console.log('Searching for:', query);
  fetch(`/api/search?q=${query}`)
    .then(response => response.json())
    .then(results => displayResults(results));
}

// Create debounced search (wait 300ms after user stops typing)
const debouncedSearch = debounce(performSearch, 300);

// Use in input handler
document.getElementById('searchInput').addEventListener('input', (e) => {
  const query = e.target.value;
  if (query.length > 2) {
    debouncedSearch(query);
  }
});
```
