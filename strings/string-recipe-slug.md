How do you create a URL slug from a title using string methods?
?

```javascript
// Recipe: trim → toLowerCase → replaceAll (spaces) → replace (non-alphanumeric)

function toSlug(title) {
  return title
    .trim()
    .toLowerCase()
    .replaceAll(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

console.log(toSlug('  Hello World & JavaScript  ')); // 'hello-world-javascript'

// With optional collapse of multiple dashes
function toSlugStrict(title) {
  return title
    .trim()
    .toLowerCase()
    .replaceAll(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')      // collapse repeated dashes
    .replace(/^-|-$/g, '');   // trim leading/trailing dash
}

console.log(toSlugStrict('  React  &  Vue  ')); // 'react-vue'
```
