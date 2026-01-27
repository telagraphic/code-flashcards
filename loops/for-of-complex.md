What is a complex scenario using for...of in modern web apps?
?

```javascript
// Complex: Multi-step data pipeline with async operations

// Practical: Process streaming data with transformation and validation
async function processDataStream(stream, validators, transformers) {
  const results = [];
  const errors = [];
  
  for await (const chunk of stream) {
    // Validate chunk
    let isValid = true;
    for (const validator of validators) {
      if (!validator(chunk)) {
        errors.push({
          chunk,
          error: validator.name || 'Validation failed'
        });
        isValid = false;
        break;
      }
    }
    
    if (!isValid) continue;
    
    // Transform chunk through pipeline
    let transformed = chunk;
    for (const transformer of transformers) {
      try {
        transformed = await transformer(transformed);
      } catch (error) {
        errors.push({
          chunk: transformed,
          error: error.message
        });
        transformed = null;
        break;
      }
    }
    
    if (transformed) {
      results.push(transformed);
    }
  }
  
  return { results, errors };
}

// Complex: Nested data processing with async operations
async function processNestedApiData(endpoints) {
  const allData = [];
  
  for (const endpoint of endpoints) {
    try {
      const response = await fetch(endpoint);
      const data = await response.json();
      
      // Process nested arrays
      if (Array.isArray(data.items)) {
        const processedItems = [];
        
        for (const item of data.items) {
          // Fetch related data for each item
          if (item.relatedId) {
            try {
              const related = await fetch(`/api/related/${item.relatedId}`);
              item.related = await related.json();
            } catch (error) {
              item.related = null;
            }
          }
          
          // Transform item
          const transformed = {
            ...item,
            displayName: `${item.firstName} ${item.lastName}`,
            processedAt: new Date().toISOString()
          };
          
          processedItems.push(transformed);
        }
        
        allData.push({
          endpoint,
          items: processedItems,
          count: processedItems.length
        });
      }
    } catch (error) {
      console.error(`Failed to process ${endpoint}:`, error);
    }
  }
  
  return allData;
}

// Complex: Real-time event processing with batching
class EventProcessor {
  constructor(batchSize = 10) {
    this.batchSize = batchSize;
    this.queue = [];
  }
  
  async processEvents(eventStream) {
    const batches = [];
    let currentBatch = [];
    
    for await (const event of eventStream) {
      currentBatch.push(event);
      
      if (currentBatch.length >= this.batchSize) {
        const processedBatch = await this.processBatch(currentBatch);
        batches.push(processedBatch);
        currentBatch = [];
      }
    }
    
    // Process remaining events
    if (currentBatch.length > 0) {
      const processedBatch = await this.processBatch(currentBatch);
      batches.push(processedBatch);
    }
    
    return batches;
  }
  
  async processBatch(batch) {
    const results = [];
    for (const event of batch) {
      try {
        const result = await this.processEvent(event);
        results.push(result);
      } catch (error) {
        results.push({ error: error.message, event });
      }
    }
    return results;
  }
  
  async processEvent(event) {
    // Event processing logic
    return { processed: true, event };
  }
}
```
