What is the `Array.prototype.myReduce` function API?

- Handle if it has an initial value
- Use ternary to set the two looping variables


?

```js
Array.prototype.myReduce = function(reducer, initialValue) {
  const hasInitialValue = arguments.length >= 2;

  let acc;
  let startIndex;

  const startingIndex = hasInitialValue ? 0 : 1;
  const accumulator = hasInitialValue ? initialValue : this[0];

  for (let i = startIndex; i < this.length; i++) {
    acc = reducer(acc, this[i], i, this);
  }

  return acc;
};
```