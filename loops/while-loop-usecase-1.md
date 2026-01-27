How do you use while loops for polling and waiting?
?

```javascript
// while loops for polling and waiting

// Practical: Poll API until data is ready
async function pollUntilReady(endpoint, maxAttempts = 10) {
  let attempts = 0;
  let data = null;
  
  while (attempts < maxAttempts && !data) {
    try {
      const response = await fetch(endpoint);
      const result = await response.json();
      
      if (result.status === 'ready') {
        data = result.data;
      } else {
        attempts++;
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    } catch (error) {
      attempts++;
      if (attempts >= maxAttempts) {
        throw new Error('Max attempts reached');
      }
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
  
  return data;
}

// Practical: Wait for DOM element to appear
function waitForElement(selector, timeout = 5000) {
  const startTime = Date.now();
  
  while (Date.now() - startTime < timeout) {
    const element = document.querySelector(selector);
    if (element) {
      return element;
    }
    // Small delay to avoid blocking
    const now = Date.now();
    if (now - startTime < timeout) {
      // Use requestAnimationFrame for non-blocking wait
      return new Promise(resolve => {
        const check = () => {
          const el = document.querySelector(selector);
          if (el) {
            resolve(el);
          } else if (Date.now() - startTime < timeout) {
            requestAnimationFrame(check);
          } else {
            resolve(null);
          }
        };
        check();
      });
    }
  }
  
  return null;
}

// Practical: Process items until condition met
function processUntilThreshold(items, threshold) {
  let total = 0;
  let index = 0;
  
  while (index < items.length && total < threshold) {
    total += items[index];
    index++;
  }
  
  return {
    processed: index,
    total,
    reachedThreshold: total >= threshold
  };
}

// Practical: Retry with exponential backoff
async function retryWithBackoff(operation, maxRetries = 5) {
  let attempt = 0;
  let lastError = null;
  
  while (attempt < maxRetries) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      attempt++;
      
      if (attempt < maxRetries) {
        const delay = Math.min(1000 * Math.pow(2, attempt), 30000);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  
  throw lastError;
}
```
