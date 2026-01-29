How do you refactor global variable spaghetti into closure-based code?
?

```javascript
// ❌ BEFORE: Global variables scattered everywhere

// globals.js
var isMenuOpen = false;
var menuElement = null;
var menuButton = null;

// menu.js
function initMenu() {
  menuElement = document.getElementById('menu');
  menuButton = document.getElementById('menu-btn');
  
  menuButton.onclick = function() {
    toggleMenu();
  };
}

function toggleMenu() {
  isMenuOpen = !isMenuOpen;
  if (isMenuOpen) {
    menuElement.classList.add('open');
    menuButton.textContent = 'Close';
  } else {
    menuElement.classList.remove('open');
    menuButton.textContent = 'Menu';
  }
}

function closeMenu() {
  isMenuOpen = false;
  menuElement.classList.remove('open');
  menuButton.textContent = 'Menu';
}

// Problems:
// - Any code can modify isMenuOpen, menuElement, menuButton
// - State can get out of sync
// - No way to create multiple menus
// - Hard to test in isolation
// - Pollutes global namespace

// ────────────────────────────────────────────────────────────

// ✅ AFTER: Closure encapsulates all state

function createMenu(menuId, buttonId) {
  // Private state — only accessible within this closure
  const menu = document.getElementById(menuId);
  const button = document.getElementById(buttonId);
  let isOpen = false;
  
  // Private functions
  const updateUI = () => {
    menu.classList.toggle('open', isOpen);
    button.textContent = isOpen ? 'Close' : 'Menu';
  };
  
  // Event handler with saved reference
  const handleClick = () => {
    isOpen = !isOpen;
    updateUI();
  };
  
  // Initialize
  button.addEventListener('click', handleClick);
  
  // Public API — controlled access to state
  return {
    open: () => {
      isOpen = true;
      updateUI();
    },
    close: () => {
      isOpen = false;
      updateUI();
    },
    toggle: handleClick,
    isOpen: () => isOpen,
    destroy: () => {
      button.removeEventListener('click', handleClick);
    }
  };
}

// Usage: Each menu has its own isolated state
const mainMenu = createMenu('main-menu', 'main-menu-btn');
const sideMenu = createMenu('side-menu', 'side-menu-btn');

mainMenu.open();           // Only affects mainMenu
console.log(sideMenu.isOpen()); // false — independent state

// Improvements:
// ✓ State is private (can't be corrupted from outside)
// ✓ Multiple instances possible (each has own closure)
// ✓ Clean public API
// ✓ Proper cleanup with destroy()
// ✓ No global namespace pollution
// ✓ Easy to test in isolation
```
