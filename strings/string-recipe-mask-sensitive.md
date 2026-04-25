How do you mask sensitive data (e.g. show last 4 chars) using string methods?
?

```javascript
// Recipe: slice(-4) for visible part + repeat('*') for mask length

function maskLastFour(value, visibleCount = 4) {
  if (value.length <= visibleCount) return value;
  const visible = value.slice(-visibleCount);
  const maskLength = value.length - visibleCount;
  return '*'.repeat(maskLength) + visible;
}

console.log(maskLastFour('1234567890123456')); // '************3456'
console.log(maskLastFour('secret', 2));       // '****et'

// Full mask except first and last character
function maskMiddle(str, char = '*') {
  if (str.length <= 2) return str;
  return str.charAt(0) + char.repeat(str.length - 2) + str.at(-1);
}

console.log(maskMiddle('email@example.com')); // 'e***************m'

// Practical: Card number, SSN, API key in UI
const displayKey = maskLastFour(apiKey, 6);
```
