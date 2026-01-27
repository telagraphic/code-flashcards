How do you create a function declaration for a reusable utility function?
?

```javascript
// Function declaration - hoisted, can be called before definition
function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
}

// Can be called anywhere in scope, even before declaration
const price = formatCurrency(99.99);
console.log(price); // "$99.99"

// Usage in web app
function displayProductPrice(product) {
  const formattedPrice = formatCurrency(product.price);
  document.getElementById('price').textContent = formattedPrice;
}
```
