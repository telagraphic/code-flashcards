How do you use a Map for efficient component state management with computed values?
?

```javascript
// Map for component state with computed properties and dependencies
class ComponentStateManager {
  constructor() {
    this.state = new Map();
    this.computed = new Map(); // Computed values
    this.dependencies = new Map(); // Track what computed values depend on
  }
  
  setState(key, value) {
    this.state.set(key, value);
    this.invalidateComputed(key);
  }
  
  // Register computed value that depends on state keys
  addComputed(name, keys, computeFn) {
    this.computed.set(name, { keys, computeFn });
    this.dependencies.set(name, new Set(keys));
  }
  
  // Get computed value (memoized)
  getComputed(name) {
    const { computeFn, keys } = this.computed.get(name);
    const values = keys.map(key => this.state.get(key));
    return computeFn(...values);
  }
  
  // Invalidate computed values when dependencies change
  invalidateComputed(changedKey) {
    for (const [name, deps] of this.dependencies) {
      if (deps.has(changedKey)) {
        // Trigger recomputation
        const value = this.getComputed(name);
        this.notifyListeners(name, value);
      }
    }
  }
}

// Usage: Shopping cart with computed totals
const cart = new ComponentStateManager();

cart.setState('items', [
  { id: 1, price: 10, quantity: 2 },
  { id: 2, price: 20, quantity: 1 }
]);

cart.addComputed('subtotal', ['items'], (items) => {
  return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
});

cart.addComputed('total', ['items'], (items) => {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  return subtotal * 1.1; // 10% tax
});

console.log(cart.getComputed('total')); // Automatically computed
```
