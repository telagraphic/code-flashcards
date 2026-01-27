What is a complex scenario using Object.create() in modern web apps?
?

```javascript
// Complex: Component system with mixins and composition

// Practical: Component factory with mixins
class ComponentFactory {
  static create(basePrototype, ...mixins) {
    // Start with base prototype
    let component = Object.create(basePrototype);
    
    // Apply mixins
    for (const mixin of mixins) {
      component = Object.assign(Object.create(component), mixin);
    }
    
    return component;
  }
}

// Base component prototype
const BaseComponent = {
  init() {
    this.state = {};
    this.props = {};
  },
  render() {
    return '<div>Base Component</div>';
  },
  setState(updates) {
    this.state = Object.assign({}, this.state, updates);
    this.update();
  },
  update() {
    // Trigger re-render
  }
};

// Mixins
const EventMixin = {
  on(event, handler) {
    if (!this._handlers) this._handlers = {};
    if (!this._handlers[event]) this._handlers[event] = [];
    this._handlers[event].push(handler);
  },
  emit(event, data) {
    if (this._handlers && this._handlers[event]) {
      this._handlers[event].forEach(handler => handler(data));
    }
  }
};

const ValidationMixin = {
  validate() {
    const errors = [];
    if (this.validators) {
      for (const [field, validator] of Object.entries(this.validators)) {
        const value = this.state[field];
        if (!validator(value)) {
          errors.push({ field, message: `Invalid ${field}` });
        }
      }
    }
    return errors;
  }
};

// Create component with mixins
const FormComponent = ComponentFactory.create(
  BaseComponent,
  EventMixin,
  ValidationMixin
);

const form = Object.create(FormComponent);
form.init();
form.validators = {
  email: (value) => value && value.includes('@'),
  age: (value) => value && value >= 18
};

// Complex: Plugin system with prototype chain
class PluginSystem {
  constructor() {
    this.plugins = [];
    this.base = Object.create(null);
  }
  
  register(plugin) {
    this.plugins.push(plugin);
    // Create new prototype chain with plugin
    this.base = Object.assign(Object.create(this.base), plugin);
  }
  
  createInstance(initialData) {
    const instance = Object.create(this.base);
    Object.assign(instance, initialData);
    return instance;
  }
}

// Usage
const system = new PluginSystem();

system.register({
  log(message) {
    console.log(`[LOG] ${message}`);
  }
});

system.register({
  error(message) {
    console.error(`[ERROR] ${message}`);
  }
});

const logger = system.createInstance({ name: 'AppLogger' });
logger.log('Application started');
logger.error('Something went wrong');

// Complex: State machine with prototype methods
function createStateMachine(states, initialState) {
  const machine = Object.create({
    transition(toState) {
      if (this.canTransition(toState)) {
        const fromState = this.currentState;
        this.currentState = toState;
        this.onTransition?.(fromState, toState);
      }
    },
    canTransition(toState) {
      return this.states[this.currentState]?.includes(toState) || false;
    }
  });
  
  machine.states = states;
  machine.currentState = initialState;
  
  return machine;
}

const states = {
  idle: ['loading'],
  loading: ['success', 'error'],
  success: ['idle'],
  error: ['idle', 'loading']
};

const machine = createStateMachine(states, 'idle');
machine.onTransition = (from, to) => {
  console.log(`State changed: ${from} -> ${to}`);
};

machine.transition('loading');
machine.transition('success');
```
