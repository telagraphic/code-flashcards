How do you use get() with object keys and provide default values?
?

```javascript
// get() works with any key type, including objects
const metadataMap = new Map();

const user1 = { id: 1 };
const user2 = { id: 2 };

// Store metadata using object keys
metadataMap.set(user1, { lastLogin: Date.now(), preferences: {} });
metadataMap.set(user2, { lastLogin: Date.now() - 86400000, preferences: {} });

// Retrieve using same object reference
const user1Meta = metadataMap.get(user1);
console.log(user1Meta.lastLogin);

// Default value pattern
function getConfig(key, defaultValue = null) {
  const config = new Map([
    ['theme', 'dark'],
    ['language', 'en']
  ]);
  
  return config.get(key) ?? defaultValue;
}

const theme = getConfig('theme', 'light'); // 'dark'
const fontSize = getConfig('fontSize', 16); // 16 (default)

// Practical: Feature flags
const featureFlags = new Map([
  ['newDashboard', true],
  ['darkMode', false]
]);

function isFeatureEnabled(feature) {
  return featureFlags.get(feature) ?? false; // Default to false
}

if (isFeatureEnabled('newDashboard')) {
  showNewDashboard();
}
```
