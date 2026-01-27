How do you use a callback with setInterval for repeated execution?
?

```javascript
// setInterval executes a callback repeatedly at specified intervals
// Returns an interval ID that can be used to stop it

// Update clock every second
const clockInterval = setInterval(function() {
  const now = new Date();
  document.getElementById('clock').textContent = now.toLocaleTimeString();
}, 1000);

// Stop the interval after 10 seconds
setTimeout(function() {
  clearInterval(clockInterval);
  console.log('Clock stopped');
}, 10000);

// Practical example: progress bar animation
let progress = 0;
const progressBar = document.getElementById('progressBar');

const progressInterval = setInterval(function() {
  progress += 10;
  progressBar.style.width = progress + '%';
  
  if (progress >= 100) {
    clearInterval(progressInterval);
    console.log('Progress complete!');
  }
}, 500);
```
