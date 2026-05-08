Write a HOF that returns a function and extracts object propeties from a list of keys provided?


```javascript
const user = {
  id: 1,
  name: 'Alice',
  email: 'alice@example.com'
};

const { id, ...userInfo } = extractFields(user, 'id', 'name', 'email');

console.log({id, userInfo});
```


?


```javascript
function extractFields(obj, ...fields) {
  const result = {};
  fields.forEach(field => {
    if (obj[field] !== undefined) {
      result[field] = obj[field];
    }
  });
  return result;
}
```