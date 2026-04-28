What is a complex example combining closures, different function types, and lexical scoping?
?

```javascript
// Complex example: Reactive state management system with closures

function createReactiveStore(initialState) {
  // Private state - closure variable
  let state = { ...initialState };
  let subscribers = []; // Array of subscriber functions
  let middleware = []; // Middleware chain
  
  // Function declaration - creates closure over state
  function notifySubscribers(prevState, nextState) {
    subscribers.forEach(subscriber => {
      try {
        subscriber(nextState, prevState);
      } catch (error) {
        console.error('Subscriber error:', error);
      }
    });
  }
  
  // Function expression - closure over middleware
  const applyMiddleware = function(action, payload) {
    return middleware.reduce((result, mw) => {
      return mw(result.action, result.payload, state);
    }, { action, payload });
  };
  
  // Arrow function - closure over state and notifySubscribers
  const dispatch = (action, payload) => {
    const prevState = { ...state };
    
    // Apply middleware
    const { action: processedAction, payload: processedPayload } = 
      applyMiddleware(action, payload);
    
    // State reducer (function expression with closure)
    const reducer = function(action, payload) {
      switch (action) {
        case 'INCREMENT':
          return { ...state, count: state.count + (payload || 1) };
        case 'DECREMENT':
          return { ...state, count: state.count - (payload || 1) };
        case 'SET_USER':
          return { ...state, user: payload };
        default:
          return state;
      }
    };
    
    state = reducer(processedAction, processedPayload);
    notifySubscribers(prevState, state);
  };
  
  // IIFE for computed values (closure over state)
  const computed = (function() {
    const getters = {
      doubleCount: () => state.count * 2,
      isEven: () => state.count % 2 === 0,
      userInitials: () => {
        if (!state.user) return '';
        return state.user.name
          .split(' ')
          .map(n => n[0])
          .join('');
      }
    };
    
    return getters;
  })();
  
  // Public API - all functions have closure over private variables
  return {
    getState: () => ({ ...state }), // Return copy
    dispatch,
    subscribe: (callback) => {
      subscribers.push(callback);
      // Return unsubscribe function (closure over subscribers and callback)
      return () => {
        const index = subscribers.indexOf(callback);
        if (index > -1) subscribers.splice(index, 1);
      };
    },
    addMiddleware: (mw) => {
      middleware.push(mw);
    },
    computed
  };
}

// Usage
const store = createReactiveStore({ count: 0, user: null });

// Subscribe (closure captures store's state)
const unsubscribe = store.subscribe((newState, prevState) => {
  console.log(`Count: ${prevState.count} -> ${newState.count}`);
});

// Dispatch actions
store.dispatch('INCREMENT', 5);
store.dispatch('SET_USER', { name: 'John Doe' });

// Access computed values (closure over state)
console.log(store.computed.doubleCount()); // 10
console.log(store.computed.userInitials()); // "JD"

// Each store instance has its own closure with separate state
const store2 = createReactiveStore({ count: 100 });
store2.dispatch('INCREMENT', 1);
console.log(store2.getState().count); // 101 (independent from store)
```
