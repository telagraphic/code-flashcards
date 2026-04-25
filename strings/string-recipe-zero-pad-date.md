How do you zero-pad numbers for date or ID formatting using string methods?
?

```javascript
// Recipe: String(num) → padStart(2, '0')

function padTwo(n) {
  return String(n).padStart(2, '0');
}

const d = new Date();
const dateStr = `${d.getFullYear()}-${padTwo(d.getMonth() + 1)}-${padTwo(d.getDate())}`;
console.log(dateStr); // '2026-02-04'

// Time: HH:mm:ss
const timeStr = [d.getHours(), d.getMinutes(), d.getSeconds()]
  .map(padTwo)
  .join(':');

// ID with fixed width (e.g. 8 digits)
function toPaddedId(num, width = 8) {
  return String(num).padStart(width, '0');
}
console.log(toPaddedId(42)); // '00000042'

// padEnd for aligned labels in logs
const label = 'User:'.padEnd(10);
console.log(label + 'Alice'); // 'User:     Alice'
```
