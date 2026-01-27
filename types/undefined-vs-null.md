What are the differences between undefined and null?
?

```javascript
// undefined vs null: Key differences

// 1. ASSIGNMENT
// undefined: Automatically assigned, not explicitly set
let x;
console.log(x); // undefined (automatic)

// null: Explicitly assigned
let y = null;
console.log(y); // null (intentional)

// 2. TYPE CHECKING
console.log(typeof undefined); // 'undefined'
console.log(typeof null);      // 'object' (historical bug!)

// Correct null check
if (value === null) { } // Use ===, not typeof

// 3. EQUALITY COMPARISON
console.log(undefined == null);  // true (loose equality)
console.log(undefined === null); // false (strict equality)

// 4. JSON SERIALIZATION
JSON.stringify({ a: undefined, b: null });
// '{"b":null}' - undefined is omitted, null is included

// 5. DEFAULT PARAMETERS
function test(a = 'default') {
  return a;
}
test(undefined); // 'default' (uses default)
test(null);      // null (doesn't use default)

// 6. ARITHMETIC OPERATIONS
console.log(undefined + 1); // NaN
console.log(null + 1);      // 1 (null converts to 0)

// 7. PRACTICAL USE CASES

// undefined: Variable exists but not initialized
let userData; // undefined - not loaded yet
if (userData === undefined) {
  userData = fetchUserData();
}

// null: Explicitly set to indicate "no value"
let user = null; // null - no user logged in
if (user === null) {
  showLoginForm();
}

// 8. NULLISH COALESCING
const value1 = undefined ?? 'default'; // 'default'
const value2 = null ?? 'default';      // 'default'
const value3 = 0 ?? 'default';         // 0 (not nullish)

// 9. OPTIONAL CHAINING
const obj = null;
console.log(obj?.property); // undefined (safe access)
console.log(obj.property);  // TypeError

// 10. BEST PRACTICES
// Use undefined for: Uninitialized variables, missing properties
// Use null for: Explicitly empty values, API "not found" responses

// Practical: API response pattern
async function getUser(id) {
  const response = await fetch(`/api/users/${id}`);
  if (response.status === 404) {
    return null; // User doesn't exist (explicit)
  }
  if (!response.ok) {
    return undefined; // Error occurred (unexpected)
  }
  return await response.json();
}
```
