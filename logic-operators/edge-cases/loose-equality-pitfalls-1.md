Why do `==` and `!=` cause bugs, and when is `== null` actually useful?
?

## Why `==` is risky

`==` performs type coercion, which can make unrelated values compare equal.

```javascript
0 == false;   // true
'' == 0;      // true
'\n' == 0;    // true
[] == '';     // true
[] == 0;      // true
[1] == 1;     // true
```

## The “exception”: `x == null`

`x == null` is a common intentional pattern to check for **both** `null` and `undefined`.

```javascript
function getName(user) {
  if (user == null) return 'Anonymous'; // null or undefined
  return user.name ?? 'Anonymous';
}
```

## Prefer explicit checks otherwise

```javascript
// strict equality
value === 0;
value === '';
value === false;

// or “nullish” checks when that’s what you mean
value == null;        // intentional null-or-undefined
value === null;       // exactly null
typeof value === 'undefined'; // exactly undefined
```

