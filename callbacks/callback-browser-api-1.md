How do you use a callback with addEventListener for DOM events?
?

```javascript
// addEventListener uses a callback function for event handling
const button = document.getElementById('submitBtn');

// Callback function executed when button is clicked
button.addEventListener('click', function(event) {
  event.preventDefault();
  console.log('Button clicked!');
  
  // Perform action
  const formData = new FormData(document.getElementById('myForm'));
  submitForm(formData);
});

// Arrow function callback
button.addEventListener('click', (event) => {
  console.log('Clicked with arrow function');
});

// Named function as callback
function handleClick(event) {
  console.log('Button was clicked');
}
button.addEventListener('click', handleClick);
```
