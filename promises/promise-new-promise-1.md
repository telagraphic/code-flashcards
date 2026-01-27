How do you create a custom Promise for wrapping callback-based APIs?
?

```javascript
// Wrap callback-based API in a Promise
function loadImage(src) {
  return new Promise(function(resolve, reject) {
    const img = new Image();
    
    img.onload = function() {
      resolve(img); // Success: image loaded
    };
    
    img.onerror = function() {
      reject(new Error(`Failed to load image: ${src}`)); // Error: load failed
    };
    
    img.src = src; // Start loading
  });
}

// Usage in modern web app
loadImage('/images/logo.png')
  .then(function(image) {
    document.body.appendChild(image);
  })
  .catch(function(error) {
    console.error('Image load error:', error);
    showPlaceholderImage();
  });
```
