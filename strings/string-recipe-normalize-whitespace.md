How do you normalize whitespace (collapse spaces, trim) using string methods?
?

```javascript
// Recipe: trim → split(/\s+/) → join(' ')

function normalizeWhitespace(str) {
  return str.trim().split(/\s+/).filter(Boolean).join(' ');
}

console.log(normalizeWhitespace('  hello   world  \n  js  ')); // 'hello world js'

// Trim only (no collapse)
const trimmed = userInput.trim();

// Collapse internal spaces but keep single space
function singleSpaces(str) {
  return str.trim().replace(/\s+/g, ' ');
}

// Practical: Form input before save or search
const searchQuery = searchInput.value.trim().replace(/\s+/g, ' ');
```
