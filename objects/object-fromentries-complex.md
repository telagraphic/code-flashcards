What is a complex scenario using Object.fromEntries() in modern web apps?
?

```javascript
// Complex: Multi-stage data pipeline with transformation

// Practical: API response normalization pipeline
class DataNormalizer {
  constructor() {
    this.stages = [];
  }
  
  addStage(name, transformer) {
    this.stages.push({ name, transformer });
    return this;
  }
  
  normalize(data) {
    let current = data;
    
    for (const stage of this.stages) {
      if (Array.isArray(current)) {
        current = current.map(item => this.normalizeObject(item, stage.transformer));
      } else {
        current = this.normalizeObject(current, stage.transformer);
      }
    }
    
    return current;
  }
  
  normalizeObject(obj, transformer) {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => {
        const result = transformer(key, value, obj);
        if (Array.isArray(result)) {
          return result; // [newKey, newValue]
        }
        return [key, result]; // Transform value only
      })
    );
  }
}

// Usage: Normalize API response
const normalizer = new DataNormalizer()
  .addStage('key-normalization', (key, value) => {
    // Convert snake_case to camelCase
    const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
    return [camelKey, value];
  })
  .addStage('value-transformation', (key, value) => {
    // Transform specific fields
    if (key === 'createdAt' || key === 'updatedAt') {
      return new Date(value);
    }
    if (key === 'price' && typeof value === 'string') {
      return parseFloat(value);
    }
    return value;
  })
  .addStage('filtering', (key, value) => {
    // Remove null values
    return value !== null ? value : null;
  });

const apiData = {
  user_name: 'Alice',
  user_age: '30',
  created_at: '2024-01-01T00:00:00Z',
  price: '99.99',
  null_field: null
};

const normalized = normalizer.normalize(apiData);
// { userName: 'Alice', userAge: '30', createdAt: Date, price: 99.99 }

// Complex: Dynamic form builder from schema
function buildFormFromSchema(schema) {
  const formFields = {};
  
  for (const [fieldName, fieldConfig] of Object.entries(schema)) {
    const field = {
      name: fieldName,
      type: fieldConfig.type || 'text',
      label: fieldConfig.label || fieldName,
      required: fieldConfig.required || false,
      defaultValue: fieldConfig.default || '',
      validation: fieldConfig.validation || null
    };
    
    formFields[fieldName] = field;
  }
  
  return formFields;
}

// Usage
const schema = {
  email: {
    type: 'email',
    label: 'Email Address',
    required: true,
    validation: (value) => value.includes('@')
  },
  age: {
    type: 'number',
    label: 'Age',
    required: false,
    default: 0
  }
};

const formFields = buildFormFromSchema(schema);

// Complex: State management with computed properties
class StateManager {
  constructor(initialState) {
    this.state = initialState;
    this.computed = {};
  }
  
  addComputed(name, dependencies, computeFn) {
    this.computed[name] = { dependencies, computeFn };
  }
  
  getState() {
    const computedValues = Object.fromEntries(
      Object.entries(this.computed).map(([name, config]) => {
        const values = config.dependencies.map(dep => this.state[dep]);
        return [name, config.computeFn(...values)];
      })
    );
    
    return { ...this.state, ...computedValues };
  }
  
  setState(updates) {
    this.state = { ...this.state, ...updates };
  }
}

// Usage
const manager = new StateManager({ items: 10, price: 5 });
manager.addComputed('total', ['items', 'price'], (items, price) => items * price);
manager.addComputed('discountedTotal', ['total'], (total) => total * 0.9);

const state = manager.getState();
// { items: 10, price: 5, total: 50, discountedTotal: 45 }
```
