What are the three states of a Promise and what do they mean?
?

```javascript
// Promise has three possible states:

// 1. PENDING - Initial state, neither fulfilled nor rejected
const pendingPromise = new Promise(function(resolve, reject) {
  // Still executing, state is PENDING
  setTimeout(function() {
    resolve('Done'); // Will change to FULFILLED
  }, 1000);
});
// Right now: state = PENDING

// 2. FULFILLED - Operation completed successfully
const fulfilledPromise = Promise.resolve('Success');
// State = FULFILLED, value = 'Success'

fulfilledPromise.then(function(value) {
  console.log(value); // 'Success'
});

// 3. REJECTED - Operation failed
const rejectedPromise = Promise.reject(new Error('Failed'));
// State = REJECTED, reason = Error('Failed')

rejectedPromise.catch(function(error) {
  console.error(error.message); // 'Failed'
});

// State transitions:
// PENDING → FULFILLED (via resolve)
// PENDING → REJECTED (via reject)
// Once fulfilled or rejected, state cannot change
```
