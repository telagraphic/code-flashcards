What are more advanced closure use cases?
?

```javascript
// Use case 1: Debouncing (delaying function execution)
function createDebounce(func, delay) {
  let timeoutId; // Private to closure
  
  return function(...args) {
    clearTimeout(timeoutId); // Access timeoutId from closure
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

const debouncedSearch = createDebounce((query) => {
  console.log('Searching for:', query);
}, 300);

// Use case 2: Throttling (limiting function calls)
function createThrottle(func, limit) {
  let inThrottle; // Private state
  
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false; // Reset after limit
      }, limit);
    }
  };
}

const throttledScroll = createThrottle(() => {
  console.log('Scroll event');
}, 1000);

// Use case 3: Currying (transforming multi-argument functions)
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      return function(...nextArgs) {
        return curried.apply(this, args.concat(nextArgs));
      };
    }
  };
}

const add = (a, b, c) => a + b + c;
const curriedAdd = curry(add);
console.log(curriedAdd(1)(2)(3)); // 6
console.log(curriedAdd(1, 2)(3)); // 6

// Use case 4: State management
function createState(initialState) {
  let state = initialState;
  const listeners = [];
  
  return {
    getState: () => state,
    setState: (newState) => {
      state = { ...state, ...newState };
      listeners.forEach(listener => listener(state));
    },
    subscribe: (listener) => {
      listeners.push(listener);
      return () => {
        const index = listeners.indexOf(listener);
        if (index > -1) listeners.splice(index, 1);
      };
    }
  };
}

const store = createState({ count: 0 });
store.subscribe((state) => console.log('State changed:', state));
store.setState({ count: 1 }); // Triggers listener
```
