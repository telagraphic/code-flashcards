What is String.prototype.at() and how does it work?
?

```javascript
// at(index): Returns character at index; supports negative indices (from end)
// ES2022. Negative index -1 is last character.

const str = 'Hello';
console.log(str.at(0));   // 'H'
console.log(str.at(-1));  // 'o' (last)
console.log(str.at(-2));  // 'l' (second to last)
console.log(str.at(10));  // undefined (out of range)

// Practical: Get last character without str[str.length - 1]
function lastChar(s) { return s.at(-1); }

// Practical: Form validation — check last character
function endsWithPunctuation(input) {
  const last = input.trim().at(-1);
  return last === '.' || last === '!' || last === '?';
}
```
