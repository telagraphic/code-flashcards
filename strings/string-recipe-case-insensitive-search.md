How do you do case-insensitive search or filter using string methods?
?

```javascript
// Recipe: toLowerCase on both sides + includes (or indexOf !== -1, or startsWith/endsWith)

const items = ['React', 'Vue', 'Svelte', 'ANGULAR'];
const query = 'react';

// Filter: normalize both then includes
const filtered = items.filter(item => item.toLowerCase().includes(query.toLowerCase()));
console.log(filtered); // ['React']

// Check if string contains substring (case-insensitive)
function containsIgnoreCase(str, search) {
  return str.toLowerCase().includes(search.toLowerCase());
}

// Prefix/suffix checks
function startsWithIgnoreCase(str, prefix) {
  return str.toLowerCase().startsWith(prefix.toLowerCase());
}
function endsWithIgnoreCase(str, suffix) {
  return str.toLowerCase().endsWith(suffix.toLowerCase());
}

// Practical: Search UI, tags, labels
const match = labels.find(l => l.toLowerCase().includes(userInput.trim().toLowerCase()));
```
