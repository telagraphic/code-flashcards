What is the String type in JavaScript and how is it used?
?

```javascript
// String: Sequence of characters, primitive type
// Can be created with '', "", or `` (template literals)

const name = 'Alice';
const message = "Hello";
const template = `Hello, ${name}!`; // Template literal

// String properties and methods
const text = 'Hello World';
console.log(text.length); // 11
console.log(text.toUpperCase()); // 'HELLO WORLD'
console.log(text.toLowerCase()); // 'hello world'
console.log(text.includes('World')); // true
console.log(text.split(' ')); // ['Hello', 'World']

// Practical: Form input validation
function validateEmail(email) {
  if (typeof email !== 'string') return false;
  return email.includes('@') && email.includes('.');
}

// Practical: URL manipulation
function getQueryParam(url, param) {
  const urlObj = new URL(url);
  return urlObj.searchParams.get(param);
}

// Practical: Template literals for dynamic content
function createGreeting(name, role) {
  return `Welcome, ${name}! You are logged in as ${role}.`;
}

// Practical: String methods for data processing
function sanitizeInput(input) {
  return input.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
}

// Practical: Text manipulation
function truncate(text, maxLength) {
  return text.length > maxLength 
    ? text.substring(0, maxLength) + '...'
    : text;
}

// String is immutable - methods return new strings
const original = 'hello';
const upper = original.toUpperCase();
console.log(original); // 'hello' (unchanged)
console.log(upper); // 'HELLO'
```
