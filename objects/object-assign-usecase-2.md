How do you use Object.assign() for state management and updates?
?

```javascript
// Object.assign() for state management

// Practical: Immutable state updates
class StateManager {
  constructor(initialState) {
    this.state = initialState;
  }
  
  update(updates) {
    // Create new state object (immutable update)
    this.state = Object.assign({}, this.state, updates);
    return this.state;
  }
  
  getState() {
    return this.state;
  }
}

const manager = new StateManager({ count: 0, name: 'App' });
manager.update({ count: 1 });
manager.update({ name: 'Updated App' });
// State is updated immutably

// Practical: Redux-like reducer pattern
function reducer(state, action) {
  switch (action.type) {
    case 'UPDATE_USER':
      return Object.assign({}, state, {
        user: Object.assign({}, state.user, action.payload)
      });
    case 'SET_LOADING':
      return Object.assign({}, state, { loading: action.payload });
    default:
      return state;
  }
}

// Practical: Merge state from multiple sources
function mergeState(currentState, newState) {
  return Object.assign({}, currentState, newState);
}

// Practical: Partial state updates
function updateNestedState(state, path, value) {
  const keys = path.split('.');
  const newState = Object.assign({}, state);
  let current = newState;
  
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    current[key] = Object.assign({}, current[key] || {});
    current = current[key];
  }
  
  current[keys[keys.length - 1]] = value;
  return newState;
}

const state = { user: { name: 'Alice', settings: { theme: 'light' } } };
const updated = updateNestedState(state, 'user.settings.theme', 'dark');

// Practical: Combine API responses
async function combineApiData(endpoints) {
  const responses = await Promise.all(
    endpoints.map(url => fetch(url).then(r => r.json()))
  );
  
  return Object.assign({}, ...responses);
}

// Practical: Merge user preferences with defaults
function mergePreferences(userPrefs, defaultPrefs) {
  const merged = Object.assign({}, defaultPrefs);
  
  // Deep merge for nested objects
  for (const key in userPrefs) {
    if (typeof userPrefs[key] === 'object' && 
        userPrefs[key] !== null &&
        typeof merged[key] === 'object' &&
        merged[key] !== null) {
      merged[key] = Object.assign({}, merged[key], userPrefs[key]);
    } else {
      merged[key] = userPrefs[key];
    }
  }
  
  return merged;
}
```
