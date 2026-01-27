How do you implement async pagination for loading data page by page?
?

```javascript
// Async pagination: load pages sequentially
async function loadAllPages(baseUrl) {
  let page = 1;
  let hasMore = true;
  const allItems = [];
  
  while (hasMore) {
    try {
      // Fetch current page
      const response = await fetch(`${baseUrl}?page=${page}&limit=20`);
      const data = await response.json();
      
      // Add items to collection
      allItems.push(...data.items);
      
      // Update pagination state
      hasMore = data.hasMore;
      page++;
      
      // Update UI with current progress
      updateProgress(`Loaded ${allItems.length} items`);
    } catch (error) {
      console.error(`Error loading page ${page}:`, error);
      break; // Stop on error
    }
  }
  
  return allItems;
}

// Usage: Load all user posts
loadAllPages('/api/posts')
  .then(function(allPosts) {
    renderPostList(allPosts);
  });

// Loads pages one at a time
// Can be interrupted or paused between pages
```
