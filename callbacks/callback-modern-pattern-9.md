How do you use callbacks with the MutationObserver API?
?

```javascript
// MutationObserver uses callbacks to watch for DOM changes

// Callback executed when DOM mutations occur
const mutationCallback = function(mutations, observer) {
  mutations.forEach(function(mutation) {
    // Callback receives mutation details
    if (mutation.type === 'childList') {
      console.log('Children added or removed');
      updateUI(); // React to changes
    }
    
    if (mutation.type === 'attributes') {
      console.log('Attribute changed:', mutation.attributeName);
      handleAttributeChange(mutation.target, mutation.attributeName);
    }
  });
};

// Create observer with callback
const observer = new MutationObserver(mutationCallback);

// Observe specific element
const targetElement = document.getElementById('dynamic-content');

observer.observe(targetElement, {
  childList: true,      // Watch for child additions/removals
  attributes: true,     // Watch for attribute changes
  subtree: true         // Watch descendants too
});

// Practical: track form changes
const formObserver = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    if (mutation.type === 'attributes') {
      markFormAsChanged(); // Callback marks form as dirty
    }
  });
});

formObserver.observe(document.getElementById('myForm'), {
  attributes: true,
  attributeFilter: ['value', 'checked', 'selected']
});
```
