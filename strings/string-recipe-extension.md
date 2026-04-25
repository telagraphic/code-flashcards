How do you get a file extension from a filename using string methods?
?

```javascript
// Recipe: lastIndexOf('.') → slice from after dot (or '' if no dot)

function getExtension(filename) {
  const lastDot = filename.lastIndexOf('.');
  if (lastDot === -1) return '';
  return filename.slice(lastDot + 1);
}

console.log(getExtension('app.js'));           // 'js'
console.log(getExtension('config.backup.json')); // 'json'
console.log(getExtension('noext'));             // ''

// Optional: lowercase for comparison
function getExtensionNormalized(filename) {
  return getExtension(filename).toLowerCase();
}

// Check if filename is a script (combines endsWith + getExtension)
function isScriptFile(filename) {
  const ext = getExtension(filename).toLowerCase();
  return ['js', 'mjs', 'ts', 'tsx', 'jsx'].includes(ext);
}
```
