How do you extract a Bearer token from an Authorization header using string methods?
?

```javascript
// Recipe: startsWith('Bearer ') → slice(7) or indexOf + slice

function getBearerToken(header) {
  if (!header || !header.startsWith('Bearer ')) return null;
  return header.slice(7).trim();
}

console.log(getBearerToken('Bearer abc123'));     // 'abc123'
console.log(getBearerToken('Bearer  '));          // ''
console.log(getBearerToken('Basic xyz'));         // null

// Alternative: indexOf + slice (no startsWith)
function getBearerTokenAlt(header) {
  const prefix = 'Bearer ';
  const i = header?.indexOf(prefix);
  return i === 0 ? header.slice(prefix.length).trim() : null;
}

// Practical: Use with fetch / API client
const token = getBearerToken(request.headers.get('Authorization'));
if (token) { /* attach to next request */ }
```
