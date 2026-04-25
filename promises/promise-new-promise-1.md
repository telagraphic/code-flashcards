How do you create a custom Promise for wrapping callback-based APIs?
?

```javascript
// Wrap callback-based API in a Promise

const imageUrl = "https://placehold.co/600x400.png";

function loadImage(src) {
  return new Promise(function(resolve, reject) {
    const img = new Image();
    
    img.onload = function() {
      resolve(img); // Success: image loaded
    };
    
    img.onerror = function(event) {
      reject(new Error(`Failed to load image: ${src}`)); // Error: load failed
    };
    
    // Optional: if you later draw the image onto a <canvas>, you typically need this
    // (and the server must send the right CORS headers).
    // img.crossOrigin = "anonymous";

    img.src = src; // Start loading
  });
}

// Usage in modern web app
loadImage(imageUrl)
  .then(function(image) {
    document.body.appendChild(image);
  })
  .catch(function(error) {
    console.error('Image load error:', error);
    // Fallback UI (example)
    const fallback = document.createElement("div");
    fallback.textContent = "Image failed to load.";
    document.body.appendChild(fallback);
  });
```
