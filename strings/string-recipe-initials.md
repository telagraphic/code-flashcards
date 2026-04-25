How do you get initials from a full name using string methods?
?

```javascript
// Recipe: trim → split(' ') → map (charAt(0) or at(0)) → toUpperCase → join('')

function getInitials(name) {
  return name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map(part => part.charAt(0).toUpperCase())
    .join('');
}

console.log(getInitials('Alice Brown'));       // 'AB'
console.log(getInitials('  john   doe  '));    // 'JD'

// Max two initials (first + last)
function getInitialsMaxTwo(name) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '';
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  const first = parts[0].charAt(0);
  const last = parts.at(-1).charAt(0);
  return (first + last).toUpperCase();
}

console.log(getInitialsMaxTwo('Alice Bob Clark')); // 'AC'
```
