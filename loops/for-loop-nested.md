How do you use nested for loops?
?

```javascript
// Nested for loops: Loop inside another loop

// Practical: Two-dimensional array processing
const matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

for (let i = 0; i < matrix.length; i++) {
  for (let j = 0; j < matrix[i].length; j++) {
    console.log(`matrix[${i}][${j}] = ${matrix[i][j]}`);
  }
}

// Practical: Grid layout rendering
function renderGrid(rows, cols) {
  const grid = [];
  for (let row = 0; row < rows; row++) {
    const rowData = [];
    for (let col = 0; col < cols; col++) {
      rowData.push({ row, col, value: row * cols + col });
    }
    grid.push(rowData);
  }
  return grid;
}

// Practical: Compare items in array (cartesian product)
const products = ['laptop', 'mouse', 'keyboard'];
const quantities = [1, 2, 3];

const combinations = [];
for (let i = 0; i < products.length; i++) {
  for (let j = 0; j < quantities.length; j++) {
    combinations.push({
      product: products[i],
      quantity: quantities[j],
      total: products[i].length * quantities[j]
    });
  }
}

// Practical: Table data processing
const tableData = [
  ['Name', 'Age', 'City'],
  ['Alice', '30', 'NYC'],
  ['Bob', '25', 'LA']
];

for (let row = 0; row < tableData.length; row++) {
  for (let col = 0; col < tableData[row].length; col++) {
    const cell = tableData[row][col];
    // Process each cell
    console.log(`Row ${row}, Col ${col}: ${cell}`);
  }
}

// Practical: Nested data structures
const categories = [
  {
    name: 'Electronics',
    products: [
      { name: 'Laptop', price: 999 },
      { name: 'Phone', price: 699 }
    ]
  },
  {
    name: 'Books',
    products: [
      { name: 'Novel', price: 15 },
      { name: 'Textbook', price: 50 }
    ]
  }
];

let totalValue = 0;
for (let i = 0; i < categories.length; i++) {
  for (let j = 0; j < categories[i].products.length; j++) {
    totalValue += categories[i].products[j].price;
  }
}
console.log(`Total value: $${totalValue}`);
```
