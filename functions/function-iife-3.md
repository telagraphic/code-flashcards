How do you use an IIFE with parameters to create a configuration module?
?

```javascript
// IIFE with parameters
const AppConfig = (function(apiURL, environment) {
  // Private configuration
  const config = {
    apiURL: apiURL,
    environment: environment,
    debug: environment === 'development'
  };
  
  // Public API
  return {
    getApiURL: function() {
      return config.apiURL;
    },
    isDebug: function() {
      return config.debug;
    },
    getEnvironment: function() {
      return config.environment;
    }
  };
})('https://api.example.com', 'production');

// Usage
console.log(AppConfig.getApiURL()); // 'https://api.example.com'
console.log(AppConfig.isDebug()); // false
console.log(AppConfig.getEnvironment()); // 'production'
```
