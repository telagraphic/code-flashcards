Can arrow functions be called before they're defined?
?

```javascript
// No! Arrow functions are not hoisted
// They must be defined before use

// This will cause an error:
// processData([1, 2, 3]); // ReferenceError

const processData = (arr) => {
  return arr.map(x => x * 2);
};

// Now it works
console.log(processData([1, 2, 3])); // [2, 4, 6]

// Practical example: organizing code with arrow functions
// Define all arrow functions first
const validateInput = (input) => input.trim().length > 0;
const formatOutput = (data) => JSON.stringify(data, null, 2);
const sendRequest = async (url) => {
  const response = await fetch(url);
  return response.json();
};

// Then use them
if (validateInput(userInput)) {
  const data = await sendRequest('/api/data');
  const formatted = formatOutput(data);
  console.log(formatted);
}
```
