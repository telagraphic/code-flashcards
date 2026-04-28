How do you use closures to create a reusable DOM component with private state?
?

```javascript
// ❌ WRONG WAY - common mistakes

// Problem 1: Global state - all toggles share the same isOpen!
let isOpen = false;  // Global variable

function createToggleBad1(buttonId, contentId) {
  const button = document.getElementById(buttonId);
  const content = document.getElementById(contentId);
  
  button.addEventListener('click', function() {
    isOpen = !isOpen;  // Modifies global - affects ALL toggles!
    content.style.display = isOpen ? 'block' : 'none';
  });
}

createToggleBad1('faq1-btn', 'faq1-content');
createToggleBad1('faq2-btn', 'faq2-content');
// Clicking faq1 button changes isOpen for faq2 too!

// Problem 2: Anonymous handler - can't remove the event listener
function createToggleBad2(buttonId, contentId) {
  const button = document.getElementById(buttonId);
  const content = document.getElementById(contentId);
  let isOpen = false;  // Good: local variable
  
  // Bad: anonymous function - no reference to remove it later
  button.addEventListener('click', function() {
    isOpen = !isOpen;
    content.style.display = isOpen ? 'block' : 'none';
  });
  
  // Can't return a working destroy() because we have no reference to the handler
  return {
    destroy: () => {
      // button.removeEventListener('click', ???);  // Can't remove it!
      // Memory leak: handler stays attached forever
    }
  };
}

// Problem 3: Creating new handler each time destroy is called
function createToggleBad3(buttonId, contentId) {
  const button = document.getElementById(buttonId);
  const content = document.getElementById(contentId);
  let isOpen = false;
  
  button.addEventListener('click', function handler() {
    isOpen = !isOpen;
    content.style.display = isOpen ? 'block' : 'none';
  });
  
  return {
    destroy: () => {
      // This creates a NEW function - it won't match the original!
      button.removeEventListener('click', function handler() {
        isOpen = !isOpen;
        content.style.display = isOpen ? 'block' : 'none';
      });
      // The original handler is still attached - memory leak
    }
  };
}

// ────────────────────────────────────────────────────────────
// WHY Problem 3 fails: Every `function` keyword creates a NEW object
// ────────────────────────────────────────────────────────────
//
// Each time JavaScript encounters a function definition, it creates
// a NEW function object in memory—even if the code looks identical:
//
//   const fn1 = function() { return 1; };
//   const fn2 = function() { return 1; };
//   console.log(fn1 === fn2);  // false — different objects!
//
// In createToggleBad3:
//   - addEventListener creates Function Object #1 (address 0x1A)
//   - removeEventListener creates Function Object #2 (address 0x2B)
//   - removeEventListener looks for 0x2B in the list... not found!
//   - Object #1 (0x1A) is still attached → memory leak
//
// Memory visualization:
//
//   ┌─────────────────────────────────────┐
//   │ Function Object #1  (address: 0x1A) │ ← attached to button
//   │   code: "isOpen = !isOpen"          │
//   │   closure: { isOpen, button, ... }  │
//   └─────────────────────────────────────┘
//
//   ┌─────────────────────────────────────┐
//   │ Function Object #2  (address: 0x2B) │ ← passed to remove
//   │   code: "isOpen = !isOpen"          │
//   │   closure: { isOpen, button, ... }  │
//   └─────────────────────────────────────┘
//
//   Button's listeners: [ 0x1A ]  ← still has Object #1!
//
// Key insight: Two closures over the same variables are still
// different function objects. removeEventListener uses === to match.
// You MUST save the reference when adding, then use it when removing.
// ────────────────────────────────────────────────────────────

// ✅ CORRECT WAY - closure with saved handler reference

function createToggle(buttonId, contentId) {
  // Private state - each call creates NEW closure with its own variables
  let isOpen = false;
  const button = document.getElementById(buttonId);
  const content = document.getElementById(contentId);
  
  // Save reference to handler - allows removal later
  const toggle = function() {
    isOpen = !isOpen;
    content.style.display = isOpen ? 'block' : 'none';
    button.textContent = isOpen ? 'Hide' : 'Show';
  };
  
  button.addEventListener('click', toggle);
  
  // Return public API and cleanup
  return {
    open: () => {
      isOpen = true;
      content.style.display = 'block';
      button.textContent = 'Hide';
    },
    close: () => {
      isOpen = false;
      content.style.display = 'none';
      button.textContent = 'Show';
    },
    isOpen: () => isOpen,  // Getter for private state
    destroy: () => {
      button.removeEventListener('click', toggle);
      // Now toggle, isOpen, button, content can be GC'd
    }
  };
}

// Usage - each instance has separate private state
const faq1 = createToggle('faq1-btn', 'faq1-content');
const faq2 = createToggle('faq2-btn', 'faq2-content');

faq1.open();           // Only affects faq1
console.log(faq2.isOpen()); // false - separate closure

// Cleanup when done
faq1.destroy();
faq2.destroy();
```
