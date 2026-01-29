How do you refactor promise-based data loading with loading/error states?
?

```javascript
// ❌ BEFORE: Loading states scattered, duplicated logic

var isLoadingUsers = false;
var usersError = null;
var users = [];

var isLoadingPosts = false;
var postsError = null;
var posts = [];

async function loadUsers() {
  isLoadingUsers = true;
  usersError = null;
  document.getElementById('users-loading').style.display = 'block';
  document.getElementById('users-error').style.display = 'none';
  
  try {
    var response = await fetch('/api/users');
    users = await response.json();
    renderUsers();
  } catch (error) {
    usersError = error.message;
    document.getElementById('users-error').textContent = usersError;
    document.getElementById('users-error').style.display = 'block';
  } finally {
    isLoadingUsers = false;
    document.getElementById('users-loading').style.display = 'none';
  }
}

// Same pattern duplicated for posts, comments, etc...

// Problems:
// - State variables duplicated for each resource
// - Loading/error UI logic duplicated
// - Hard to show combined loading state
// - No caching or retry logic

// ────────────────────────────────────────────────────────────

// ✅ AFTER: Closure-based async data loader

function createAsyncLoader(options = {}) {
  const {
    onLoadingChange,
    onError,
    onSuccess,
    cacheTime = 0  // ms, 0 = no cache
  } = options;
  
  // Private state
  let isLoading = false;
  let error = null;
  let data = null;
  let lastFetchTime = 0;
  let currentPromise = null;
  
  const setLoading = (loading) => {
    isLoading = loading;
    if (onLoadingChange) onLoadingChange(loading);
  };
  
  const setError = (err) => {
    error = err;
    if (onError) onError(err);
  };
  
  const load = async (fetchFn, forceRefresh = false) => {
    // Return cached data if valid
    const now = Date.now();
    if (!forceRefresh && data && cacheTime && (now - lastFetchTime < cacheTime)) {
      return data;
    }
    
    // Deduplicate concurrent requests
    if (currentPromise) {
      return currentPromise;
    }
    
    setLoading(true);
    setError(null);
    
    currentPromise = (async () => {
      try {
        data = await fetchFn();
        lastFetchTime = Date.now();
        if (onSuccess) onSuccess(data);
        return data;
      } catch (err) {
        setError(err.message || 'Failed to load');
        throw err;
      } finally {
        setLoading(false);
        currentPromise = null;
      }
    })();
    
    return currentPromise;
  };
  
  return {
    load,
    refresh: (fetchFn) => load(fetchFn, true),
    getData: () => data,
    isLoading: () => isLoading,
    getError: () => error,
    clearCache: () => { data = null; lastFetchTime = 0; },
    clearError: () => { error = null; }
  };
}

// Create loader with UI bindings
function createUserLoader(containerId) {
  const container = document.getElementById(containerId);
  const loadingEl = container.querySelector('.loading');
  const errorEl = container.querySelector('.error');
  const listEl = container.querySelector('.list');
  
  const loader = createAsyncLoader({
    cacheTime: 60000,  // 1 minute cache
    
    onLoadingChange: (loading) => {
      loadingEl.style.display = loading ? 'block' : 'none';
    },
    
    onError: (error) => {
      errorEl.textContent = error;
      errorEl.style.display = 'block';
    },
    
    onSuccess: (users) => {
      errorEl.style.display = 'none';
      listEl.innerHTML = users.map(u => `<li>${u.name}</li>`).join('');
    }
  });
  
  const fetchUsers = () => fetch('/api/users').then(r => r.json());
  
  return {
    load: () => loader.load(fetchUsers),
    refresh: () => loader.refresh(fetchUsers),
    isLoading: loader.isLoading,
    getUsers: loader.getData
  };
}

// Usage
const userLoader = createUserLoader('users-container');

// Initial load (uses cache if available)
await userLoader.load();

// Force refresh
await userLoader.refresh();

// Check state
console.log(userLoader.isLoading());

// Improvements:
// ✓ Loading/error state encapsulated
// ✓ Automatic caching
// ✓ Deduplicates concurrent requests
// ✓ Reusable pattern for any async data
// ✓ UI bindings in one place
// ✓ Easy to add retry, polling, etc.
```
