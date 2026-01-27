How do you use bind() to create event handlers that maintain object context?
?

```javascript
// Component-like object
const buttonController = {
  count: 0,
  increment: function() {
    this.count++;
    document.getElementById('counter').textContent = this.count;
  },
  reset: function() {
    this.count = 0;
    document.getElementById('counter').textContent = this.count;
  }
};

// Bind methods to maintain 'this' context
document.getElementById('incrementBtn').addEventListener(
  'click',
  buttonController.increment.bind(buttonController)
);

document.getElementById('resetBtn').addEventListener(
  'click',
  buttonController.reset.bind(buttonController)
);
```
