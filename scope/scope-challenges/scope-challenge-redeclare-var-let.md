What happens when `run()` is evaluated, and what’s the real scoping mistake?
?

```javascript
function run() {
  let mode = "outer";

  if (true) {
    console.log(mode);
    var mode = "inner";
  }
}

run();
```

**Answer:** This fails before it ever runs with a **`SyntaxError`** (typically “Identifier 'mode' has already been declared”). The mistake is mixing `let` and `var` with the **same name** in the **same function scope**.

- `let mode` creates a block-scoped binding in the function body.
- `var mode` is **function-scoped**, so it tries to declare `mode` in the same function scope too.

This isn’t a runtime TDZ or lookup-walk surprise—it's a **static redeclaration error** caused by incompatible declarations in one scope.
