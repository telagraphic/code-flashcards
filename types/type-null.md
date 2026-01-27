What is null in JavaScript and how is it used?
?

```javascript
// null: Primitive value representing intentional absence of value
// Explicitly assigned to indicate "no value" or "empty"

const emptyValue = null;

// null is a type and a value
console.log(typeof null); // 'object' (historical bug)
console.log(null === null); // true

// When null is used:
// 1. Explicitly set to indicate no value
let user = null; // No user logged in

// 2. API returns null for missing data
const response = await fetch('/api/user');
const data = await response.json();
const user = data.user || null; // null if user doesn't exist

// 3. Reset a variable
let cache = { data: 'value' };
cache = null; // Clear cache

// 4. DOM element not found
const element = document.getElementById('non-existent');
console.log(element); // null

// Practical: Null checks
function processUser(user) {
  if (user === null) {
    return 'No user found';
  }
  return `Hello, ${user.name}`;
}

// Practical: Optional chaining with null
const user = getUser();
const email = user?.email; // undefined if user is null

// Practical: Nullish coalescing
const value = someValue ?? 'default'; // Uses default if null or undefined

// Practical: Reset state
class Component {
  constructor() {
    this.data = null;
  }
  
  loadData() {
    this.data = fetchData();
  }
  
  clearData() {
    this.data = null; // Explicitly clear
  }
}

// Practical: API response handling
async function fetchUser(userId) {
  try {
    const response = await fetch(`/api/users/${userId}`);
    if (response.status === 404) {
      return null; // User not found
    }
    return await response.json();
  } catch (error) {
    return null; // Error occurred
  }
}

// null vs undefined:
// - null: Explicitly assigned, intentional absence
// - undefined: Not assigned, automatic default
```
