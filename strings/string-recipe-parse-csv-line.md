How do you parse a CSV line into trimmed values using string methods?
?

```javascript
// Recipe: split(',') → map(trim) [or split then trim each]

function parseCSVLine(line) {
  return line.split(',').map(cell => cell.trim());
}

console.log(parseCSVLine('a, b ,  c')); // ['a', 'b', 'c']

// With limit (first N columns)
function parseCSVLineLimit(line, limit) {
  return line.split(',', limit).map(cell => cell.trim());
}

// Practical: Simple CSV without quoted commas
const row = parseCSVLine(csvLine);
const [name, email, role] = row;

// Combine with validation
function parseCSVLineStrict(line) {
  const values = line.trim().split(',').map(s => s.trim());
  return values.filter(Boolean);
}
```
