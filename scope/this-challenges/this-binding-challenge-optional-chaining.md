What is logged for the first line, and what happens on the second `console.log`?
?

```javascript
"use strict";

const api = {
  ctx: { id: 9, readId() { return this.id; } },
};

console.log(api.ctx?.readId());

const fn = api.ctx?.readId;
console.log(fn?.());
```

**Answer:**  
- First line logs **`9`** — `readId` is invoked **immediately** as a method of `api.ctx`, so `this` is **`api.ctx`**.  
- Second line **throws `TypeError`** — `fn?.()` only guards **`fn` being nullish**. Here `fn` is a function, so the call runs as a **bare call** with **`this` as `undefined`**, and `this.id` throws. Optional chaining on the **call** does not supply a receiver.
