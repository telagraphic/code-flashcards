How do you use await with dynamic chaining for token-based authentication flows?
?

```javascript
// Dynamic chaining: use result from one step in next step
async function fetchProtectedData(endpoint) {
  try {
    // Step 1: Get authentication token
    const authResponse = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username: 'user', password: 'pass' })
    });
    const { token } = await authResponse.json();
    
    // Step 2: Use token to fetch protected data
    const dataResponse = await fetch(endpoint, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!dataResponse.ok) {
      throw new Error('Failed to fetch protected data');
    }
    
    const data = await dataResponse.json();
    return data;
  } catch (error) {
    console.error('Authentication flow error:', error);
    throw error;
  }
}

// Each step depends on the previous step's result
// await ensures proper sequencing
```
