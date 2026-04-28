How do you use Promise.any() for tolerant API calls with multiple endpoints?
?

```javascript
// Promise.any() pattern for fault-tolerant API calls
async function getProductData(productId) {
  // Multiple endpoints that might have the same data
  const endpoints = [
    `/api/products/${productId}`,
    `/api/v2/products/${productId}`,
    `/api/cache/products/${productId}`
  ];
  
  const promises = endpoints.map(function(endpoint) {
    return fetch(endpoint)
      .then(function(response) {
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        return response.json();
      });
  });
  
  try {
    // Use first successful response
    const productData = await Promise.any(promises);
    return productData;
  } catch (error) {
    // All endpoints failed
    showErrorMessage('Product data unavailable');
    return null;
  }
}

// Tolerant: doesn't fail if some endpoints are down
// Fast: uses first successful response
// Resilient: works even if some services are unavailable
```
