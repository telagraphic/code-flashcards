How does `Array.prototype.map` (and this `myMap`) pass callback arguments?
?


```javascript
Array.prototype.myMap = function(callback) {
  // 1. Create a new array to hold the results
  const newArray = [];

  // 2. Iterate through the original array (referenced by 'this')
  for (let i = 0; i < this.length; i++) {
    // 3. Apply the callback to each element, index, and the array itself
    // 4. Push the returned value into our new array
    newArray.push(callback(this[i], i, this));
  }

  // 5. Return the newly created array
  return newArray;
};

// Usage Example:
const numbers = [1, 2, 3];
const doubled = numbers.myMap(num => num * 2); 
console.log(doubled); // [2, 4, 6]
```


You’re asking about this line:

```js
newArray.push(callback(this[i], i, this));
```

This is the _entire_ “map-ness” of the implementation:

- `callback(...)` runs your function once per element.
- Whatever the callback **returns** becomes the next element in `newArray`.

---

## What `callback(this[i], i, this)` means

When you call a function like `callback(a, b, c)`, JavaScript:

1. Evaluates each argument expression **left-to-right**
2. Calls the function with those values as its parameters
3. Produces a _return value_

So on each loop iteration:

- `this[i]` is the **current element value**
- `i` is the **current index**
- `this` is the **original array being mapped**

This matches the built-in `map` callback signature:

```js
(currentValue, index, array) => { ... }
```

---

## The callback is just a normal function call

In your usage:

```js
const doubled = numbers.myMap((num) => num * 2);
```

The callback is an arrow function equivalent to:

```js
const callback = (num) => {
  return num * 2;
};
```

Important detail:

- Your callback _declares only one parameter_ (`num`)
- But `myMap` _calls it with three arguments_ (`value`, `index`, `array`)

That’s totally fine in JS:

- If a function is called with **more arguments than parameters**, the extras are still passed, but they’re just **ignored** unless the function reads them (e.g. via named params, rest `...args`, or `arguments` in non-arrow functions).

So conceptually, on each iteration the engine does something like:

```js
callback(value, index, array);
// callback only uses the first argument, so:
// num === value
```

---

## What `this` is inside `myMap`

Because you call:

```js
numbers.myMap(...)
```

`myMap` runs with:

- `this === numbers`

So throughout the loop, `this` is the same array object:

```js
this === numbers; // true
```

---

## Iteration-by-iteration walkthrough (your exact example)

Setup:

```js
const numbers = [1, 2, 3];
const callback = (num) => num * 2;
```

Before the loop starts:

- `this` → `[1, 2, 3]`
- `newArray` → `[]`
- `this.length` → `3`

### Iteration 0 (i = 0)

**Step A: Evaluate the arguments**

- `this[i]` → `this[0]` → `1`
- `i` → `0`
- `this` → `[1, 2, 3]`

So the call becomes:

```js
callback(1, 0, [1, 2, 3]);
```

**Step B: Bind parameters inside the callback**

Callback definition:

```js
(num) => num * 2;
```

When called as `callback(1, 0, array)`:

- `num = 1`
- (the `0` and `[1,2,3]` are extra arguments; this callback doesn’t use them)

**Step C: Compute return value**

- returns `1 * 2` → `2`

**Step D: Push into `newArray`**

```js
newArray.push(2);
```

Now:

- `newArray` → `[2]`

---

### Iteration 1 (i = 1)

**Step A: Evaluate the arguments**

- `this[i]` → `this[1]` → `2`
- `i` → `1`
- `this` → `[1, 2, 3]`

Call:

```js
callback(2, 1, [1, 2, 3]);
```

**Step B: Bind callback parameter**

- `num = 2`

**Step C: Return value**

- returns `2 * 2` → `4`

**Step D: Push**

- `newArray` becomes `[2, 4]`

---

### Iteration 2 (i = 2)

**Step A: Evaluate the arguments**

- `this[i]` → `this[2]` → `3`
- `i` → `2`
- `this` → `[1, 2, 3]`

Call:

```js
callback(3, 2, [1, 2, 3]);
```

**Step B: Bind**

- `num = 3`

**Step C: Return**

- returns `3 * 2` → `6`

**Step D: Push**

- `newArray` becomes `[2, 4, 6]`

---

### Loop ends

Because `i` is now `3` and `3 < this.length` is false.

`myMap` returns:

- `[2, 4, 6]`

---

## Same call, but with all three callback params (to “see” them)

If you wrote:

```js
const doubled = numbers.myMap((value, index, array) => {
  console.log({ value, index, array });
  return value * 2;
});
```

Then the three arguments your `myMap` passes would be visible:

- iteration 0 logs `{ value: 1, index: 0, array: [1,2,3] }`
- iteration 1 logs `{ value: 2, index: 1, array: [1,2,3] }`
- iteration 2 logs `{ value: 3, index: 2, array: [1,2,3] }`

---

## One mental model: “push the callback’s return value”

On each iteration, this line:

```js
newArray.push(callback(this[i], i, this));
```

is essentially:

```js
const value = this[i]; // current element
const index = i; // current index
const array = this; // original array

const mappedValue = callback(value, index, array);
newArray.push(mappedValue);
```

So `newArray` is built as:

- `newArray[0] = callback(numbers[0], 0, numbers)`
- `newArray[1] = callback(numbers[1], 1, numbers)`
- `newArray[2] = callback(numbers[2], 2, numbers)`

---

## Small note: this `myMap` differs from real `map` in a few edge cases

This doesn’t change the “callback arguments” story, but it matters if you’re aiming to match spec behavior:

- **holes (sparse arrays)**: real `map` skips missing indices; this `for` loop will still call the callback and pass `undefined` for `this[i]`
- **`thisArg`**: real `map` can take a second argument to set the callback’s `this`; this `myMap` doesn’t implement that
- **mutations during mapping**: real `map` has very specific rules about `length` snapshotting and which indices are visited; this simplified version uses `this.length` dynamically as the loop runs
