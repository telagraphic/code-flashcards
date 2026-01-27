What is a while loop and how does it work?
?

```javascript
// while loop: Executes code block while condition is true
// Syntax: while (condition) { ... }

// Basic while loop
let count = 0;
while (count < 5) {
  console.log(count); // 0, 1, 2, 3, 4
  count++;
}

// Practical: Polling for condition
let dataLoaded = false;
while (!dataLoaded) {
  const data = await checkDataStatus();
  if (data) {
    dataLoaded = true;
  } else {
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
}

// Practical: Process queue until empty
const queue = [1, 2, 3, 4, 5];
while (queue.length > 0) {
  const item = queue.shift();
  processItem(item);
}

// Practical: Retry logic
let attempts = 0;
let success = false;
const maxAttempts = 3;

while (attempts < maxAttempts && !success) {
  try {
    await performOperation();
    success = true;
  } catch (error) {
    attempts++;
    if (attempts >= maxAttempts) {
      throw error;
    }
    await new Promise(resolve => setTimeout(resolve, 1000 * attempts));
  }
}

// Practical: User input validation
let userInput = '';
while (userInput.trim() === '') {
  userInput = prompt('Enter your name:');
}

// Important: Ensure condition becomes false to avoid infinite loops
// Always modify condition variable inside loop
```
