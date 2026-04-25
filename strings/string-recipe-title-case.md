How do you convert a string to title case using string methods?
?

```javascript
// Recipe: toLowerCase → split(' ') → map (charAt(0).toUpperCase() + slice(1)) → join(' ')

function toTitleCase(str) {
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

console.log(toTitleCase('hello world')); // 'Hello World'

// With trim for messy input
function toTitleCaseTrimmed(str) {
  return str
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Single sentence: capitalize first letter only
function capitalizeFirst(str) {
  if (!str.length) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
```
