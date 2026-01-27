How do you use has() for conditional logic and validation?
?

```javascript
// has() useful for conditional operations
const activeUsers = new Map();
activeUsers.set('alice', { lastSeen: Date.now() });
activeUsers.set('bob', { lastSeen: Date.now() - 1000 });

// Conditional logic based on existence
function updateUserActivity(userId) {
  if (activeUsers.has(userId)) {
    // Update existing
    const user = activeUsers.get(userId);
    user.lastSeen = Date.now();
    activeUsers.set(userId, user);
  } else {
    // Add new
    activeUsers.set(userId, { lastSeen: Date.now() });
  }
}

// Practical: Form validation
const requiredFields = new Map([
  ['email', true],
  ['password', true],
  ['username', true]
]);

function validateForm(formData) {
  const errors = [];
  
  for (const [field, isRequired] of requiredFields) {
    if (isRequired && !formData.has(field)) {
      errors.push(`${field} is required`);
    }
  }
  
  return errors;
}

// Practical: Feature detection
const supportedFeatures = new Map([
  ['localStorage', typeof Storage !== 'undefined'],
  ['geolocation', 'geolocation' in navigator],
  ['webgl', !!document.createElement('canvas').getContext('webgl')]
]);

function isFeatureSupported(feature) {
  return supportedFeatures.has(feature) && supportedFeatures.get(feature);
}
```
