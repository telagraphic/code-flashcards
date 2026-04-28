How do you use call/apply/bind in modern React-like component patterns?
?

```javascript
// Modern component patterns with call/apply/bind

// Practical: Component method binding
class Component {
  constructor() {
    this.state = { count: 0 };
    // Bind methods in constructor
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  
  handleClick() {
    this.setState({ count: this.state.count + 1 });
  }
  
  handleChange(event) {
    this.setState({ value: event.target.value });
  }
  
  setState(updates) {
    this.state = { ...this.state, ...updates };
    this.render();
  }
  
  render() {
    // Methods are already bound, can pass directly
    return {
      onClick: this.handleClick,
      onChange: this.handleChange
    };
  }
}

// Practical: Higher-order component pattern
function withLogging(WrappedComponent) {
  return class extends WrappedComponent {
    componentDidMount() {
      // Call parent method
      if (super.componentDidMount) {
        super.componentDidMount.call(this);
      }
      console.log('Component mounted');
    }
  };
}

// Practical: Event delegation with call
class EventManager {
  constructor() {
    this.handlers = new Map();
  }
  
  register(eventType, handler, context) {
    this.handlers.set(eventType, { handler, context });
  }
  
  trigger(eventType, ...args) {
    const { handler, context } = this.handlers.get(eventType);
    // Call handler with context
    handler.call(context, ...args);
  }
}

const eventManager = new EventManager();
const component = {
  name: 'MyComponent',
  handleEvent(data) {
    console.log(`${this.name} received:`, data);
  }
};

eventManager.register('click', component.handleEvent, component);
eventManager.trigger('click', { id: 123 }); // 'MyComponent received: { id: 123 }'
```
