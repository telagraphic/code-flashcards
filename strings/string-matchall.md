What is String.prototype.matchAll() and how does it work?
?

```javascript
// matchAll(regexp): Returns iterator of all match results (regexp must have g)
// Each result has groups, index, input.

const str = 'a1 b2 c3';
for (const m of str.matchAll(/\w(\d)/g)) {
  console.log(m[0], m[1], m.index); // a1 1 0, b2 2 4, c3 3 8
}

// Practical: Parse all capture groups (e.g. template placeholders, links)
const text = 'See {{name}} and {{id}}';
for (const m of text.matchAll(/\{\{(\w+)\}\}/g)) {
  console.log(m[1]); // name, id
}
```
