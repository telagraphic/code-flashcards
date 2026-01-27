How do you use spread operator for array manipulation and immutable updates?
?

```javascript
// Spread for immutable array operations
const items = [1, 2, 3, 4, 5];

// Insert at beginning
const withStart = [0, ...items];
console.log(withStart); // [0, 1, 2, 3, 4, 5]

// Insert at end
const withEnd = [...items, 6];
console.log(withEnd); // [1, 2, 3, 4, 5, 6]

// Insert in middle
const withMiddle = [...items.slice(0, 2), 99, ...items.slice(2)];
console.log(withMiddle); // [1, 2, 99, 3, 4, 5]

// Remove item (immutable)
function removeItem(array, index) {
  return [...array.slice(0, index), ...array.slice(index + 1)];
}

const removed = removeItem(items, 2);
console.log(removed); // [1, 2, 4, 5]

// Update item (immutable)
function updateItem(array, index, newValue) {
  return array.map((item, i) => i === index ? newValue : item);
}

const updated = updateItem(items, 2, 99);
console.log(updated); // [1, 2, 99, 4, 5]

// Practical: State updates in React-like patterns
function updateState(currentState, newItem) {
  return {
    ...currentState,
    items: [...currentState.items, newItem]
  };
}

const state = { items: [1, 2, 3] };
const newState = updateState(state, 4);
console.log(newState.items); // [1, 2, 3, 4]
```
