How do you use while loops for queue processing and state management?
?

```javascript
// while loops for queue processing

// Practical: Process task queue
class TaskQueue {
  constructor() {
    this.queue = [];
    this.processing = false;
  }
  
  add(task) {
    this.queue.push(task);
    this.process();
  }
  
  async process() {
    if (this.processing) return;
    
    this.processing = true;
    while (this.queue.length > 0) {
      const task = this.queue.shift();
      try {
        await task();
      } catch (error) {
        console.error('Task failed:', error);
      }
    }
    this.processing = false;
  }
}

// Practical: Process paginated API data
async function fetchAllPages(baseUrl) {
  let page = 1;
  let hasMore = true;
  const allData = [];
  
  while (hasMore) {
    const response = await fetch(`${baseUrl}?page=${page}`);
    const data = await response.json();
    
    allData.push(...data.items);
    hasMore = data.hasMore;
    page++;
    
    // Safety check
    if (page > 1000) {
      console.warn('Max pages reached');
      break;
    }
  }
  
  return allData;
}

// Practical: Animation loop
function animateElement(element, targetPosition, duration) {
  const startPosition = parseInt(element.style.left) || 0;
  const startTime = Date.now();
  
  function animate() {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    const currentPosition = startPosition + 
      (targetPosition - startPosition) * progress;
    element.style.left = currentPosition + 'px';
    
    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  }
  
  animate();
}

// Practical: State machine
class StateMachine {
  constructor(initialState) {
    this.state = initialState;
    this.transitions = {};
  }
  
  addTransition(from, to, condition) {
    if (!this.transitions[from]) {
      this.transitions[from] = [];
    }
    this.transitions[from].push({ to, condition });
  }
  
  async run() {
    while (this.state !== 'final') {
      const possibleTransitions = this.transitions[this.state] || [];
      
      for (const transition of possibleTransitions) {
        if (await transition.condition()) {
          this.state = transition.to;
          break;
        }
      }
      
      // Prevent infinite loop
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }
}
```
