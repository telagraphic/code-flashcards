How do you use bind() to create a function with preset arguments (partial application)?
?

```javascript
// Function that takes multiple parameters
function createURL(baseURL, endpoint, userId) {
  return `${baseURL}/${endpoint}/${userId}`;
}

// Bind preset arguments
const apiBase = 'https://api.example.com';
const getUserURL = createURL.bind(null, apiBase, 'users');

// Now getUserURL only needs userId
const user1URL = getUserURL(123); // 'https://api.example.com/users/123'
const user2URL = getUserURL(456); // 'https://api.example.com/users/456'

// Practical example: API helper
const fetchUser = fetch.bind(null, getUserURL(123));
fetchUser()
  .then(response => response.json())
  .then(data => console.log(data));
```
