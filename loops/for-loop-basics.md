What is a for loop and how does it work?
?

```javascript
// for loop: Executes code block repeatedly with counter
// Syntax: for (initialization; condition; increment)

// Basic for loop
for (let i = 0; i < 5; i++) {
  console.log(i); // 0, 1, 2, 3, 4
}

// Practical: Iterate through array
const items = ['apple', 'banana', 'cherry'];
for (let i = 0; i < items.length; i++) {
  console.log(items[i]);
}

// Practical: Process array elements
const numbers = [1, 2, 3, 4, 5];
const doubled = [];
for (let i = 0; i < numbers.length; i++) {
  doubled.push(numbers[i] * 2);
}
console.log(doubled); // [2, 4, 6, 8, 10]

// Practical: DOM element manipulation
const buttons = document.querySelectorAll('.btn');
for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', () => {
    console.log(`Button ${i} clicked`);
  });
}

// Practical: API data processing
async function processUsers(userIds) {
  const users = [];
  for (let i = 0; i < userIds.length; i++) {
    const user = await fetch(`/api/users/${userIds[i]}`).then(r => r.json());
    users.push(user);
  }
  return users;
}

// Loop control: break and continue
for (let i = 0; i < 10; i++) {
  if (i === 5) break; // Exit loop
  if (i % 2 === 0) continue; // Skip to next iteration
  console.log(i); // 1, 3
}
```
