How do you use arrow functions as concise callbacks in event handlers?
?

```javascript
// Arrow function as event handler callback
document.getElementById('submitBtn').addEventListener('click', (e) => {
  e.preventDefault();
  const formData = new FormData(e.target.form);
  submitForm(formData);
});

// Arrow function with array methods
const items = document.querySelectorAll('.item');
items.forEach(item => {
  item.addEventListener('click', () => {
    item.classList.toggle('active');
  });
});

// Arrow function for setTimeout
setTimeout(() => {
  document.getElementById('message').textContent = 'Welcome!';
}, 2000);

// Practical example: search input handler
document.getElementById('search').addEventListener('input', (e) => {
  const query = e.target.value;
  if (query.length > 2) {
    performSearch(query);
  }
});
```
