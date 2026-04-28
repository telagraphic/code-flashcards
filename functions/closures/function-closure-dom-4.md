How do you use closures to manage modal/dialog state?
?

```javascript
// ❌ WRONG WAY - common mistakes with modal/dialog management

// Problem 1: Global state - all modals share isOpen!
let globalIsOpen = false;
let globalOnCloseCallback = null;

function createModalBad1(modalId) {
  const modal = document.getElementById(modalId);
  
  return {
    open: (options = {}) => {
      globalIsOpen = true;  // Shared by ALL modals!
      globalOnCloseCallback = options.onClose;
      modal.classList.add('visible');
    },
    close: () => {
      globalIsOpen = false;  // Closing one "closes" all
      modal.classList.remove('visible');
      if (globalOnCloseCallback) globalOnCloseCallback();
    }
  };
}

// Problem: opening modal2 overwrites modal1's callback!
const modal1 = createModalBad1('modal-1');
const modal2 = createModalBad1('modal-2');
modal1.open({ onClose: () => console.log('modal1 closed') });
modal2.open({ onClose: () => console.log('modal2 closed') });
modal1.close();  // Logs "modal2 closed" — wrong callback!

// Problem 2: Document-level listener leak (VERY common mistake)
function createModalBad2(modalId) {
  const modal = document.getElementById(modalId);
  let isOpen = false;
  
  const open = () => {
    isOpen = true;
    modal.classList.add('visible');
    
    // Bad: Anonymous function on document — can NEVER be removed!
    document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape' && isOpen) {
        close();
      }
    });
  };
  
  const close = () => {
    isOpen = false;
    modal.classList.remove('visible');
  };
  
  return {
    open,
    close,
    destroy: () => {
      // Can't remove the keydown listener!
      // It stays on document FOREVER, even after modal is gone
      // Each open() adds ANOTHER listener — they pile up!
    }
  };
}

// After opening modal 5 times, you have 5 keydown listeners on document!

// Problem 3: Not guarding against double-close
function createModalBad3(modalId) {
  const modal = document.getElementById(modalId);
  let isOpen = false;
  let onCloseCallback = null;
  
  const close = () => {
    // No guard! If called twice, callback fires twice
    isOpen = false;
    modal.classList.remove('visible');
    if (onCloseCallback) {
      onCloseCallback();  // Fires even if already closed!
      // Could trigger duplicate API calls, state corruption, etc.
    }
  };
  
  return {
    open: (options = {}) => {
      isOpen = true;
      onCloseCallback = options.onClose;
      modal.classList.add('visible');
    },
    close
  };
}

const modal = createModalBad3('modal');
modal.open({ onClose: () => fetch('/api/log-close') });
modal.close();  // API call 1
modal.close();  // API call 2 — duplicate!

// Problem 4: Exposing mutable state directly
function createModalBad4(modalId) {
  const modal = document.getElementById(modalId);
  
  return {
    isOpen: false,  // Exposed directly — can be mutated from outside!
    open: function() {
      this.isOpen = true;
      modal.classList.add('visible');
    },
    close: function() {
      this.isOpen = false;
      modal.classList.remove('visible');
    }
  };
}

const badModal = createModalBad4('modal');
badModal.isOpen = true;  // State changed but modal not actually opened!
// State and DOM are now out of sync

// ────────────────────────────────────────────────────────────
// WHY these patterns fail:
// ────────────────────────────────────────────────────────────
//
// Problem 1 (Global state):
//   All instances share the same variables → state collision
//   Opening one modal affects another's callback
//
// Problem 2 (Document listener leak):
//   document.addEventListener('keydown', function() {...})
//                                        ↑ anonymous!
//   - Can't call removeEventListener (no reference)
//   - Listener stays on document forever
//   - Each open() adds ANOTHER listener
//   - After 10 opens: 10 handlers fire on every keypress!
//
// Problem 3 (No guard):
//   close() should be idempotent (safe to call multiple times)
//   Without `if (!isOpen) return`, callbacks fire repeatedly
//
// Problem 4 (Exposed state):
//   Closure should HIDE state, expose only through methods
//   Direct access lets external code corrupt internal state
// ────────────────────────────────────────────────────────────

// ✅ CORRECT WAY - closure encapsulates modal state and DOM references

function createModal(modalId) {
  const modal = document.getElementById(modalId);
  const overlay = modal.querySelector('.overlay');
  const closeBtn = modal.querySelector('.close-btn');
  
  // Private state
  let isOpen = false;
  let onCloseCallback = null;
  
  const open = function(options = {}) {
    isOpen = true;
    onCloseCallback = options.onClose || null;
    modal.classList.add('visible');
    document.body.style.overflow = 'hidden';  // Prevent scroll
  };
  
  const close = function() {
    if (!isOpen) return;
    isOpen = false;
    modal.classList.remove('visible');
    document.body.style.overflow = '';
    
    // Call callback if provided (closure over onCloseCallback)
    if (onCloseCallback) {
      onCloseCallback();
      onCloseCallback = null;
    }
  };
  
  // Handlers close over the close function and modal
  const handleOverlayClick = function(event) {
    if (event.target === overlay) {
      close();
    }
  };
  
  const handleEscape = function(event) {
    if (event.key === 'Escape' && isOpen) {
      close();
    }
  };
  
  // Attach listeners
  overlay.addEventListener('click', handleOverlayClick);
  closeBtn.addEventListener('click', close);
  document.addEventListener('keydown', handleEscape);
  
  return {
    open,
    close,
    isOpen: () => isOpen,
    destroy: () => {
      close();
      overlay.removeEventListener('click', handleOverlayClick);
      closeBtn.removeEventListener('click', close);
      document.removeEventListener('keydown', handleEscape);
    }
  };
}

const confirmModal = createModal('confirm-modal');

confirmModal.open({
  onClose: () => console.log('Modal closed')
});
```
