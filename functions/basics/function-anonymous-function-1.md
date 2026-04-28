How do you use an anonymous function with setTimeout to delay code execution?
?

```javascript
// Anonymous function with setTimeout
setTimeout(function() {
  console.log('This runs after 2 seconds');
  document.getElementById('message').textContent = 'Welcome!';
}, 2000);

// Practical example: show loading spinner
function fetchData() {
  const spinner = document.getElementById('spinner');
  spinner.style.display = 'block';
  
  setTimeout(function() {
    spinner.style.display = 'none';
    loadContent();
  }, 1000);
}
```
