How do you create a class with methods for a React-like component pattern?
?

```javascript
// Component class with methods
class TodoComponent {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.todos = [];
  }
  
  addTodo(text) {
    const todo = {
      id: Date.now(),
      text: text,
      completed: false
    };
    this.todos.push(todo);
    this.render();
    return todo;
  }
  
  toggleTodo(id) {
    const todo = this.todos.find(t => t.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      this.render();
    }
  }
  
  deleteTodo(id) {
    this.todos = this.todos.filter(t => t.id !== id);
    this.render();
  }
  
  render() {
    this.container.innerHTML = this.todos.map(todo => `
      <div class="todo ${todo.completed ? 'completed' : ''}">
        <input type="checkbox" ${todo.completed ? 'checked' : ''} 
               onchange="todoComponent.toggleTodo(${todo.id})">
        <span>${todo.text}</span>
        <button onclick="todoComponent.deleteTodo(${todo.id})">Delete</button>
      </div>
    `).join('');
  }
}

// Usage
const todoComponent = new TodoComponent('todo-list');
todoComponent.addTodo('Learn JavaScript');
```
