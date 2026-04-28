How do you create a function declaration that calculates and displays totals?
?

```javascript
// Function declaration for calculating cart total
function calculateTotal(items) {
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    total += items[i].price * items[i].quantity;
  }
  return total;
}

// Function declaration for applying discount
function applyDiscount(total, discountPercent) {
  return total * (1 - discountPercent / 100);
}

// Usage in shopping cart
function updateCartDisplay(cartItems) {
  const subtotal = calculateTotal(cartItems);
  const discount = 10; // 10% discount
  const finalTotal = applyDiscount(subtotal, discount);
  
  document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
  document.getElementById('discount').textContent = `-${discount}%`;
  document.getElementById('total').textContent = `$${finalTotal.toFixed(2)}`;
}
```
