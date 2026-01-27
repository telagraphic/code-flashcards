How do you use for...in for configuration and settings management?
?

```javascript
// for...in for configuration management

// Practical: Merge configuration objects
function mergeConfig(defaultConfig, userConfig) {
  const merged = { ...defaultConfig };
  
  for (const key in userConfig) {
    if (userConfig.hasOwnProperty(key)) {
      if (typeof userConfig[key] === 'object' && 
          !Array.isArray(userConfig[key]) &&
          userConfig[key] !== null &&
          typeof merged[key] === 'object' &&
          !Array.isArray(merged[key])) {
        // Deep merge nested objects
        merged[key] = mergeConfig(merged[key], userConfig[key]);
      } else {
        // Override with user config
        merged[key] = userConfig[key];
      }
    }
  }
  
  return merged;
}

// Usage
const defaults = {
  api: { url: 'https://api.example.com', timeout: 5000 },
  ui: { theme: 'light' }
};
const user = { api: { timeout: 10000 } };
const config = mergeConfig(defaults, user);

// Practical: Form data serialization
function serializeForm(form) {
  const data = {};
  const formData = new FormData(form);
  
  for (const key in formData) {
    if (formData.hasOwnProperty(key)) {
      data[key] = formData.get(key);
    }
  }
  
  return data;
}

// Practical: API response normalization
function normalizeApiResponse(response) {
  const normalized = {};
  
  for (const key in response) {
    if (response.hasOwnProperty(key)) {
      // Convert snake_case to camelCase
      const camelKey = key.replace(/_([a-z])/g, (_, letter) => 
        letter.toUpperCase()
      );
      normalized[camelKey] = response[key];
    }
  }
  
  return normalized;
}

// Practical: Feature flags checking
function checkFeatureFlags(user, flags) {
  const enabled = [];
  
  for (const flag in flags) {
    if (flags.hasOwnProperty(flag)) {
      if (flags[flag] && user.permissions.includes(flag)) {
        enabled.push(flag);
      }
    }
  }
  
  return enabled;
}

// Practical: State diff calculation
function calculateStateDiff(oldState, newState) {
  const diff = {};
  
  // Check for changes
  for (const key in newState) {
    if (newState.hasOwnProperty(key)) {
      if (oldState[key] !== newState[key]) {
        diff[key] = {
          old: oldState[key],
          new: newState[key]
        };
      }
    }
  }
  
  // Check for removed keys
  for (const key in oldState) {
    if (oldState.hasOwnProperty(key) && !(key in newState)) {
      diff[key] = {
        old: oldState[key],
        new: undefined
      };
    }
  }
  
  return diff;
}
```
