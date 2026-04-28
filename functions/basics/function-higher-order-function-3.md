How do you create a higher-order function for middleware pattern?
?

```javascript
// Higher-order function for middleware pattern
function createMiddleware(handler) {
  return function(req, res, next) {
    // Pre-processing
    console.log('Before handler:', req);
    
    // Execute handler
    const result = handler(req);
    
    // Post-processing
    console.log('After handler:', result);
    
    // Call next middleware if provided
    if (next) {
      next(result);
    }
    
    return result;
  };
}

// Usage
const authMiddleware = createMiddleware((req) => {
  if (!req.token) {
    throw new Error('Unauthorized');
  }
  return { ...req, user: getUser(req.token) };
});

const loggingMiddleware = createMiddleware((req) => {
  console.log('Request:', req);
  return req;
});

// Chain middleware
function processRequest(req) {
  const result1 = authMiddleware(req);
  const result2 = loggingMiddleware(result1);
  return result2;
}
```
