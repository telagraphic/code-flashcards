How do you use destructuring with default values and fallback patterns?
?

```javascript
// Complex default value patterns
function processUser({
  name = 'Anonymous',
  age = 0,
  email = 'no-email@example.com',
  preferences: {
    theme = 'light',
    notifications = false
  } = {}
} = {}) {
  return {
    name,
    age,
    email,
    theme,
    notifications
  };
}

// Formatted
// Line 14, } = {}), is the default value for the entire function parameter.

// What line 14 does
// Your function parameter is an object destructuring pattern:

// The function expects its first argument to be an object (like { name, age, preferences }).
// = {} on line 14 means: if the caller passes undefined (or passes nothing), use an empty object instead so destructuring won’t crash.
// So these are safe and use defaults:

// processUser() (no argument → undefined → replaced with {})
// processUser(undefined) (explicit undefined → replaced with {})
// But this would still crash:

// processUser(null) because the default only applies to undefined, and you can’t destructure null.


function processUser(
  {
    name = "Anonymous",
    age = 0,
    email = "no-email@example.com",
    preferences: {
      theme = "light",
      notifications = false,
    } = {},
  } = {}
) {
  return { name, age, email, theme, notifications };
}

// Refactored

function processUser(user = {}) {
  const {
    name = "Anonymous",
    age = 0,
    email = "no-email@example.com",
    preferences = {},
  } = user;

  const { theme = "light", notifications = false } = preferences;

  return { name, age, email, theme, notifications };
}




// Works with empty object
processUser(); // All defaults used

// Works with partial data
processUser({ name: 'Alice' }); // name: 'Alice', others default

// Practical: Configuration with defaults
function createConfig({
  apiUrl = 'https://api.example.com',
  timeout = 5000,
  retries = 3,
  headers = {}
} = {}) {
  return {
    apiUrl,
    timeout,
    retries,
    headers
  };
}

const config = createConfig({ timeout: 10000 });
console.log(config); // { apiUrl: 'https://api.example.com', timeout: 10000, ... }

// Destructuring with null/undefined handling
const user = null;
const { name = 'Guest' } = user || {};
console.log(name); // 'Guest'

// Practical: Safe destructuring
function safeDestructure(obj) {
  const {
    nested: {
      deep: {
        value = 'default'
      } = {}
    } = {}
  } = obj || {};
  return value;
}

safeDestructure(null); // 'default'
safeDestructure({}); // 'default'
safeDestructure({ nested: { deep: { value: 'actual' } } }); // 'actual'
```
