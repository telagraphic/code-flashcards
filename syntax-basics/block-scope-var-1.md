How does var work with function scope and hoisting?
?

```javascript
// var is function-scoped, not block-scoped
// var declarations are hoisted to top of function

function example() {
  console.log(x); // undefined (hoisted but not initialized)
  var x = 5;
  console.log(x); // 5
}

// var ignores block scope
if (true) {
  var y = 10;
}
console.log(y); // 10 (accessible outside block!)

// Practical: Loop variable issue
for (var i = 0; i < 3; i++) {
  setTimeout(function() {
    console.log(i); // Prints 3, 3, 3 (all closures share same i)
  }, 100);
}

// Same thing, just with click handlers
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


// Fix: Use IIFE to create new scope
for (var i = 0; i < 3; i++) {
  (function(j) {
    setTimeout(function() {
      console.log(j); // Prints 0, 1, 2
    }, 100);
  })(i);
}

// var hoisting example
function hoistingExample() {
  console.log(hoisted); // undefined
  var hoisted = 'I am hoisted';
  console.log(hoisted); // 'I am hoisted'
}

// Equivalent to:
function hoistingExampleEquivalent() {
  var hoisted; // Declaration hoisted
  console.log(hoisted); // undefined
  hoisted = 'I am hoisted'; // Assignment stays
  console.log(hoisted); // 'I am hoisted'
}
```
