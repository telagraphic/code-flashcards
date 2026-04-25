What does `typeof value` do here—does it return `"undefined"` or throw?
?

```javascript
{
  console.log(typeof value); // <- what happens?
  let value = 123;
}
```

**Answer:** It throws a **`ReferenceError`** (TDZ). `typeof` only “safely returns `'undefined'`” for **truly undeclared identifiers**. Here, `value` is a real `let` binding in this block scope, but it’s **uninitialized** until the declaration line runs, so accessing it (even via `typeof`) triggers the TDZ error.
