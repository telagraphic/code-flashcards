How do you use closures for event delegation with element-specific data?
?

```javascript
// ❌ WRONG WAY - common mistakes with dynamic element handling

// Problem 1: Attaching listeners to EACH element (not delegating)
function createTodoListBad1(containerId) {
  const container = document.getElementById(containerId);
  let todos = [];
  let nextId = 1;
  
  const render = function() {
    container.innerHTML = '';
    
    todos.forEach(todo => {
      const div = document.createElement('div');
      div.innerHTML = `
        <span>${todo.text}</span>
        <button class="delete-btn">Delete</button>
      `;
      
      // Bad: New listener for EACH button, EACH render!
      div.querySelector('.delete-btn').addEventListener('click', function() {
        todos = todos.filter(t => t.id !== todo.id);
        render();  // Re-renders → creates MORE listeners
      });
      // Problems:
      // - Old listeners pile up (memory leak)
      // - Can't remove them (anonymous functions)
      // - Each render doubles the listeners!
      
      container.appendChild(div);
    });
  };
  
  return {
    add: (text) => {
      todos.push({ id: nextId++, text, done: false });
      render();
    },
    destroy: () => {
      // Can't clean up! We have no references to the handlers
      // Dozens of orphaned listeners stay in memory
    }
  };
}

// Problem 2: Global state - all lists share the same todos!
let globalTodos = [];  // Shared across all instances!
let globalNextId = 1;

function createTodoListBad2(containerId) {
  const container = document.getElementById(containerId);
  
  const handleClick = function(event) {
    if (event.target.classList.contains('delete-btn')) {
      const todoId = parseInt(event.target.dataset.id);
      globalTodos = globalTodos.filter(t => t.id !== todoId);  // Modifies global!
      render();
    }
  };
  
  const render = function() {
    container.innerHTML = globalTodos.map(todo => `
      <div><span>${todo.text}</span>
        <button class="delete-btn" data-id="${todo.id}">Delete</button>
      </div>
    `).join('');
  };
  
  container.addEventListener('click', handleClick);
  
  return {
    add: (text) => {
      globalTodos.push({ id: globalNextId++, text });
      render();
    }
  };
}

// Usage showing the problem:
const listA = createTodoListBad2('container-a');
const listB = createTodoListBad2('container-b');
listA.add('Task 1');
// Both listA AND listB show 'Task 1' — they share globalTodos!

// Problem 3: Closure over stale loop variable
function createTodoListBad3(containerId) {
  const container = document.getElementById(containerId);
  let todos = [];
  
  const render = function() {
    container.innerHTML = '';
    
    // Using var creates a closure over the SAME i for all handlers
    for (var i = 0; i < todos.length; i++) {
      const div = document.createElement('div');
      div.innerHTML = `<span>${todos[i].text}</span>
        <button class="delete-btn">Delete</button>`;
      
      div.querySelector('.delete-btn').addEventListener('click', function() {
        // Bug: i is always todos.length when clicked (loop finished)
        console.log('Deleting index:', i);  // Always the last index!
        todos.splice(i, 1);  // Wrong item deleted
        render();
      });
      
      container.appendChild(div);
    }
  };
  
  return {
    add: (text) => {
      todos.push({ text });
      render();
    }
  };
}

// ────────────────────────────────────────────────────────────
// WHY var vs let/const matters in loops:
// ────────────────────────────────────────────────────────────
//
// VAR is function-scoped: ONE variable shared by all iterations
//
//   for (var i = 0; i < 3; i++) {
//     handlers.push(function() { return i; });
//   }
//   // All handlers point to the SAME 'i', which is now 3
//
//   Memory model:
//   ┌─────────────────────────────┐
//   │  i = 3  (single variable)   │  ← shared by all closures
//   └─────────────────────────────┘
//         ↑         ↑         ↑
//     handler0  handler1  handler2
//
//   handlers[0]() → 3
//   handlers[1]() → 3
//   handlers[2]() → 3
//
// ────────────────────────────────────────────────────────────
//
// LET is block-scoped: NEW variable created per iteration
//
//   for (let i = 0; i < 3; i++) {
//     handlers.push(function() { return i; });
//   }
//   // Each handler has its OWN 'i' frozen at creation time
//
//   Memory model:
//   ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
//   │  i₀ = 0      │  │  i₁ = 1      │  │  i₂ = 2      │
//   └──────────────┘  └──────────────┘  └──────────────┘
//         ↑                 ↑                 ↑
//     handler0          handler1          handler2
//
//   handlers[0]() → 0 ✓
//   handlers[1]() → 1 ✓
//   handlers[2]() → 2 ✓
//
// ────────────────────────────────────────────────────────────
//
// Old workaround (before ES6): IIFE to create new scope
//
//   for (var i = 0; i < 3; i++) {
//     (function(j) {  // IIFE creates new scope
//       handlers.push(function() { return j; });
//     })(i);  // Pass current 'i' as 'j'
//   }
//
// This manually creates what 'let' does automatically.
//
// Summary:
//   var   → function scope → ONE variable → all closures share it
//   let   → block scope    → NEW variable per iteration → each closure has its own
// ────────────────────────────────────────────────────────────

// ────────────────────────────────────────────────────────────
// WHY event delegation is better:
// ────────────────────────────────────────────────────────────
//
// Without delegation (Bad1):
//   Button1 → handler1 (closes over todo1)
//   Button2 → handler2 (closes over todo2)
//   Button3 → handler3 (closes over todo3)
//   ... (N handlers, each with its own closure)
//
//   After re-render:
//   Button1' → handler1' (NEW handler)
//   Button2' → handler2' (NEW handler)
//   ... (old handlers still in memory, orphaned!)
//
// With delegation (Correct):
//   Container → ONE handler (closes over todos array)
//
//   After re-render:
//   Container → SAME handler (still works with new elements!)
//   Uses data-id attributes to identify which item was clicked
// ────────────────────────────────────────────────────────────

// ✅ CORRECT WAY - event delegation with closure

function createTodoList(containerId) {
  const container = document.getElementById(containerId);
  let todos = [];  // Private state
  let nextId = 1;
  
  // Single click handler on container (event delegation), creates a closure around todos
  const handleClick = function(event) {
    const target = event.target;
    
    if (target.classList.contains('delete-btn')) {
      const todoId = parseInt(target.dataset.id);
      todos = todos.filter(t => t.id !== todoId);  // Closure over todos
      render();
    }
    
    if (target.classList.contains('toggle-btn')) {
      const todoId = parseInt(target.dataset.id);
      const todo = todos.find(t => t.id === todoId);
      if (todo) {
        todo.done = !todo.done;
        render();
      }
    }
  };
 
  // Creates a closure around todos
  const render = function() {
    container.innerHTML = todos.map(todo => `
      <div class="todo ${todo.done ? 'done' : ''}">
        <span>${todo.text}</span>
        <button class="toggle-btn" data-id="${todo.id}">Toggle</button>
        <button class="delete-btn" data-id="${todo.id}">Delete</button>
      </div>
    `).join('');
  };
  
  container.addEventListener('click', handleClick);
  
  return {
    add: (text) => {
      todos.push({ id: nextId++, text, done: false });
      render();
    },
    getAll: () => [...todos],  // Return copy
    destroy: () => {
      container.removeEventListener('click', handleClick);
      container.innerHTML = '';
    }
  };
}

const list = createTodoList('todo-container');
list.add('Learn closures');
list.add('Build app');
```
