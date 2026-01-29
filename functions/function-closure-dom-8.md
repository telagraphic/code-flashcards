How do you use closures for lazy loading images with intersection observer?
?

```javascript
// ❌ WRONG WAY - common mistakes with lazy loading

// Problem 1: No tracking of loaded images — loads same image multiple times!
function createLazyLoaderBad1() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;  // No check if already loaded!
        // If user scrolls up and down, this triggers AGAIN
        // Network request fires multiple times for same image
      }
    });
  });
  
  return {
    observe: (selector) => {
      document.querySelectorAll(selector).forEach(img => {
        observer.observe(img);
      });
    }
    // No destroy method — observer runs forever!
  };
}

// Problem 2: Creating a NEW observer for EACH image
function createLazyLoaderBad2(selector) {
  document.querySelectorAll(selector).forEach(img => {
    // Bad: One observer per image!
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.src = entry.target.dataset.src;
        }
      });
    });
    observer.observe(img);
    // Problems:
    // - 100 images = 100 observers (memory!)
    // - No references saved — can't disconnect any of them
    // - No way to clean up — memory leak
  });
}

// Problem 3: Global observer without cleanup capability
let globalObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.src = entry.target.dataset.src;
    }
  });
});

function lazyLoadBad3(selector) {
  document.querySelectorAll(selector).forEach(img => {
    globalObserver.observe(img);
  });
  // Problems:
  // - globalObserver is shared across entire app
  // - If component unmounts, observer keeps watching removed elements
  // - No way to reset or create fresh instance
  // - Can't have different options for different sections
}

// Problem 4: Not unobserving after load — observer keeps firing
function createLazyLoaderBad4() {
  const loadedImages = new Set();
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (!loadedImages.has(img)) {
          img.src = img.dataset.src;
          loadedImages.add(img);
        }
        // Forgot to unobserve! Observer callback keeps firing
        // on every scroll even though image is already loaded
      }
    });
  });
  
  return {
    observe: (selector) => {
      document.querySelectorAll(selector).forEach(img => {
        observer.observe(img);
      });
    }
  };
}

// Problem 5: Not handling errors — broken images stay invisible
function createLazyLoaderBad5() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        observer.unobserve(img);
        // No error handling!
        // If image fails to load, user sees nothing
        // No way to retry or show placeholder
      }
    });
  });
  
  return { observe: (sel) => document.querySelectorAll(sel).forEach(i => observer.observe(i)) };
}

// ────────────────────────────────────────────────────────────
// WHY these patterns fail:
// ────────────────────────────────────────────────────────────
//
// Problem 1 (No tracking):
//   Observer fires every time element enters viewport
//   Without tracking, you re-request images on scroll
//   Wastes bandwidth, causes flicker
//
// Problem 2 (Observer per image):
//   IntersectionObserver is designed to watch MANY elements
//   One observer can handle hundreds of images efficiently
//   Creating one per image defeats the purpose
//
// Problem 3 (Global with no cleanup):
//   Components should own their observers
//   Global state = no way to reset, test, or clean up
//   Memory leaks when DOM elements are removed
//
// Problem 4 (Not unobserving):
//   observer.unobserve(element) stops watching that element
//   Without it, callback fires on every visibility change
//   Performance degrades as you scroll
//
// Problem 5 (No error handling):
//   Network can fail, URLs can be wrong
//   Always handle img.onerror for fallback/retry
//
// Best practices:
//   ✓ ONE observer for multiple elements
//   ✓ Track loaded state (Set or WeakSet)
//   ✓ unobserve() after successful load
//   ✓ Handle both onload and onerror
//   ✓ Provide destroy() for cleanup
//   ✓ Use closure to encapsulate all state
// ────────────────────────────────────────────────────────────

// ✅ CORRECT WAY - closure manages observer and loading state

function createLazyLoader(options = {}) {
  const { rootMargin = '100px', threshold = 0.1, onLoad } = options;
  
  // Private state
  const loadedImages = new Set();  // Track loaded images
  let observer = null;
  
  const handleIntersect = function(entries) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      
      const img = entry.target;
      const src = img.dataset.src;
      
      if (!src || loadedImages.has(img)) return;
      
      // Load the image (closure over loadedImages, observer, onLoad)
      img.src = src;
      img.onload = () => {
        img.classList.add('loaded');
        loadedImages.add(img);
        if (onLoad) onLoad(img);
      };
      img.onerror = () => {
        img.classList.add('error');
      };
      
      // Stop observing this image
      observer.unobserve(img);
    });
  };
  
  // Create observer (closure over handleIntersect)
  observer = new IntersectionObserver(handleIntersect, {
    rootMargin,
    threshold
  });
  
  return {
    observe: (selector) => {
      const images = document.querySelectorAll(selector);
      images.forEach(img => {
        if (!loadedImages.has(img)) {
          observer.observe(img);
        }
      });
    },
    
    // Manually trigger load (bypass observer)
    loadNow: (img) => {
      if (loadedImages.has(img)) return;
      const src = img.dataset.src;
      if (src) {
        img.src = src;
        loadedImages.add(img);
      }
    },
    
    getLoadedCount: () => loadedImages.size,
    
    destroy: () => {
      if (observer) {
        observer.disconnect();
        observer = null;
      }
      loadedImages.clear();
    }
  };
}

// Usage
const lazyLoader = createLazyLoader({
  rootMargin: '200px',
  onLoad: (img) => console.log('Loaded:', img.src)
});

// Observe all images with data-src attribute
lazyLoader.observe('img[data-src]');

// When adding new images dynamically
document.getElementById('load-more').addEventListener('click', () => {
  // After adding new images to DOM...
  lazyLoader.observe('img[data-src]');  // Observe new ones too
});

// Cleanup
lazyLoader.destroy();
```
