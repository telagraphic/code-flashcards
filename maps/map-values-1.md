How do you use values() to iterate over Map values?
?

```javascript
// values() returns iterator over Map values
const productMap = new Map([
  ['laptop', { price: 999, stock: 5 }],
  ['mouse', { price: 25, stock: 20 }],
  ['keyboard', { price: 75, stock: 10 }]
]);

// Iterate values
for (const product of productMap.values()) {
  console.log(`Price: $${product.price}, Stock: ${product.stock}`);
}

// Convert to array
const products = Array.from(productMap.values());
console.log(products);
// [{ price: 999, stock: 5 }, { price: 25, stock: 20 }, ...]

// Practical: Calculate total value
const cart = new Map([
  ['item1', { price: 10, quantity: 2 }],
  ['item2', { price: 20, quantity: 1 }]
]);

const total = Array.from(cart.values())
  .reduce((sum, item) => sum + (item.price * item.quantity), 0);

console.log(total); // 40

// Practical: Find all active users
const users = new Map([
  ['alice', { active: true, role: 'admin' }],
  ['bob', { active: false, role: 'user' }],
  ['charlie', { active: true, role: 'user' }]
]);

const activeUsers = Array.from(users.values())
  .filter(user => user.active);
console.log(activeUsers.length); // 2
```
