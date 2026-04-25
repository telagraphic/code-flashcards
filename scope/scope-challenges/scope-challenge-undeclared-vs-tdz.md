Two lookups, two different errors: what happens on line A vs line B, and why are they different?
?

```javascript
function test() {
  console.log(notDeclared); // A
  {
    console.log(inTDZ);     // B
    let inTDZ = 1;
  }
}

test();
```

**Answer:**

- **Line A:** throws **`ReferenceError: notDeclared is not defined`** because there is **no binding anywhere** in the scope chain for `notDeclared` (an undeclared identifier).
- **Line B:** throws **`ReferenceError: Cannot access 'inTDZ' before initialization`** because there *is* a binding (`let inTDZ`) in the current block scope, but it’s **uninitialized** until the declaration executes (TDZ).

Both fail with `ReferenceError`, but for different reasons: **missing binding** vs **present-but-uninitialized binding**.
