How do you use callbacks with the Intersection Observer API?
?

```javascript
// Intersection Observer uses callbacks to detect element visibility

// Observer callback executed when intersection changes
const observerCallback = function(entries, observer) {
  entries.forEach(function(entry) {
    // Callback receives intersection data
    if (entry.isIntersecting) {
      // Element is visible
      entry.target.classList.add('visible');
      console.log('Element entered viewport');
      
      // Load content when visible (lazy loading)
      loadContent(entry.target);
    } else {
      // Element left viewport
      entry.target.classList.remove('visible');
    }
  });
};

// Create observer with callback
const observer = new IntersectionObserver(observerCallback, {
  threshold: 0.5 // Trigger when 50% visible
});

// Observe elements
const elements = document.querySelectorAll('.lazy-load');
elements.forEach(function(element) {
  observer.observe(element);
});

// Practical: infinite scroll
const loadMoreCallback = function(entries) {
  if (entries[0].isIntersecting) {
    loadMoreContent(); // Callback loads more content
  }
};

const loadMoreObserver = new IntersectionObserver(loadMoreCallback);
loadMoreObserver.observe(document.getElementById('load-more-trigger'));
```
