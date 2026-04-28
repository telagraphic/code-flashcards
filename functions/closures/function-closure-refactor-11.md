How do you refactor closure-based code into a JavaScript class, and what are the trade-offs?
?

```javascript
// ────────────────────────────────────────────────────────────
// CLOSURE-BASED (Factory Function)
// ────────────────────────────────────────────────────────────

function createMenu(menuId, buttonId) {
  // Private state — truly private, inaccessible from outside
  const menu = document.getElementById(menuId);
  const button = document.getElementById(buttonId);
  let isOpen = false;
  
  // Private function — cannot be called from outside
  const updateUI = () => {
    menu.classList.toggle('open', isOpen);
    button.textContent = isOpen ? 'Close' : 'Menu';
  };
  
  // Event handler — saved reference for cleanup
  const handleClick = () => {
    isOpen = !isOpen;
    updateUI();
  };
  
  button.addEventListener('click', handleClick);
  
  // Public API — only these are accessible
  return {
    open: () => { isOpen = true; updateUI(); },
    close: () => { isOpen = false; updateUI(); },
    toggle: handleClick,
    isOpen: () => isOpen,
    destroy: () => { button.removeEventListener('click', handleClick); }
  };
}

const menu1 = createMenu('main-menu', 'main-btn');
const menu2 = createMenu('side-menu', 'side-btn');

// ────────────────────────────────────────────────────────────
// CLASS-BASED
// ────────────────────────────────────────────────────────────

class Menu {
  // Private fields (ES2022+) — # prefix makes them truly private
  #menu;
  #button;
  #isOpen = false;
  
  constructor(menuId, buttonId) {
    this.#menu = document.getElementById(menuId);
    this.#button = document.getElementById(buttonId);
    
    // Bind handler to preserve 'this' context
    this.#handleClick = this.#handleClick.bind(this);
    
    this.#button.addEventListener('click', this.#handleClick);
  }
  
  // Private method
  #updateUI() {
    this.#menu.classList.toggle('open', this.#isOpen);
    this.#button.textContent = this.#isOpen ? 'Close' : 'Menu';
  }
  
  // Private method for event handler
  #handleClick() {
    this.#isOpen = !this.#isOpen;
    this.#updateUI();
  }
  
  // Public methods
  open() {
    this.#isOpen = true;
    this.#updateUI();
  }
  
  close() {
    this.#isOpen = false;
    this.#updateUI();
  }
  
  toggle() {
    this.#handleClick();
  }
  
  isOpen() {
    return this.#isOpen;
  }
  
  destroy() {
    this.#button.removeEventListener('click', this.#handleClick);
  }
}

const menu1 = new Menu('main-menu', 'main-btn');
const menu2 = new Menu('side-menu', 'side-btn');

// ────────────────────────────────────────────────────────────
// ALTERNATIVE: Class without private fields (pre-ES2022)
// ────────────────────────────────────────────────────────────

class MenuLegacy {
  constructor(menuId, buttonId) {
    // "Private by convention" — underscore prefix, but still accessible
    this._menu = document.getElementById(menuId);
    this._button = document.getElementById(buttonId);
    this._isOpen = false;
    
    // Must bind 'this' for event handlers
    this._handleClick = this._handleClick.bind(this);
    
    this._button.addEventListener('click', this._handleClick);
  }
  
  _updateUI() {
    this._menu.classList.toggle('open', this._isOpen);
    this._button.textContent = this._isOpen ? 'Close' : 'Menu';
  }
  
  _handleClick() {
    this._isOpen = !this._isOpen;
    this._updateUI();
  }
  
  // Public methods...
}

// Problem: "private" properties are actually accessible
const legacyMenu = new MenuLegacy('menu', 'btn');
legacyMenu._isOpen = true;  // Oops! Can modify "private" state
console.log(legacyMenu._menu);  // Can access "private" DOM reference

// ────────────────────────────────────────────────────────────
// COMPARISON: Closure vs Class
// ────────────────────────────────────────────────────────────

/*
┌─────────────────────────────────────────────────────────────┐
│                    CLOSURE (Factory Function)               │
├─────────────────────────────────────────────────────────────┤
│ PROS:                                                       │
│ ✓ True privacy — variables cannot be accessed from outside  │
│ ✓ No 'this' binding issues — closures capture variables     │
│ ✓ Works in all JavaScript environments (no ES2022 needed)   │
│ ✓ Simpler mental model — just functions and variables       │
│ ✓ Easy to compose — return object can include anything      │
│ ✓ No 'new' keyword required                                 │
│                                                             │
│ CONS:                                                       │
│ ✗ Each instance has own copy of methods (more memory)       │
│ ✗ No inheritance (composition is used instead)              │
│ ✗ Cannot use instanceof to check type                       │
│ ✗ Methods not on prototype (can't be extended/overridden)   │
│ ✗ Harder to add methods to existing instances               │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                         CLASS                               │
├─────────────────────────────────────────────────────────────┤
│ PROS:                                                       │
│ ✓ Methods shared via prototype (less memory)                │
│ ✓ Supports inheritance (extends)                            │
│ ✓ Can use instanceof for type checking                      │
│ ✓ Familiar to developers from other languages               │
│ ✓ Clear structure with constructor, methods, fields         │
│ ✓ Can be extended/subclassed                                │
│                                                             │
│ CONS:                                                       │
│ ✗ 'this' binding issues — must bind handlers manually       │
│ ✗ True private fields require ES2022+ (# syntax)            │
│ ✗ Without #, "private" is just convention (_prefix)         │
│ ✗ More verbose for simple use cases                         │
│ ✗ Requires 'new' keyword                                    │
└─────────────────────────────────────────────────────────────┘

WHEN TO USE EACH:

Closure (Factory Function):
- Simple components that don't need inheritance
- When true privacy is important
- When avoiding 'this' binding issues matters
- Functional programming style preference
- Need to support older environments

Class:
- Complex hierarchies needing inheritance
- When memory efficiency matters (many instances)
- Team familiar with OOP patterns
- Need instanceof checks
- Using TypeScript (better class support)
- Modern environment with ES2022+ support

MEMORY COMPARISON:

// Closure: Each instance has its own copy of all methods
const menu1 = createMenu('a', 'b');  // { open: fn, close: fn, ... }
const menu2 = createMenu('c', 'd');  // { open: fn, close: fn, ... }
// menu1.open !== menu2.open (different function objects)

// Class: Methods are shared on prototype
const menu1 = new Menu('a', 'b');  // instance -> Menu.prototype
const menu2 = new Menu('c', 'd');  // instance -> Menu.prototype
// menu1.open === menu2.open (same function on prototype)

For a few instances: Doesn't matter
For thousands: Class is more memory-efficient
*/
```
