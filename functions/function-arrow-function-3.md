How do you use arrow functions to maintain lexical 'this' binding?
?

```javascript
// Arrow function preserves 'this' from surrounding context
class Button {
  constructor(text) {
    this.text = text;
    this.clickCount = 0;
  }
  
  // Arrow function preserves 'this'
  handleClick = () => {
    this.clickCount++;
    console.log(`${this.text} clicked ${this.clickCount} times`);
  }
  
  // Regular function would lose 'this'
  handleClickWrong() {
    this.clickCount++; // 'this' might be undefined
  }
}

const button = new Button('Submit');
document.getElementById('btn').addEventListener('click', button.handleClick);

// Another example: object method
const timer = {
  seconds: 0,
  start() {
    setInterval(() => {
      this.seconds++; // 'this' refers to timer
      document.getElementById('timer').textContent = this.seconds;
    }, 1000);
  }
};

timer.start();
```
