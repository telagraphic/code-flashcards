How do you use a callback function with addEventListener for DOM events?
?

```javascript
// Callback function for event listener
function handleButtonClick(event) {
  event.preventDefault();
  const button = event.target;
  button.textContent = 'Clicked!';
  button.disabled = true;
}

// Pass callback function to addEventListener
document.getElementById('submitBtn').addEventListener('click', handleButtonClick);

// Or use inline callback
document.getElementById('cancelBtn').addEventListener('click', function(event) {
  event.preventDefault();
  window.location.href = '/';
});
```
