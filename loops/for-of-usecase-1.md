How do you use for...of for array processing and transformation?
?

```javascript
// for...of for array processing

// Practical: Filter and transform data
const products = [
  { name: 'Laptop', price: 999, inStock: true },
  { name: 'Mouse', price: 25, inStock: false },
  { name: 'Keyboard', price: 75, inStock: true }
];

const availableProducts = [];
for (const product of products) {
  if (product.inStock) {
    availableProducts.push({
      ...product,
      discountedPrice: product.price * 0.9
    });
  }
}

// Practical: Accumulate values
const orders = [10, 20, 30, 40];
let total = 0;
for (const amount of orders) {
  total += amount;
}
console.log(`Total: $${total}`);

// Practical: Find matching items
function findUsersByRole(users, role) {
  const matches = [];
  for (const user of users) {
    if (user.role === role) {
      matches.push(user);
    }
  }
  return matches;
}

// Practical: Process API responses
async function processApiResponses(endpoints) {
  const results = [];
  for (const endpoint of endpoints) {
    try {
      const response = await fetch(endpoint);
      const data = await response.json();
      results.push(data);
    } catch (error) {
      console.error(`Failed to fetch ${endpoint}:`, error);
    }
  }
  return results;
}

// Practical: Form data collection
function collectFormData(form) {
  const data = {};
  const formData = new FormData(form);
  
  for (const [key, value] of formData) {
    data[key] = value;
  }
  
  return data;
}

// Practical: Remove duplicates
function getUniqueValues(array) {
  const seen = new Set();
  const unique = [];
  
  for (const item of array) {
    if (!seen.has(item)) {
      seen.add(item);
      unique.push(item);
    }
  }
  
  return unique;
}
```
