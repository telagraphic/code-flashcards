What is a complex scenario using async for...of in modern web apps?
?

```javascript
// Complex: Multi-source data aggregation with error handling

// Practical: Aggregate data from multiple async sources
async function* aggregateDataSources(sources) {
  const generators = sources.map(source => source.getData());
  const buffers = generators.map(() => []);
  const done = new Set();
  
  // Start all generators
  const promises = generators.map(async (gen, index) => {
    try {
      for await (const data of gen) {
        buffers[index].push(data);
      }
    } catch (error) {
      buffers[index].push({ error: error.message });
    } finally {
      done.add(index);
    }
  });
  
  // Yield data as it becomes available
  while (done.size < generators.length) {
    // Check all buffers for available data
    for (let i = 0; i < buffers.length; i++) {
      if (buffers[i].length > 0) {
        yield {
          source: i,
          data: buffers[i].shift()
        };
      }
    }
    
    // Small delay to prevent busy waiting
    await new Promise(resolve => setTimeout(resolve, 10));
  }
  
  // Yield remaining buffered data
  for (let i = 0; i < buffers.length; i++) {
    while (buffers[i].length > 0) {
      yield {
        source: i,
        data: buffers[i].shift()
      };
    }
  }
}

// Complex: Pipeline processing with multiple stages
class AsyncPipeline {
  constructor(stages) {
    this.stages = stages;
  }
  
  async* process(inputStream) {
    let currentStream = inputStream;
    
    // Apply each stage sequentially
    for (const stage of this.stages) {
      const nextStream = this.createStageStream(currentStream, stage);
      currentStream = nextStream;
    }
    
    // Yield final results
    for await (const result of currentStream) {
      yield result;
    }
  }
  
  async* createStageStream(inputStream, stage) {
    for await (const item of inputStream) {
      try {
        const processed = await stage.process(item);
        if (processed !== null && processed !== undefined) {
          yield processed;
        }
      } catch (error) {
        if (stage.onError) {
          yield await stage.onError(error, item);
        }
      }
    }
  }
}

// Usage
const pipeline = new AsyncPipeline([
  {
    process: async (item) => {
      // Stage 1: Validate
      if (!item.valid) return null;
      return item;
    }
  },
  {
    process: async (item) => {
      // Stage 2: Transform
      return { ...item, transformed: true };
    }
  },
  {
    process: async (item) => {
      // Stage 3: Enrich
      const extra = await fetch(`/api/enrich/${item.id}`);
      return { ...item, extra: await extra.json() };
    },
    onError: async (error, item) => {
      return { ...item, error: error.message };
    }
  }
]);

async function runPipeline(dataSource) {
  const results = [];
  for await (const result of pipeline.process(dataSource)) {
    results.push(result);
  }
  return results;
}

// Complex: Real-time data synchronization
class DataSynchronizer {
  constructor() {
    this.sources = [];
    this.processors = [];
  }
  
  async* synchronize() {
    const sourceStreams = this.sources.map(source => source.getStream());
    
    // Merge all streams
    const merged = this.mergeStreams(sourceStreams);
    
    // Process through pipeline
    for await (const data of merged) {
      // Apply all processors
      let processed = data;
      for (const processor of this.processors) {
        processed = await processor(processed);
        if (!processed) break; // Processor can filter
      }
      
      if (processed) {
        yield processed;
      }
    }
  }
  
  async* mergeStreams(streams) {
    const buffers = streams.map(() => []);
    const active = new Set(streams.map((_, i) => i));
    
    // Start all streams
    streams.forEach(async (stream, index) => {
      try {
        for await (const item of stream) {
          buffers[index].push(item);
        }
      } finally {
        active.delete(index);
      }
    });
    
    // Yield items as they arrive
    while (active.size > 0 || buffers.some(b => b.length > 0)) {
      for (let i = 0; i < buffers.length; i++) {
        if (buffers[i].length > 0) {
          yield { source: i, data: buffers[i].shift() };
        }
      }
      await new Promise(resolve => setTimeout(resolve, 10));
    }
  }
}
```
