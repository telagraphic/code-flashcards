How do you use an IIFE to initialize a web app on page load?
?

```javascript
// IIFE for app initialization
(function() {
  // Initialize app when DOM is ready
  function init() {
    setupEventListeners();
    loadUserData();
    renderInitialView();
  }
  
  function setupEventListeners() {
    document.getElementById('submitBtn').addEventListener('click', handleSubmit);
    document.getElementById('cancelBtn').addEventListener('click', handleCancel);
  }
  
  function loadUserData() {
    // Load initial data
    fetch('/api/user')
      .then(response => response.json())
      .then(data => renderUserData(data));
  }
  
  function renderInitialView() {
    document.getElementById('app').innerHTML = '<h1>Welcome!</h1>';
  }
  
  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
```
