When this runs, what happens on the `console.log(user)` line, and why?
?

```javascript
const user = "outer";

function demo() {
  console.log(user); // <- what happens here?
  let user = "inner";
  return user;
}

demo();
```

**Answer:** It throws **`ReferenceError: Cannot access 'user' before initialization`**. Inside `demo`, the `let user` creates a new binding that **shadows** the outer `user`. That inner binding exists from the start of the function scope but is **uninitialized** until execution reaches the declaration (TDZ), so the lookup finds the inner `user` and errors.
