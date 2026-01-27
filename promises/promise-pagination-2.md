How do you implement infinite scroll with async pagination?
?

```javascript
// Infinite scroll: load next page when user scrolls to bottom
let currentPage = 1;
let isLoading = false;
let hasMore = true;

async function loadNextPage() {
  if (isLoading || !hasMore) return;
  
  isLoading = true;
  showLoadingIndicator();
  
  try {
    const response = await fetch(`/api/items?page=${currentPage}&limit=20`);
    const data = await response.json();
    
    // Append items to list
    data.items.forEach(function(item) {
      appendItemToDOM(item);
    });
    
    // Update state
    hasMore = data.hasMore;
    currentPage++;
  } catch (error) {
    console.error('Error loading page:', error);
    showErrorMessage('Failed to load more items');
  } finally {
    isLoading = false;
    hideLoadingIndicator();
  }
}

// Detect scroll to bottom
window.addEventListener('scroll', function() {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
    loadNextPage(); // Load next page when near bottom
  }
});

// Load first page on mount
loadNextPage();
```
