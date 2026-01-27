What is a complex scenario using Object.values() in modern web apps?
?

```javascript
// Complex: Multi-level data aggregation and analysis

// Practical: Aggregate nested data structures
class DataAggregator {
  constructor() {
    this.aggregators = new Map();
  }
  
  registerAggregator(key, aggregator) {
    this.aggregators.set(key, aggregator);
  }
  
  aggregate(obj) {
    const result = {};
    
    for (const [key, value] of Object.entries(obj)) {
      if (this.aggregators.has(key)) {
        const aggregator = this.aggregators.get(key);
        result[key] = aggregator(value);
      } else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        result[key] = this.aggregate(value);
      } else {
        result[key] = value;
      }
    }
    
    return result;
  }
}

// Usage: Aggregate sales data
const aggregator = new DataAggregator();
aggregator.registerAggregator('sales', (sales) => {
  return Object.values(sales).reduce((sum, amount) => sum + amount, 0);
});
aggregator.registerAggregator('regions', (regions) => {
  return Object.values(regions).length;
});

const data = {
  q1: {
    sales: { jan: 1000, feb: 1200, mar: 1500 },
    regions: { north: {}, south: {}, east: {} }
  },
  q2: {
    sales: { apr: 1300, may: 1400, jun: 1600 },
    regions: { north: {}, south: {}, east: {}, west: {} }
  }
};

const aggregated = aggregator.aggregate(data);
// { q1: { sales: 3700, regions: 3 }, q2: { sales: 4300, regions: 4 } }

// Complex: Statistical analysis of object values
class ValueAnalyzer {
  analyze(obj) {
    const values = Object.values(obj);
    const numbers = values.filter(v => typeof v === 'number');
    const strings = values.filter(v => typeof v === 'string');
    const booleans = values.filter(v => typeof v === 'boolean');
    
    return {
      total: values.length,
      byType: {
        number: numbers.length,
        string: strings.length,
        boolean: booleans.length,
        object: values.filter(v => typeof v === 'object' && v !== null).length
      },
      numeric: numbers.length > 0 ? {
        sum: numbers.reduce((a, b) => a + b, 0),
        average: numbers.reduce((a, b) => a + b, 0) / numbers.length,
        min: Math.min(...numbers),
        max: Math.max(...numbers)
      } : null,
      string: strings.length > 0 ? {
        totalLength: strings.reduce((sum, str) => sum + str.length, 0),
        averageLength: strings.reduce((sum, str) => sum + str.length, 0) / strings.length,
        unique: [...new Set(strings)].length
      } : null
    };
  }
  
  analyzeNested(obj) {
    const result = this.analyze(obj);
    
    // Analyze nested objects
    const nestedObjects = Object.values(obj)
      .filter(v => typeof v === 'object' && v !== null && !Array.isArray(v));
    
    if (nestedObjects.length > 0) {
      result.nested = nestedObjects.map(nested => this.analyzeNested(nested));
    }
    
    return result;
  }
}

// Usage
const analyzer = new ValueAnalyzer();
const data = {
  sales: { q1: 1000, q2: 1500, q3: 1200 },
  users: { active: 50, inactive: 20 },
  metadata: { version: '1.0', released: true }
};

const analysis = analyzer.analyzeNested(data);

// Complex: Value-based object transformation pipeline
class ValueTransformer {
  constructor() {
    this.transformers = [];
  }
  
  addTransformer(predicate, transformer) {
    this.transformers.push({ predicate, transformer });
  }
  
  transform(obj) {
    const result = {};
    
    for (const [key, value] of Object.entries(obj)) {
      let transformed = value;
      
      // Apply matching transformers
      for (const { predicate, transformer } of this.transformers) {
        if (predicate(value, key)) {
          transformed = transformer(transformed, key);
        }
      }
      
      // Recursively transform nested objects
      if (typeof transformed === 'object' && transformed !== null && !Array.isArray(transformed)) {
        transformed = this.transform(transformed);
      }
      
      result[key] = transformed;
    }
    
    return result;
  }
}

// Usage
const transformer = new ValueTransformer();
transformer.addTransformer(
  (value) => typeof value === 'string',
  (value) => value.toUpperCase()
);
transformer.addTransformer(
  (value) => typeof value === 'number',
  (value) => value * 1.1
);

const data = {
  name: 'alice',
  age: 30,
  nested: { value: 'test', count: 10 }
};

const transformed = transformer.transform(data);
// { name: 'ALICE', age: 33, nested: { value: 'TEST', count: 11 } }
```
