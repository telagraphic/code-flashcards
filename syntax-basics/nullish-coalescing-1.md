What is the nullish coalescing operator (??) and how does it work?
?

```javascript
// Nullish coalescing (??) returns right side only if left is null or undefined
// Different from || which returns right side for any falsy value

const value1 = null ?? 'default';
console.log(value1); // 'default'

const value2 = undefined ?? 'default';
console.log(value2); // 'default'

const value3 = 0 ?? 'default';
console.log(value3); // 0 (not 'default' - 0 is not nullish)

const value4 = '' ?? 'default';
console.log(value4); // '' (not 'default' - empty string is not nullish)

const value5 = false ?? 'default';
console.log(value5); // false (not 'default' - false is not nullish)

// Comparison with ||
const result1 = 0 || 'default'; // 'default' (0 is falsy)
const result2 = 0 ?? 'default'; // 0 (0 is not nullish)

// Practical: API response defaults
async function fetchUser(userId) {
  const response = await fetch(`/api/users/${userId}`);
  const user = await response.json();
  
  return {
    name: user.name ?? 'Anonymous',
    age: user.age ?? 0,
    email: user.email ?? 'no-email@example.com'
  };
}

// Practical: Configuration with nullish checks
const config = {
  timeout: null,
  retries: undefined,
  apiUrl: ''
};

const timeout = config.timeout ?? 5000; // 5000
const retries = config.retries ?? 3; // 3
const apiUrl = config.apiUrl ?? 'https://api.example.com'; // '' (empty string is not nullish)
```
