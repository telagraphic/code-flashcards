How do you create an object with methods for managing a shopping cart?
?

```javascript
// Shopping cart object with methods
const shoppingCart = {
  items: [],
  total: 0,
  
  addItem(product) {
    this.items.push(product);
    this.calculateTotal();
    return this.items.length;
  },
  
  removeItem(productId) {
    this.items = this.items.filter(item => item.id !== productId);
    this.calculateTotal();
    return this.items.length;
  },
  
  calculateTotal() {
    this.total = this.items.reduce((sum, item) => {
      return sum + (item.price * item.quantity);
    }, 0);
    return this.total;
  },
  
  clear() {
    this.items = [];
    this.total = 0;
  },
  
  display() {
    document.getElementById('cart-items').innerHTML = 
      this.items.map(item => 
        `<div>${item.name} - $${item.price}</div>`
      ).join('');
    document.getElementById('cart-total').textContent = `$${this.total.toFixed(2)}`;
  }
};

// Usage
shoppingCart.addItem({ id: 1, name: 'Book', price: 19.99, quantity: 1 });
shoppingCart.display();
```
