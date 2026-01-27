How do you use nullish coalescing with optional chaining and function calls?
?

```javascript
// Combine nullish coalescing with optional chaining
const user = {
  profile: {
    name: 'Alice',
    settings: null
  }
};

// Safe property access with default
const theme = user.profile?.settings?.theme ?? 'light';
console.log(theme); // 'light' (settings is null)

// Practical: API response handling
async function getUserPreferences(userId) {
  const response = await fetch(`/api/users/${userId}/preferences`);
  const data = await response.json();
  
  return {
    theme: data?.theme ?? 'light',
    language: data?.language ?? 'en',
    notifications: data?.notifications?.enabled ?? true,
    email: data?.notifications?.email ?? false
  };
}

// Nullish coalescing with function calls
function getValue() {
  return null;
}

const result = getValue() ?? 'default';
console.log(result); // 'default'

// Practical: Form data with defaults
function processFormData(formData) {
  return {
    username: formData.username ?? 'guest',
    email: formData.email ?? '',
    age: formData.age ?? 0,
    preferences: formData.preferences ?? {}
  };
}

// Chaining nullish coalescing
const value = null ?? undefined ?? 'default';
console.log(value); // 'default'

// Practical: Environment variables with defaults
const apiUrl = process.env.API_URL ?? 'https://api.example.com';
const port = process.env.PORT ?? 3000;
const debug = process.env.DEBUG ?? false;
```
