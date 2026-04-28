How do you convert callback-based APIs to Promises using promisify?
?

```javascript
// promisify converts callback-based functions to Promise-based
function promisify(fn) {
  return function(...args) {
    return new Promise(function(resolve, reject) {
      // Add callback as last argument
      fn.call(this, ...args, function(error, result) {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  };
}

// Example: Convert setTimeout to Promise
const delay = promisify(function(ms, callback) {
  setTimeout(function() {
    callback(null, 'Done');
  }, ms);
});

// Now can use with await
async function example() {
  await delay(1000);
  console.log('Waited 1 second');
}

// Modern web app: Convert FileReader to Promise
function readFileAsText(file) {
  return new Promise(function(resolve, reject) {
    const reader = new FileReader();
    reader.onload = function() { resolve(reader.result); };
    reader.onerror = function() { reject(reader.error); };
    reader.readAsText(file);
  });
}

// Usage
const fileInput = document.getElementById('fileInput');
fileInput.addEventListener('change', async function(e) {
  const file = e.target.files[0];
  const text = await readFileAsText(file);
  console.log('File content:', text);
});
```
