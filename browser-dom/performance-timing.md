How do you measure browser performance timing?
?

```javascript
// Performance Timing API: Measure page load and rendering performance

// Navigation Timing
const perfData = performance.timing;

// Key timestamps:
const navigationStart = perfData.navigationStart;
const domLoading = perfData.domLoading;
const domInteractive = perfData.domInteractive;
const domContentLoaded = perfData.domContentLoadedEventEnd;
const loadComplete = perfData.loadEventEnd;

// Calculate metrics
const domReadyTime = domContentLoaded - navigationStart;
const pageLoadTime = loadComplete - navigationStart;
const domParseTime = domInteractive - domLoading;

console.log(`DOM ready: ${domReadyTime}ms`);
console.log(`Page load: ${pageLoadTime}ms`);

// Performance Navigation API
const navType = performance.navigation.type;
// 0: TYPE_NAVIGATE (normal navigation)
// 1: TYPE_RELOAD (reload)
// 2: TYPE_BACK_FORWARD (back/forward)
// 255: TYPE_RESERVED (other)

// Performance Paint API
const paintTimings = performance.getEntriesByType('paint');
paintTimings.forEach(entry => {
  console.log(`${entry.name}: ${entry.startTime}ms`);
  // first-paint: First pixel painted
  // first-contentful-paint: First content painted
});

// Practical: Measure critical rendering path
function measureCRP() {
  const perfData = performance.timing;
  
  return {
    dns: perfData.domainLookupEnd - perfData.domainLookupStart,
    connect: perfData.connectEnd - perfData.connectStart,
    request: perfData.responseStart - perfData.requestStart,
    response: perfData.responseEnd - perfData.responseStart,
    dom: perfData.domInteractive - perfData.domLoading,
    load: perfData.loadEventEnd - perfData.navigationStart
  };
}

// Performance Observer (modern API)
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    console.log(`${entry.name}: ${entry.duration}ms`);
  }
});

observer.observe({ entryTypes: ['measure', 'navigation', 'paint']});

// Practical: Measure custom operations
performance.mark('operation-start');
// ... do work ...
performance.mark('operation-end');
performance.measure('operation', 'operation-start', 'operation-end');
const measure = performance.getEntriesByName('operation')[0];
console.log(`Operation took: ${measure.duration}ms`);
```
