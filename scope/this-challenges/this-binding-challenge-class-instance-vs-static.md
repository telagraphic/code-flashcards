What does each `console.log` print for `this` (describe as **instance**, **Counter constructor**, or **undefined**)?
?

```javascript
"use strict";

class Counter {
  static label = "class";
  n = 0;
  tick() {
    return this.n;
  }
  static readLabel() {
    return this.label;
  }
}

const c = new Counter();
const tick = c.tick;

console.log(c.tick());           // line A
console.log(Counter.readLabel()); // line B
try {
  console.log(tick());
} catch (e) {
  console.log("tick() threw");
}
```

**Answer:**  
- **Line A:** `0` — ordinary method call; `this` is the **instance** `c`.  
- **Line B:** `"class"` — `this` in a static method is the **constructor** (`Counter`), so `this.label` reads the static field on `Counter`.  
- **`tick()`:** throws (e.g. `Cannot read properties of undefined`) — bare call; `this` is **`undefined`** in strict mode.
