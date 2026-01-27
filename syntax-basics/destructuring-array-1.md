How do you destructure elements from an array?
?

```javascript
// Basic array destructuring
const colors = ['red', 'green', 'blue'];

// Destructure into variables
const [first, second, third] = colors;
console.log(first); // 'red'
console.log(second); // 'green'
console.log(third); // 'blue'

// Skip elements
const [firstColor, , thirdColor] = colors;
console.log(firstColor); // 'red'
console.log(thirdColor); // 'blue'

// Default values
const [a = 1, b = 2, c = 3] = [10];
console.log(a); // 10
console.log(b); // 2 (default)
console.log(c); // 3 (default)

// Practical: Swap variables
let x = 1;
let y = 2;
[x, y] = [y, x];
console.log(x); // 2
console.log(y); // 1

// Practical: Extract return values from function
function getCoordinates() {
  return [10, 20];
}

const [xCoord, yCoord] = getCoordinates();
console.log(xCoord, yCoord); // 10 20
```
