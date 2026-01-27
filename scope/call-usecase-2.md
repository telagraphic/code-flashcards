How do you use call() for method chaining and context switching?
?

```javascript
// call() for method chaining with different contexts

// Practical: Logging utility with context
class Logger {
  log(message) {
    console.log(`[${this.context}] ${message}`);
    return this; // Enable chaining
  }
}

const apiLogger = { context: 'API' };
const dbLogger = { context: 'Database' };

Logger.prototype.log.call(apiLogger, 'Request started');
Logger.prototype.log.call(dbLogger, 'Query executed');

// Practical: Event handler with context
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

const button1 = new Button('Submit');
const button2 = new Button('Cancel');

// Call same method with different contexts
button1.handleClick.call(button1); // 'Submit clicked 1 times'
button2.handleClick.call(button2); // 'Cancel clicked 1 times'

// Practical: Utility functions with context
function formatCurrency(amount) {
  const symbol = this.symbol || '$';
  const locale = this.locale || 'en-US';
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: symbol === '$' ? 'USD' : 'EUR'
  }).format(amount);
}

const usConfig = { symbol: '$', locale: 'en-US' };
const euConfig = { symbol: '€', locale: 'de-DE' };

console.log(formatCurrency.call(usConfig, 100)); // '$100.00'
console.log(formatCurrency.call(euConfig, 100)); // '100,00 €'

// Practical: Polymorphic function calls
function processData(data) {
  return this.processor(data);
}

const stringProcessor = {
  processor: (data) => data.toUpperCase()
};

const numberProcessor = {
  processor: (data) => data * 2
};

console.log(processData.call(stringProcessor, 'hello')); // 'HELLO'
console.log(processData.call(numberProcessor, 5)); // 10
```
