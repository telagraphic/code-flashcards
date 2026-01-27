How do you use an anonymous function with array methods like forEach?
?

```javascript
// Anonymous function with forEach
const items = ['apple', 'banana', 'cherry'];

items.forEach(function(item, index) {
  console.log(`${index + 1}. ${item}`);
  // Create list item in DOM
  const li = document.createElement('li');
  li.textContent = item;
  document.getElementById('list').appendChild(li);
});

// Practical example: process form data
const formFields = document.querySelectorAll('.form-field');
formFields.forEach(function(field) {
  field.addEventListener('blur', function() {
    validateField(field);
  });
});
```
