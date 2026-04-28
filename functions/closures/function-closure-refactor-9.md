How do you refactor shopping cart spaghetti into a closure-based state manager?
?

```javascript
// ❌ BEFORE: Cart state scattered with direct DOM manipulation

var cartItems = [];
var cartTotal = 0;

function addToCart(productId, name, price) {
  var existing = null;
  for (var i = 0; i < cartItems.length; i++) {
    if (cartItems[i].productId === productId) {
      existing = cartItems[i];
      break;
    }
  }
  
  if (existing) {
    existing.quantity++;
  } else {
    cartItems.push({ productId: productId, name: name, price: price, quantity: 1 });
  }
  
  updateCartTotal();
  updateCartUI();
  updateCartBadge();
  saveCartToStorage();
}

function removeFromCart(productId) {
  cartItems = cartItems.filter(function(item) {
    return item.productId !== productId;
  });
  updateCartTotal();
  updateCartUI();
  updateCartBadge();
  saveCartToStorage();
}

function updateCartTotal() {
  cartTotal = 0;
  for (var i = 0; i < cartItems.length; i++) {
    cartTotal += cartItems[i].price * cartItems[i].quantity;
  }
}

function updateCartUI() { /* scattered DOM updates */ }
function updateCartBadge() { /* more scattered DOM updates */ }
function saveCartToStorage() { localStorage.setItem('cart', JSON.stringify(cartItems)); }

// Problems:
// - Global state
// - Repeated update calls (easy to forget one)
// - UI updates scattered
// - No way to subscribe to changes
// - Hard to test

// ────────────────────────────────────────────────────────────

// ✅ AFTER: Closure-based cart with pub/sub pattern

function createCart(storageKey = 'cart') {
  // Private state
  let items = [];
  const subscribers = new Set();
  
  // Load from storage
  const loadFromStorage = () => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) items = JSON.parse(saved);
    } catch (e) {
      items = [];
    }
  };
  
  // Save to storage
  const saveToStorage = () => {
    localStorage.setItem(storageKey, JSON.stringify(items));
  };
  
  // Notify all subscribers
  const notify = () => {
    const state = getState();
    subscribers.forEach(callback => callback(state));
    saveToStorage();
  };
  
  // Get computed state
  const getState = () => {
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    
    return {
      items: items.map(item => ({ ...item })),  // Return copies
      itemCount,
      total,
      isEmpty: items.length === 0
    };
  };
  
  // Find item by product ID
  const findItem = (productId) => items.find(item => item.productId === productId);
  
  // Public API
  const cart = {
    add: (product) => {
      const existing = findItem(product.productId);
      
      if (existing) {
        existing.quantity += product.quantity || 1;
      } else {
        items.push({
          productId: product.productId,
          name: product.name,
          price: product.price,
          quantity: product.quantity || 1,
          image: product.image
        });
      }
      
      notify();
      return cart;  // Enable chaining
    },
    
    remove: (productId) => {
      items = items.filter(item => item.productId !== productId);
      notify();
      return cart;
    },
    
    updateQuantity: (productId, quantity) => {
      const item = findItem(productId);
      if (item) {
        if (quantity <= 0) {
          return cart.remove(productId);
        }
        item.quantity = quantity;
        notify();
      }
      return cart;
    },
    
    clear: () => {
      items = [];
      notify();
      return cart;
    },
    
    getState,
    
    getItem: (productId) => {
      const item = findItem(productId);
      return item ? { ...item } : null;
    },
    
    // Subscribe to changes
    subscribe: (callback) => {
      subscribers.add(callback);
      // Immediately call with current state
      callback(getState());
      
      // Return unsubscribe function
      return () => subscribers.delete(callback);
    }
  };
  
  // Initialize
  loadFromStorage();
  
  return cart;
}

// Create cart instance
const cart = createCart('shopping-cart');

// Subscribe UI components to cart changes
const unsubscribeBadge = cart.subscribe(({ itemCount }) => {
  document.getElementById('cart-badge').textContent = itemCount;
  document.getElementById('cart-badge').hidden = itemCount === 0;
});

const unsubscribeTotal = cart.subscribe(({ total }) => {
  document.getElementById('cart-total').textContent = `$${total.toFixed(2)}`;
});

const unsubscribeList = cart.subscribe(({ items, isEmpty }) => {
  const listEl = document.getElementById('cart-items');
  
  if (isEmpty) {
    listEl.innerHTML = '<p>Your cart is empty</p>';
    return;
  }
  
  listEl.innerHTML = items.map(item => `
    <div class="cart-item" data-id="${item.productId}">
      <span>${item.name}</span>
      <span>$${item.price} × ${item.quantity}</span>
      <button data-action="remove">Remove</button>
    </div>
  `).join('');
});

// Usage
cart.add({ productId: 1, name: 'Widget', price: 9.99 });
cart.add({ productId: 2, name: 'Gadget', price: 19.99, quantity: 2 });
cart.updateQuantity(1, 3);
cart.remove(2);

// All subscribed UI components update automatically!

// Cleanup
unsubscribeBadge();
unsubscribeTotal();
unsubscribeList();

// Improvements:
// ✓ Single source of truth (private state)
// ✓ Pub/sub pattern — UI reacts to state changes
// ✓ Computed values (total, itemCount)
// ✓ Automatic persistence
// ✓ Method chaining
// ✓ Easy to test (no DOM dependency in core logic)
// ✓ Multiple UI components can subscribe
```
