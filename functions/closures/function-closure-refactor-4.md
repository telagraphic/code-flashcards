How do you refactor scattered fetch calls into a closure-based API service?
?

```javascript
// ❌ BEFORE: Fetch calls scattered throughout codebase

// In userProfile.js
async function loadUserProfile() {
  try {
    const response = await fetch('/api/users/me', {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) throw new Error('Failed');
    const data = await response.json();
    document.getElementById('username').textContent = data.name;
  } catch (error) {
    console.error(error);
    alert('Failed to load profile');
  }
}

// In orders.js (duplicated headers, error handling)
async function loadOrders() {
  try {
    const response = await fetch('/api/orders', {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) throw new Error('Failed');
    const data = await response.json();
    // render orders...
  } catch (error) {
    console.error(error);
    alert('Failed to load orders');
  }
}

// Problems:
// - Headers duplicated everywhere
// - Error handling duplicated
// - Token retrieval duplicated
// - Hard to add loading states, caching, retries
// - No central place to handle auth expiry

// ────────────────────────────────────────────────────────────

// ✅ AFTER: Closure-based API service

function createApiClient(baseUrl) {
  // Private state
  let authToken = null;
  const cache = new Map();
  let onUnauthorized = null;
  
  // Private: get headers
  const getHeaders = () => ({
    'Content-Type': 'application/json',
    ...(authToken && { 'Authorization': `Bearer ${authToken}` })
  });
  
  // Private: handle response
  const handleResponse = async (response) => {
    if (response.status === 401) {
      authToken = null;
      if (onUnauthorized) onUnauthorized();
      throw new Error('Unauthorized');
    }
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || `HTTP ${response.status}`);
    }
    
    return response.json();
  };
  
  // Private: make request
  const request = async (method, endpoint, body = null, options = {}) => {
    const url = `${baseUrl}${endpoint}`;
    
    // Check cache for GET requests
    if (method === 'GET' && options.cache && cache.has(url)) {
      return cache.get(url);
    }
    
    const response = await fetch(url, {
      method,
      headers: getHeaders(),
      ...(body && { body: JSON.stringify(body) })
    });
    
    const data = await handleResponse(response);
    
    // Cache GET responses
    if (method === 'GET' && options.cache) {
      cache.set(url, data);
    }
    
    return data;
  };
  
  // Public API
  return {
    setToken: (token) => { authToken = token; },
    clearToken: () => { authToken = null; },
    onUnauthorized: (callback) => { onUnauthorized = callback; },
    clearCache: () => { cache.clear(); },
    
    get: (endpoint, options) => request('GET', endpoint, null, options),
    post: (endpoint, body) => request('POST', endpoint, body),
    put: (endpoint, body) => request('PUT', endpoint, body),
    delete: (endpoint) => request('DELETE', endpoint)
  };
}

// Create singleton instance
const api = createApiClient('https://api.example.com');

// Setup
api.setToken(localStorage.getItem('token'));
api.onUnauthorized(() => {
  window.location.href = '/login';
});

// Usage — clean, consistent, DRY
async function loadUserProfile() {
  try {
    const user = await api.get('/users/me', { cache: true });
    document.getElementById('username').textContent = user.name;
  } catch (error) {
    showError('Failed to load profile');
  }
}

async function loadOrders() {
  try {
    const orders = await api.get('/orders');
    renderOrders(orders);
  } catch (error) {
    showError('Failed to load orders');
  }
}

// Improvements:
// ✓ Headers in one place
// ✓ Auth handling centralized
// ✓ Caching built in
// ✓ Unauthorized handling in one place
// ✓ Easy to add retries, logging, etc.
// ✓ Private state (token, cache)
```
