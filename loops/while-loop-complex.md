What is a complex scenario using while loops in modern web apps?
?

```javascript
// Complex: Multi-phase data processing pipeline

// Practical: Real-time data stream processing with buffering
class StreamProcessor {
  constructor(bufferSize = 100, processInterval = 1000) {
    this.buffer = [];
    this.bufferSize = bufferSize;
    this.processInterval = processInterval;
    this.isProcessing = false;
  }
  
  async addToBuffer(item) {
    this.buffer.push(item);
    
    // Trigger processing if buffer is full
    if (this.buffer.length >= this.bufferSize && !this.isProcessing) {
      this.process();
    }
  }
  
  async process() {
    if (this.isProcessing) return;
    
    this.isProcessing = true;
    
    while (this.buffer.length > 0) {
      const batch = this.buffer.splice(0, this.bufferSize);
      
      try {
        await this.processBatch(batch);
      } catch (error) {
        console.error('Batch processing failed:', error);
        // Re-add failed batch to buffer
        this.buffer.unshift(...batch);
        break;
      }
      
      // Rate limiting
      if (this.buffer.length > 0) {
        await new Promise(resolve => setTimeout(resolve, this.processInterval));
      }
    }
    
    this.isProcessing = false;
  }
  
  async processBatch(batch) {
    // Process batch of items
    for (const item of batch) {
      await this.processItem(item);
    }
  }
  
  async processItem(item) {
    // Individual item processing
  }
}

// Complex: WebSocket message queue with priority
class MessageQueue {
  constructor() {
    this.highPriority = [];
    this.normalPriority = [];
    this.processing = false;
  }
  
  add(message, priority = 'normal') {
    if (priority === 'high') {
      this.highPriority.push(message);
    } else {
      this.normalPriority.push(message);
    }
    this.process();
  }
  
  async process() {
    if (this.processing) return;
    
    this.processing = true;
    
    while (this.highPriority.length > 0 || this.normalPriority.length > 0) {
      // Process high priority first
      while (this.highPriority.length > 0) {
        const message = this.highPriority.shift();
        await this.handleMessage(message);
      }
      
      // Then process normal priority
      if (this.normalPriority.length > 0) {
        const message = this.normalPriority.shift();
        await this.handleMessage(message);
      }
      
      // Small delay to prevent blocking
      await new Promise(resolve => setTimeout(resolve, 10));
    }
    
    this.processing = false;
  }
  
  async handleMessage(message) {
    // Message handling logic
    console.log('Processing:', message);
  }
}

// Complex: Progressive data loading with cancellation
class ProgressiveLoader {
  constructor() {
    this.loading = false;
    this.cancelled = false;
  }
  
  async loadData(source, onProgress) {
    this.loading = true;
    this.cancelled = false;
    let offset = 0;
    const pageSize = 20;
    const allData = [];
    
    while (!this.cancelled) {
      try {
        const response = await fetch(`${source}?offset=${offset}&limit=${pageSize}`);
        const data = await response.json();
        
        if (data.items.length === 0) {
          break; // No more data
        }
        
        allData.push(...data.items);
        offset += pageSize;
        
        if (onProgress) {
          onProgress({
            loaded: allData.length,
            total: data.total || null,
            percentage: data.total ? (allData.length / data.total) * 100 : null
          });
        }
        
        // Rate limiting
        await new Promise(resolve => setTimeout(resolve, 100));
      } catch (error) {
        if (!this.cancelled) {
          throw error;
        }
        break;
      }
    }
    
    this.loading = false;
    return allData;
  }
  
  cancel() {
    this.cancelled = true;
  }
}
```
