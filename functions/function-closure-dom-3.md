How do you use closures for debouncing DOM events like input or scroll?
?

```javascript
// ❌ WRONG WAY - common mistakes with debouncing

// Problem 1: Global timeout - all debounced functions share the same timeoutId!
let globalTimeoutId = null;  // Shared across ALL instances!

function createDebouncedSearchBad1(inputId, resultsId, delay = 300) {
  const input = document.getElementById(inputId);
  const results = document.getElementById(resultsId);
  
  const handleInput = function(event) {
    const query = event.target.value.trim();
    
    // Bad: Modifies global variable - affects ALL search instances!
    if (globalTimeoutId) {
      clearTimeout(globalTimeoutId);
    }
    
    globalTimeoutId = setTimeout(() => {
      performSearch(query);
    }, delay);
  };
  
  input.addEventListener('input', handleInput);
}

// Usage showing the problem:
const search1 = createDebouncedSearchBad1('search1', 'results1');
const search2 = createDebouncedSearchBad1('search2', 'results2');
// Typing in search1 clears timeout for search2! They interfere with each other!

// Problem 2: Anonymous handler - can't remove event listener
function createDebouncedSearchBad2(inputId, resultsId, delay = 300) {
  const input = document.getElementById(inputId);
  const results = document.getElementById(resultsId);
  let timeoutId = null;  // Good: local variable
  
  // Bad: Anonymous function - no reference to remove it later
  input.addEventListener('input', function(event) {
    const query = event.target.value.trim();
    
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    
    timeoutId = setTimeout(() => {
      performSearch(query);
    }, delay);
  });
  
  return {
    destroy: () => {
      // Can't remove listener! No reference to the handler function
      // Memory leak: handler stays attached forever
      // Also: timeoutId might still fire after destroy!
      if (timeoutId) clearTimeout(timeoutId);
      // But handler is still attached - will create new timeouts!
    }
  };
}

// Problem 3: Creating new handler in removeEventListener
function createDebouncedSearchBad3(inputId, resultsId, delay = 300) {
  const input = document.getElementById(inputId);
  const results = document.getElementById(resultsId);
  let timeoutId = null;
  
  input.addEventListener('input', function handleInput(event) {
    const query = event.target.value.trim();
    
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    
    timeoutId = setTimeout(() => {
      performSearch(query);
    }, delay);
  });
  
  return {
    destroy: () => {
      // This creates a NEW function - won't match the original!
      input.removeEventListener('input', function handleInput(event) {
        // Different function object - removeEventListener won't find it!
      });
      // Original handler still attached - memory leak!
      // timeoutId might still fire!
    }
  };
}

// ────────────────────────────────────────────────────────────
// WHY Problem 3 fails: Function identity matters
// ────────────────────────────────────────────────────────────
//
// Each function definition creates a NEW function object:
//
//   const fn1 = function handleInput() { };
//   const fn2 = function handleInput() { };
//   console.log(fn1 === fn2);  // false - different objects!
//
// Memory model:
//
//   ┌─────────────────────────────────────┐
//   │ Function Object #1  (address: 0x1A) │ ← attached to input
//   │   code: "handleInput logic"         │
//   │   closure: { timeoutId, ... }      │
//   └─────────────────────────────────────┘
//
//   ┌─────────────────────────────────────┐
//   │ Function Object #2  (address: 0x2B) │ ← passed to remove
//   │   code: "handleInput logic"         │
//   │   closure: { timeoutId, ... }      │
//   └─────────────────────────────────────┘
//
//   Input's listeners: [ 0x1A ]  ← still has Object #1!
//   removeEventListener looks for 0x2B... not found!
//
// Key: You MUST save the reference when adding, use it when removing.
// ────────────────────────────────────────────────────────────

// Problem 4: Not clearing timeout on destroy
function createDebouncedSearchBad4(inputId, resultsId, delay = 300) {
  const input = document.getElementById(inputId);
  const results = document.getElementById(resultsId);
  let timeoutId = null;
  
  const handleInput = function(event) {
    const query = event.target.value.trim();
    
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    
    timeoutId = setTimeout(() => {
      performSearch(query);  // This might fire AFTER destroy!
    }, delay);
  };
  
  input.addEventListener('input', handleInput);
  
  return {
    destroy: () => {
      input.removeEventListener('input', handleInput);  // Good!
      // Bad: Forgot to clear timeoutId!
      // If user typed recently, performSearch will still fire!
      // Results in: "Cannot read property 'innerHTML' of null" errors
    }
  };
}

// Problem 5: Closure over stale variables in loops
function createMultipleDebouncedInputsBad(inputIds, delay = 300) {
  const handlers = [];
  
  // Using var creates closure over SAME i for all handlers
  for (var i = 0; i < inputIds.length; i++) {
    const input = document.getElementById(inputIds[i]);
    let timeoutId = null;
    
    // Bad: Closure over 'i' - all handlers see the LAST value!
    input.addEventListener('input', function(event) {
      const query = event.target.value.trim();
      
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      
      // Bug: i is always inputIds.length when handler fires!
      console.log('Processing input:', i);  // Always the last index!
      timeoutId = setTimeout(() => {
        performSearchForInput(i, query);  // Wrong input index!
      }, delay);
    });
  }
}

// ────────────────────────────────────────────────────────────
// WHY var vs let matters in debouncing loops:
// ────────────────────────────────────────────────────────────
//
// VAR: ONE variable shared by all iterations
//
//   for (var i = 0; i < 3; i++) {
//     input.addEventListener('input', function() {
//       console.log(i);  // All handlers see i = 3!
//     });
//   }
//
//   Memory model:
//   ┌─────────────────────────────┐
//   │  i = 3  (single variable)   │  ← shared by all closures
//   └─────────────────────────────┘
//         ↑         ↑         ↑
//     handler0  handler1  handler2
//
//   All handlers log: 3 (wrong!)
//
// ────────────────────────────────────────────────────────────
//
// LET: NEW variable per iteration
//
//   for (let i = 0; i < 3; i++) {
//     input.addEventListener('input', function() {
//       console.log(i);  // Each handler sees its own i!
//     });
//   }
//
//   Memory model:
//   ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
//   │  i₀ = 0      │  │  i₁ = 1      │  │  i₂ = 2      │
//   └──────────────┘  └──────────────┘  └──────────────┘
//         ↑                 ↑                 ↑
//     handler0          handler1          handler2
//
//   Each handler logs correct index!
// ────────────────────────────────────────────────────────────

// Problem 6: Multiple debounced functions interfering
let sharedTimeoutId = null;  // Shared across functions!

function debounceBad1(fn, delay) {
  return function(...args) {
    // Bad: All debounced functions share the same timeoutId
    if (sharedTimeoutId) {
      clearTimeout(sharedTimeoutId);
    }
    
    sharedTimeoutId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

const debouncedSearch = debounceBad1(performSearch, 300);
const debouncedResize = debounceBad1(handleResize, 300);
// Typing in search cancels resize handler! They interfere!

// ────────────────────────────────────────────────────────────
// WHY closures are essential for debouncing:
// ────────────────────────────────────────────────────────────
//
// Each debounced function needs its OWN timeoutId:
//
//   function debounce(fn, delay) {
//     let timeoutId = null;  // Private to THIS debounced function
//     return function(...args) {
//       clearTimeout(timeoutId);  // Clears only THIS function's timeout
//       timeoutId = setTimeout(() => fn(...args), delay);
//     };
//   }
//
//   const debounced1 = debounce(fn1, 300);  // Has its own timeoutId
//   const debounced2 = debounce(fn2, 300);  // Has its own timeoutId
//   // They don't interfere with each other!
//
// ────────────────────────────────────────────────────────────

// ✅ CORRECT WAY - closure with saved handler reference

// Closure keeps track of the timeout between calls

function createDebouncedSearch(inputId, resultsId, delay = 300) {
  const input = document.getElementById(inputId);
  const results = document.getElementById(resultsId);
  
  // Private state - closure variables
  let timeoutId = null;
  let lastQuery = '';
  
  const performSearch = async function(query) {
    results.innerHTML = 'Searching...';
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      const data = await response.json();
      results.innerHTML = data.map(item => `<div>${item.name}</div>`).join('');
    } catch (error) {
      results.innerHTML = 'Search failed';
    }
  };
  
  // Handler closes over timeoutId, lastQuery, performSearch
  const handleInput = function(event) {
    const query = event.target.value.trim();
    
    // Clear previous timeout (closure over timeoutId)
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    
    if (query === lastQuery) return;
    lastQuery = query;
    
    if (query.length < 2) {
      results.innerHTML = '';
      return;
    }
    
    // Set new timeout (updates timeoutId in closure)
    timeoutId = setTimeout(() => {
      performSearch(query);
    }, delay);
  };
  
  input.addEventListener('input', handleInput);
  
  return {
    clear: () => {
      if (timeoutId) clearTimeout(timeoutId);
      input.value = '';
      results.innerHTML = '';
      lastQuery = '';
    },
    destroy: () => {
      if (timeoutId) clearTimeout(timeoutId);
      input.removeEventListener('input', handleInput);
    }
  };
}

const search = createDebouncedSearch('search-input', 'search-results', 300);

// Cleanup when component unmounts
search.destroy();

// ────────────────────────────────────────────────────────────
// HOW the closure works for debouncing:
// ────────────────────────────────────────────────────────────
//
// Each call to createDebouncedSearch creates a NEW closure:
//
//   const search1 = createDebouncedSearch('input1', 'results1');
//   const search2 = createDebouncedSearch('input2', 'results2');
//
//   Memory model:
//
//   ┌─────────────────────────────────────────────┐
//   │ Closure #1 (search1)                        │
//   │   timeoutId: null → setTimeout ID          │
//   │   lastQuery: '' → 'alice' → 'bob'         │
//   │   input: <input#input1>                    │
//   │   results: <div#results1>                  │
//   │   handleInput: function (references closure)│
//   └─────────────────────────────────────────────┘
//
//   ┌─────────────────────────────────────────────┐
//   │ Closure #2 (search2)                        │
//   │   timeoutId: null → setTimeout ID          │
//   │   lastQuery: '' → 'charlie'                │
//   │   input: <input#input2>                    │
//   │   results: <div#results2>                  │
//   │   handleInput: function (references closure)│
//   └─────────────────────────────────────────────┘
//
//   Each closure maintains its OWN timeoutId and lastQuery.
//   They don't interfere with each other!
//
// ────────────────────────────────────────────────────────────
//
// Timeline of debouncing:
//
//   t=0ms:   User types 'a'
//            → clearTimeout(null) [no-op]
//            → setTimeout(performSearch, 300)
//            → timeoutId = 123
//
//   t=50ms:  User types 'al'
//            → clearTimeout(123) [cancels previous]
//            → setTimeout(performSearch, 300)
//            → timeoutId = 124
//
//   t=100ms: User types 'ali'
//            → clearTimeout(124) [cancels previous]
//            → setTimeout(performSearch, 300)
//            → timeoutId = 125
//
//   t=400ms: Timeout fires (300ms after last keystroke)
//            → performSearch('ali') executes
//            → timeoutId = null
//
// Only ONE search request is made, even though user typed 3 times!
//
// ────────────────────────────────────────────────────────────
//
// Key points:
//   1. timeoutId must be in closure (not global) - each instance needs own
//   2. Handler reference must be saved - for cleanup
//   3. Clear timeout in destroy() - prevent stale callbacks
//   4. Use let/const in loops - avoid closure over stale variables
//   5. Each debounced function gets its own closure - no interference
// ────────────────────────────────────────────────────────────
```
