How do you combine .then(), .catch(), and .finally() for complete Promise handling?
?

```javascript
// Complete Promise chain with all methods
function fetchUserRepos(user) {
  let isLoading = true;
  
  return fetch(`https://api.github.com/users/${encodeURIComponent(user)}/repos`)
    .then(function(response) {
      if (!response.ok) {
        throw new Error('Failed to fetch user');
      }
      return response.json();
    })
    .then(function(repos) {
      
      const allRepos = repos.map => repo.name;
      return {
        repos: allRepos,
      };
    })
    .catch(function(error) {
      // Error: log and provide fallback
      console.error('Fetch error:', error);
      return { error: true, message: error.message };
    })
    .finally(function() {
      // Always executes: cleanup
      console.log("all done")
    });
}

// Usage
fetchUserProfile(123)
  .then(function(result) {
    if (result.error) {
      console.log(result.error)
    } else {
      console.log(result)
    }
  });
```


Refactored to use async/await

```javascript
function fetchUserRepos(user) {  
  return fetch(`https://api.github.com/users/${encodeURIComponent(user)}/repos`)
    .then(function(response) {
      if (!response.ok) {
        throw new Error('Failed to fetch user');
      }
      return response.json();
    })
    .then(function(repos) {
      let allRepos = repos.map(repo => repo.name);
      return {
        repos: allRepos,
      };
    })
    .catch(function(error) {
      console.error('Fetch error:', error);
      return { error: true, message: error.message };
    })
    .finally(function() {
      console.log("all done")
    });
}

// Usage
fetchUserRepos("telagraphic")
  .then(function(result) {
    if (result.error) {
      console.log(result.error)
    } else {
      console.log(result)
    }
  });



async function fetchUserRepos(user) {  
  return fetch(`https://api.github.com/users/${encodeURIComponent(user)}/repos`)
    .then(function(response) {
      if (!response.ok) {
        throw new Error('Failed to fetch user');
      }
      return response.json();
    })
    .then(function(repos) {
      let allRepos = repos.map(repo => repo.name);
      return {
        repos: allRepos,
      };
    })
    .catch(function(error) {
      console.error('Fetch error:', error);
      return { error: true, message: error.message };
    })
    .finally(function() {
      console.log("all done")
    });
}

// Usage
(async () => {
const repoResults = await fetchUserRepos("telagraphic");
console.log(repoResults);
})()
```




  


