After `btn.onClick()` and `fn()` run, what is logged (two lines)?
?

```javascript
"use strict";

class Button {
  label = "A";
  onClick = () => this.label;
}

const btn = new Button();
btn.label = "B";

const fn = btn.onClick;

console.log(btn.onClick());
console.log(fn());
```

**Answer:** `B` then `B`. The **field initializer** arrow closes over `this` for **that instance**. Reassigning `btn.label` is mutating the same object the arrow’s `this` refers to. Calling `fn()` is still the same arrow, so `this` is still **`btn`**, not `undefined`.
