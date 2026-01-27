How do you get window dimensions in the browser?
?

```javascript
// Window dimensions: Viewport size

// window.innerWidth / window.innerHeight
// Includes scrollbar, excludes browser chrome
const viewportWidth = window.innerWidth;
const viewportHeight = window.innerHeight;
console.log(`Viewport: ${viewportWidth}x${viewportHeight}`);

// window.outerWidth / window.outerHeight
// Includes browser chrome (toolbars, etc.)
const windowWidth = window.outerWidth;
const windowHeight = window.outerHeight;

// window.screen.width / window.screen.height
// Physical screen dimensions
const screenWidth = window.screen.width;
const screenHeight = window.screen.height;

// Practical: Responsive layout
function handleResize() {
  const width = window.innerWidth;
  
  if (width < 768) {
    // Mobile layout
    document.body.classList.add('mobile');
  } else if (width < 1024) {
    // Tablet layout
    document.body.classList.add('tablet');
  } else {
    // Desktop layout
    document.body.classList.add('desktop');
  }
}

window.addEventListener('resize', handleResize);
handleResize(); // Initial call

// Practical: Fullscreen detection
function isFullscreen() {
  return window.innerWidth === window.screen.width &&
         window.innerHeight === window.screen.height;
}

// Practical: Orientation change
window.addEventListener('orientationchange', () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  console.log(`Orientation changed: ${width}x${height}`);
});

// Practical: Debounced resize handler
function debounceResize(callback, delay = 250) {
  let timeoutId;
  window.addEventListener('resize', () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(callback, delay);
  });
}

debounceResize(() => {
  console.log(`Resized to: ${window.innerWidth}x${window.innerHeight}`);
});
```
