How do you refactor async search with debouncing into a closure module?
?

```javascript
// ❌ BEFORE: Debounce logic mixed with search logic

var searchTimeout = null;
var searchResults = [];
var isSearching = false;
var lastQuery = '';

document.getElementById('search').addEventListener('input', function(e) {
  var query = e.target.value.trim();
  
  if (searchTimeout) {
    clearTimeout(searchTimeout);
  }
  
  if (query.length < 2) {
    document.getElementById('results').innerHTML = '';
    return;
  }
  
  searchTimeout = setTimeout(async function() {
    if (query === lastQuery) return;
    lastQuery = query;
    
    isSearching = true;
    document.getElementById('loading').style.display = 'block';
    
    try {
      var response = await fetch('/api/search?q=' + encodeURIComponent(query));
      searchResults = await response.json();
      
      var html = '';
      for (var i = 0; i < searchResults.length; i++) {
        html += '<div class="result">' + searchResults[i].title + '</div>';
      }
      document.getElementById('results').innerHTML = html;
    } catch (error) {
      document.getElementById('results').innerHTML = '<div class="error">Search failed</div>';
    } finally {
      isSearching = false;
      document.getElementById('loading').style.display = 'none';
    }
  }, 300);
});

// Problems:
// - Global state everywhere
// - Debounce logic tangled with search logic
// - Hard to cancel pending searches
// - Can't reuse for different searches
// - Race conditions if slow response returns after fast one

// ────────────────────────────────────────────────────────────

// ✅ AFTER: Closure-based search with proper debouncing and cancellation

function createDebouncedSearch(options) {
  const {
    inputId,
    resultsId,
    minLength = 2,
    debounceMs = 300,
    searchFn,
    renderResult
  } = options;
  
  const input = document.getElementById(inputId);
  const resultsContainer = document.getElementById(resultsId);
  
  // Private state
  let timeoutId = null;
  let abortController = null;
  let lastQuery = '';
  let isSearching = false;
  let results = [];
  
  // Private: cancel pending operations
  const cancelPending = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
    if (abortController) {
      abortController.abort();
      abortController = null;
    }
  };
  
  // Private: perform search
  const performSearch = async (query) => {
    cancelPending();
    
    if (query === lastQuery) return;
    lastQuery = query;
    
    isSearching = true;
    resultsContainer.innerHTML = '<div class="loading">Searching...</div>';
    
    // Create new abort controller for this request
    abortController = new AbortController();
    
    try {
      results = await searchFn(query, abortController.signal);
      
      // Render results
      if (results.length === 0) {
        resultsContainer.innerHTML = '<div class="no-results">No results found</div>';
      } else {
        resultsContainer.innerHTML = results
          .map(renderResult)
          .join('');
      }
    } catch (error) {
      if (error.name === 'AbortError') {
        // Request was cancelled, ignore
        return;
      }
      resultsContainer.innerHTML = '<div class="error">Search failed</div>';
    } finally {
      isSearching = false;
      abortController = null;
    }
  };
  
  // Event handler (closure over all state)
  const handleInput = (event) => {
    const query = event.target.value.trim();
    
    cancelPending();
    
    if (query.length < minLength) {
      resultsContainer.innerHTML = '';
      lastQuery = '';
      results = [];
      return;
    }
    
    // Debounce
    timeoutId = setTimeout(() => {
      performSearch(query);
    }, debounceMs);
  };
  
  // Initialize
  input.addEventListener('input', handleInput);
  
  // Public API
  return {
    clear: () => {
      cancelPending();
      input.value = '';
      resultsContainer.innerHTML = '';
      lastQuery = '';
      results = [];
    },
    getResults: () => [...results],
    isSearching: () => isSearching,
    search: (query) => {
      input.value = query;
      return performSearch(query);
    },
    destroy: () => {
      cancelPending();
      input.removeEventListener('input', handleInput);
      resultsContainer.innerHTML = '';
    }
  };
}

// Usage
const productSearch = createDebouncedSearch({
  inputId: 'product-search',
  resultsId: 'product-results',
  minLength: 2,
  debounceMs: 300,
  
  // Search function with abort signal support
  searchFn: async (query, signal) => {
    const response = await fetch(
      `/api/products?q=${encodeURIComponent(query)}`,
      { signal }
    );
    return response.json();
  },
  
  // Render function for each result
  renderResult: (product) => `
    <div class="result" data-id="${product.id}">
      <strong>${product.name}</strong>
      <span>$${product.price}</span>
    </div>
  `
});

// Programmatic search
await productSearch.search('laptop');

// Cleanup
productSearch.destroy();

// Improvements:
// ✓ Debounce logic separated
// ✓ AbortController cancels stale requests (no race conditions)
// ✓ All state private in closure
// ✓ Configurable and reusable
// ✓ Clean public API
// ✓ Proper cleanup
```
