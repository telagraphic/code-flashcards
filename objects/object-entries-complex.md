What is a complex scenario using Object.entries() in modern web apps?
?

```javascript
// Complex: Deep object diff and patch system

// Practical: Calculate deep differences between objects
function deepDiff(obj1, obj2, path = '') {
  const diff = {};
  const allKeys = new Set([
    ...Object.keys(obj1),
    ...Object.keys(obj2)
  ]);
  
  for (const key of allKeys) {
    const currentPath = path ? `${path}.${key}` : key;
    const val1 = obj1[key];
    const val2 = obj2[key];
    
    if (!(key in obj1)) {
      diff[currentPath] = { type: 'added', value: val2 };
    } else if (!(key in obj2)) {
      diff[currentPath] = { type: 'removed', value: val1 };
    } else if (typeof val1 === 'object' && val1 !== null && 
                typeof val2 === 'object' && val2 !== null &&
                !Array.isArray(val1) && !Array.isArray(val2)) {
      const nestedDiff = deepDiff(val1, val2, currentPath);
      Object.assign(diff, nestedDiff);
    } else if (val1 !== val2) {
      diff[currentPath] = {
        type: 'changed',
        oldValue: val1,
        newValue: val2
      };
    }
  }
  
  return diff;
}

// Complex: Object transformation pipeline
class ObjectTransformer {
  constructor() {
    this.stages = [];
  }
  
  addStage(name, transformer) {
    this.stages.push({ name, transformer });
    return this;
  }
  
  transform(obj) {
    let current = obj;
    
    for (const stage of this.stages) {
      const entries = Object.entries(current);
      const transformed = {};
      
      for (const [key, value] of entries) {
        const result = stage.transformer(key, value, current);
        if (result !== null && result !== undefined) {
          if (Array.isArray(result)) {
            const [newKey, newValue] = result;
            transformed[newKey] = newValue;
          } else {
            transformed[key] = result;
          }
        }
      }
      
      current = transformed;
    }
    
    return current;
  }
}

// Usage
const transformer = new ObjectTransformer()
  .addStage('normalize', (key, value) => {
    // Convert keys to lowercase
    return [key.toLowerCase(), value];
  })
  .addStage('filter', (key, value) => {
    // Remove null values
    return value !== null ? value : null;
  })
  .addStage('transform', (key, value) => {
    // Transform string values
    if (typeof value === 'string') {
      return value.trim().toUpperCase();
    }
    return value;
  });

const data = { Name: '  Alice  ', Age: 30, Email: null };
const result = transformer.transform(data);
// { name: 'ALICE', age: 30 }

// Complex: Multi-source data aggregation
function aggregateDataSources(sources, aggregator) {
  const aggregated = {};
  
  for (const source of sources) {
    for (const [key, value] of Object.entries(source)) {
      if (key in aggregated) {
        aggregated[key] = aggregator(key, aggregated[key], value);
      } else {
        aggregated[key] = value;
      }
    }
  }
  
  return aggregated;
}

// Usage: Sum numeric values, concatenate arrays
const source1 = { views: 100, tags: ['tech'] };
const source2 = { views: 50, tags: ['web'] };
const source3 = { views: 25 };

const result = aggregateDataSources(
  [source1, source2, source3],
  (key, val1, val2) => {
    if (typeof val1 === 'number') return val1 + val2;
    if (Array.isArray(val1)) return [...val1, ...val2];
    return val2; // Last value wins
  }
);
// { views: 175, tags: ['tech', 'web'] }
```
