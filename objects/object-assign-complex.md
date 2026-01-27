What is a complex scenario using Object.assign() in modern web apps?
?

```javascript
// Complex: Deep merge with conflict resolution

// Practical: Deep merge utility
function deepMerge(target, ...sources) {
  if (!sources.length) return target;
  const source = sources.shift();
  
  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        deepMerge(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }
  
  return deepMerge(target, ...sources);
}

function isObject(item) {
  return item && typeof item === 'object' && !Array.isArray(item);
}

// Usage
const base = {
  api: { url: 'https://api.example.com', timeout: 5000 },
  ui: { theme: 'light' }
};

const override = {
  api: { timeout: 10000 },
  ui: { theme: 'dark', fontSize: 16 }
};

const merged = deepMerge({}, base, override);
// { api: { url: 'https://api.example.com', timeout: 10000 },
//   ui: { theme: 'dark', fontSize: 16 } }

// Complex: State machine with history
class StateMachine {
  constructor(initialState) {
    this.state = initialState;
    this.history = [Object.assign({}, initialState)];
  }
  
  transition(updates) {
    const newState = Object.assign({}, this.state, updates);
    this.history.push(Object.assign({}, newState));
    this.state = newState;
    return this.state;
  }
  
  undo() {
    if (this.history.length > 1) {
      this.history.pop(); // Remove current
      this.state = Object.assign({}, this.history[this.history.length - 1]);
    }
    return this.state;
  }
  
  getHistory() {
    return this.history.map(state => Object.assign({}, state));
  }
}

// Complex: Multi-layer configuration system
class ConfigurationManager {
  constructor() {
    this.layers = [];
  }
  
  addLayer(name, config, priority = 0) {
    this.layers.push({ name, config, priority });
    this.layers.sort((a, b) => b.priority - a.priority);
  }
  
  getConfig() {
    return this.layers.reduce((result, layer) => {
      return this.deepMerge(result, layer.config);
    }, {});
  }
  
  deepMerge(target, source) {
    const result = Object.assign({}, target);
    
    for (const key in source) {
      if (isObject(source[key]) && isObject(target[key])) {
        result[key] = this.deepMerge(target[key], source[key]);
      } else {
        result[key] = source[key];
      }
    }
    
    return result;
  }
}

// Usage
const configManager = new ConfigurationManager();
configManager.addLayer('base', {
  api: { url: 'https://api.example.com' },
  ui: { theme: 'light' }
}, 0);

configManager.addLayer('environment', {
  api: { timeout: 5000 }
}, 1);

configManager.addLayer('user', {
  ui: { theme: 'dark', fontSize: 16 }
}, 2);

const finalConfig = configManager.getConfig();
// Merged configuration with user preferences overriding defaults
```
