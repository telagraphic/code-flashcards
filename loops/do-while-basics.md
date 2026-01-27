What is a do...while loop and how does it work?
?

```javascript
// do...while loop: Executes code block at least once
// Then continues while condition is true
// Syntax: do { ... } while (condition);

// Basic do...while loop
let count = 0;
do {
  console.log(count); // 0, 1, 2, 3, 4
  count++;
} while (count < 5);

// Key difference from while:
// do...while executes at least once, even if condition is false initially

let x = 10;
do {
  console.log(x); // 10 (executes once)
  x++;
} while (x < 5); // Condition is false, but code ran once

// Practical: User input validation (must run at least once)
let userInput;
do {
  userInput = prompt('Enter a number greater than 10:');
} while (parseInt(userInput) <= 10);

// Practical: Menu system
function showMenu() {
  let choice;
  do {
    choice = prompt('1. Option 1\n2. Option 2\n3. Exit\nChoice:');
    handleChoice(choice);
  } while (choice !== '3');
}

// Practical: Initialize and check
let data = null;
do {
  data = await fetchData();
  if (!data) {
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
} while (!data);

// Practical: Process at least one item
function processItems(items) {
  let index = 0;
  do {
    processItem(items[index]);
    index++;
  } while (index < items.length && shouldContinue());
}
```
