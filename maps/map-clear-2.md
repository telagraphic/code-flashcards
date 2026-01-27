How do you use clear() for resetting form data and clearing collections?
?

```javascript
// clear() useful for resetting forms and collections
class FormManager {
  constructor() {
    this.formData = new Map();
  }
  
  setField(name, value) {
    this.formData.set(name, value);
  }
  
  resetForm() {
    this.formData.clear();
    // Clear all form inputs
    document.querySelectorAll('input, textarea, select').forEach(el => {
      el.value = '';
    });
  }
  
  getFormData() {
    return Object.fromEntries(this.formData);
  }
}

// Practical: Clear shopping cart
class ShoppingCart {
  constructor() {
    this.items = new Map();
  }
  
  addItem(productId, quantity) {
    const current = this.items.get(productId) || 0;
    this.items.set(productId, current + quantity);
  }
  
  clearCart() {
    this.items.clear();
    updateCartDisplay();
  }
  
  getTotalItems() {
    return this.items.size;
  }
}

// Practical: Reset game state
const gameState = new Map([
  ['score', 0],
  ['level', 1],
  ['lives', 3]
]);

function resetGame() {
  gameState.clear();
  gameState.set('score', 0);
  gameState.set('level', 1);
  gameState.set('lives', 3);
}
```
