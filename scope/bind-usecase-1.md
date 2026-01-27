How do you use bind() to fix 'this' context in event handlers?
?

```javascript
// bind() creates a new function with bound 'this' context

// Common problem: 'this' lost in event handlers
class Button {
  constructor(label) {
    this.label = label;
    this.clickCount = 0;
  }
  
  handleClick() {
    this.clickCount++;
    console.log(`${this.label} clicked ${this.clickCount} times`);
  }
}

const button = new Button('Submit');

// Problem: 'this' is lost
// document.getElementById('btn').addEventListener('click', button.handleClick);

// Solution: bind 'this'
document.getElementById('btn').addEventListener('click', button.handleClick.bind(button));

// Practical: Multiple buttons with same handler
class FormHandler {
  constructor() {
    this.formData = {};
  }
  
  handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    this.formData = Object.fromEntries(formData);
    this.submit();
  }
  
  submit() {
    console.log('Submitting:', this.formData);
  }
}

const formHandler = new FormHandler();
document.getElementById('myForm').addEventListener(
  'submit',
  formHandler.handleSubmit.bind(formHandler)
);

// Practical: setTimeout/setInterval with context
class Timer {
  constructor() {
    this.count = 0;
  }
  
  tick() {
    this.count++;
    console.log(`Tick ${this.count}`);
  }
  
  start() {
    // Bind 'this' for setInterval
    setInterval(this.tick.bind(this), 1000);
  }
}

const timer = new Timer();
timer.start(); // 'this' correctly refers to timer instance
```
