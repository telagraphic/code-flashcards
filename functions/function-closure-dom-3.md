How do you use closures for debouncing DOM events like input or scroll?
?

```javascript
// Closure keeps track of the timeout between calls

function createDebouncedSearch(inputId, resultsId, delay = 300) {
  const input = document.getElementById(inputId);
  const results = document.getElementById(resultsId);
  
  // Private state - closure variables
  let timeoutId = null;
  let lastQuery = '';
  
  const performSearch = async function(query) {
    results.innerHTML = 'Searching...';
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      const data = await response.json();
      results.innerHTML = data.map(item => `<div>${item.name}</div>`).join('');
    } catch (error) {
      results.innerHTML = 'Search failed';
    }
  };
  
  // Handler closes over timeoutId, lastQuery, performSearch
  const handleInput = function(event) {
    const query = event.target.value.trim();
    
    // Clear previous timeout (closure over timeoutId)
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    
    if (query === lastQuery) return;
    lastQuery = query;
    
    if (query.length < 2) {
      results.innerHTML = '';
      return;
    }
    
    // Set new timeout (updates timeoutId in closure)
    timeoutId = setTimeout(() => {
      performSearch(query);
    }, delay);
  };
  
  input.addEventListener('input', handleInput);
  
  return {
    clear: () => {
      if (timeoutId) clearTimeout(timeoutId);
      input.value = '';
      results.innerHTML = '';
      lastQuery = '';
    },
    destroy: () => {
      if (timeoutId) clearTimeout(timeoutId);
      input.removeEventListener('input', handleInput);
    }
  };
}

const search = createDebouncedSearch('search-input', 'search-results', 300);

// Cleanup when component unmounts
search.destroy();
```
