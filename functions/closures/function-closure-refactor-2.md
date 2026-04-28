How do you refactor inline event handlers into closure-based event delegation?
?

```javascript
// ❌ BEFORE: Inline handlers in HTML and scattered JS

/*
<ul id="todo-list">
  <li>
    <span>Buy milk</span>
    <button onclick="deleteTodo(1)">Delete</button>
    <button onclick="editTodo(1)">Edit</button>
  </li>
  <li>
    <span>Walk dog</span>
    <button onclick="deleteTodo(2)">Delete</button>
    <button onclick="editTodo(2)">Edit</button>
  </li>
</ul>
*/

// Global functions required for onclick
var todos = [
  { id: 1, text: 'Buy milk' },
  { id: 2, text: 'Walk dog' }
];

function deleteTodo(id) {
  todos = todos.filter(t => t.id !== id);
  renderTodos();  // Must re-render entire list
}

function editTodo(id) {
  var newText = prompt('Edit todo:');
  if (newText) {
    var todo = todos.find(t => t.id === id);
    todo.text = newText;
    renderTodos();
  }
}

function renderTodos() {
  var html = '';
  for (var i = 0; i < todos.length; i++) {
    html += '<li><span>' + todos[i].text + '</span>' +
      '<button onclick="deleteTodo(' + todos[i].id + ')">Delete</button>' +
      '<button onclick="editTodo(' + todos[i].id + ')">Edit</button></li>';
  }
  document.getElementById('todo-list').innerHTML = html;
}

// Problems:
// - Global functions pollute namespace
// - HTML and JS tightly coupled
// - onclick strings are hard to debug
// - Each render creates new handlers
// - No way to clean up

// ────────────────────────────────────────────────────────────

// ✅ AFTER: Closure with event delegation

function createTodoList(containerId) {
  const container = document.getElementById(containerId);
  // ────────────────────────────────────────────────────────────
  // These variables live in createTodoList's scope.
  // Any function defined inside this scope has access to them
  // via closure — not a copy, but the ACTUAL variables.
  // If these were global, each createTodoList instance would delete from the global state!
  // ────────────────────────────────────────────────────────────
  let todos = [];
  let nextId = 1;
  
  // Single delegated handler (closure over todos)
  //
  // handleClick "closes over" the todos variable above.
  // This means:
  //   1. handleClick holds a reference to todos (not a copy)
  //   2. When handleClick reads/writes todos, it's the SAME array
  //   3. Changes persist because we're modifying the original
  //
  const handleClick = (event) => {
    const button = event.target.closest('button');
    if (!button) return;
    
    const todoId = parseInt(button.dataset.todoId);
    const action = button.dataset.action;
    
    if (action === 'delete') {
      // todos here is the SAME variable declared above, not a copy.
      // We reassign it to a new filtered array.
      // Because it's the same variable (via closure), the change
      // is visible everywhere else that references todos.
      todos = todos.filter(t => t.id !== todoId);
      render();  // render() also closes over todos, sees the update
    }
    
    if (action === 'edit') {
      const newText = prompt('Edit todo:');
      if (newText) {
        // find() returns a reference to the actual object in the array.
        // Modifying todo.text mutates the object inside todos.
        const todo = todos.find(t => t.id === todoId);
        if (todo) todo.text = newText;
        render();  // render() sees the mutated object
      }
    }
  };
  
  // ────────────────────────────────────────────────────────────
  // WHY THIS WORKS (within one instance):
  // ────────────────────────────────────────────────────────────
  //
  // Memory model for ONE createTodoList call:
  //
  //   createTodoList's scope
  //   ┌─────────────────────────────────┐
  //   │  todos ──────────────────────┐  │
  //   │  nextId = 1                  │  │
  //   │                              ▼  │
  //   │                         [ array in memory ]
  //   │                              ▲  │
  //   │  handleClick() ──────────────┘  │  (closure reference)
  //   │  render() ───────────────────┘  │  (closure reference)
  //   │  add() ──────────────────────┘  │  (closure reference)
  //   └─────────────────────────────────┘
  //
  // All functions point to the SAME todos variable.
  // There's only ONE array in memory — all functions share it.
  //
  // If we had passed todos as a parameter instead:
  //
  //   const handleClick = (todosParam) => { ... }
  //
  // Then todosParam would be a reference to the same array
  // at call time, BUT if we reassigned it:
  //
  //   todosParam = todosParam.filter(...)
  //
  // That would only change the local parameter, not the
  // outer todos variable. Closure avoids this problem.
  //
  // ────────────────────────────────────────────────────────────
  // MULTIPLE INSTANCES: Each call creates a NEW closure
  // ────────────────────────────────────────────────────────────
  //
  // When you call createTodoList() multiple times, each call:
  //   1. Creates a NEW execution context (scope)
  //   2. Declares NEW local variables (todos, nextId, etc.)
  //   3. Creates NEW function objects (handleClick, render, add)
  //   4. Those functions close over THEIR OWN scope's variables
  //
  // const list1 = createTodoList('container-1');
  // const list2 = createTodoList('container-2');
  //
  // Memory model with TWO instances:
  //
  //   ┌─────────────────────────────────┐
  //   │  CLOSURE #1 (list1's scope)     │
  //   │  ┌───────────────────────────┐  │
  //   │  │ todos₁ = []               │  │
  //   │  │ nextId₁ = 1               │  │
  //   │  │ handleClick₁() ───────────┼──┼── closes over todos₁
  //   │  │ render₁() ────────────────┼──┼── closes over todos₁
  //   │  │ add₁() ───────────────────┼──┼── closes over todos₁
  //   │  └───────────────────────────┘  │
  //   └─────────────────────────────────┘
  //
  //   ┌─────────────────────────────────┐
  //   │  CLOSURE #2 (list2's scope)     │
  //   │  ┌───────────────────────────┐  │
  //   │  │ todos₂ = []               │  │  ← DIFFERENT array!
  //   │  │ nextId₂ = 1               │  │  ← DIFFERENT variable!
  //   │  │ handleClick₂() ───────────┼──┼── closes over todos₂
  //   │  │ render₂() ────────────────┼──┼── closes over todos₂
  //   │  │ add₂() ───────────────────┼──┼── closes over todos₂
  //   │  └───────────────────────────┘  │
  //   └─────────────────────────────────┘
  //
  // list1 and list2 are COMPLETELY INDEPENDENT:
  //   - list1.add('Task A') → adds to todos₁
  //   - list2.add('Task B') → adds to todos₂
  //   - Deleting from list1 does NOT affect list2
  //
  // This is the power of closures for creating instances:
  //   - Each call to createTodoList() is like creating a new "object"
  //   - The local variables are like "private instance properties"
  //   - The returned functions are like "public methods"
  //   - No class needed — just functions and closures!
  //
  // Compare to the WRONG WAY with global variables:
  //
  //   let globalTodos = [];  // ONE array shared by everyone!
  //
  //   function createTodoListBad(containerId) {
  //     return {
  //       add: (text) => {
  //         globalTodos.push({ text });  // All instances modify same array!
  //       }
  //     };
  //   }
  //
  //   const list1 = createTodoListBad('a');
  //   const list2 = createTodoListBad('b');
  //   list1.add('Task');  // Goes into globalTodos
  //   list2.add('Task');  // Also goes into same globalTodos!
  //   // Both lists show both tasks — NOT independent!
  //
  // ────────────────────────────────────────────────────────────
  
  const render = () => {
    container.innerHTML = todos.map(todo => `
      <li data-id="${todo.id}">
        <span>${todo.text}</span>
        <button data-todo-id="${todo.id}" data-action="delete">Delete</button>
        <button data-todo-id="${todo.id}" data-action="edit">Edit</button>
      </li>
    `).join('');
  };
  
  // One listener on container — handles all buttons
  container.addEventListener('click', handleClick);
  
  return {
    add: (text) => {
      todos.push({ id: nextId++, text });
      render();
    },
    getAll: () => [...todos],
    destroy: () => {
      container.removeEventListener('click', handleClick);
      container.innerHTML = '';
    }
  };
}

// Usage
const todoList = createTodoList('todo-list');
todoList.add('Buy milk');
todoList.add('Walk dog');

// Improvements:
// ✓ No global functions
// ✓ HTML uses data attributes, not onclick
// ✓ ONE event listener (delegation) handles all items
// ✓ New items automatically work (no new handlers needed)
// ✓ State is private in closure
// ✓ Proper cleanup with destroy()
```
