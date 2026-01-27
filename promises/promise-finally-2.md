How do you use .finally() with async/await for UI state management?
?

```javascript
// .finally() ensures cleanup even with async/await
async function loadUserProfile(userId) {
  showLoadingSpinner();
  let userData = null;
  
  try {
    const response = await fetch(`/api/users/${userId}`);
    userData = await response.json();
    displayProfile(userData);
  } catch (error) {
    showErrorMessage('Failed to load profile');
    console.error(error);
  } finally {
    // Always hide spinner, regardless of success/failure
    hideLoadingSpinner();
    trackAnalytics('profile_view', { userId, success: !!userData });
  }
}

// Alternative with Promise chain
function loadUserProfile(userId) {
  showLoadingSpinner();
  
  return fetch(`/api/users/${userId}`)
    .then(function(r) { return r.json(); })
    .then(function(data) { displayProfile(data); })
    .catch(function(error) { showErrorMessage(error.message); })
    .finally(function() {
      hideLoadingSpinner(); // Always runs
    });
}

// .finally() ensures UI state is always cleaned up
```
