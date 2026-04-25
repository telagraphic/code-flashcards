How do you truncate text with an ellipsis using string methods?
?

```javascript
// Recipe: length check → slice (start, maxLength) → concat '...'

function truncate(text, maxLength) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + '...';
}

console.log(truncate('Hello World', 8));   // 'Hello...'
console.log(truncate('Hi', 10));           // 'Hi'

// Truncate at word boundary (slice + lastIndexOf)
function truncateAtWord(text, maxLength) {
  if (text.length <= maxLength) return text;
  const cut = text.slice(0, maxLength - 3);
  const lastSpace = cut.lastIndexOf(' ');
  const end = lastSpace > 0 ? lastSpace : cut.length;
  return cut.slice(0, end) + '...';
}

console.log(truncateAtWord('The quick brown fox', 14)); // 'The quick...'
```
