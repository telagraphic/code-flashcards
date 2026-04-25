
Write a modal component that has:

- private, non-global state
- Uses named event listeners to prevent memory-leaks and properly scoped references
- Implement show, hide, isOpen, remove API for the modalComponent
- Gaurd clauses for multiple calls when calling close method
- Only expose a boolean for isOpen for external checking


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