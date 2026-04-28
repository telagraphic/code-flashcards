Why is `NaN` weird in comparisons, and when should you use `Object.is`?
?

## `NaN` is not equal to itself

```javascript
NaN === NaN; // false
NaN == NaN;  // false
```

Check it with `Number.isNaN`:

```javascript
Number.isNaN(NaN);       // true
Number.isNaN('NaN');     // false (does not coerce)
isNaN('NaN');            // true  (coerces -> NaN)  (often a footgun)
```

## `Object.is` vs `===`

`Object.is(a, b)` is almost the same as `===`, except:

- `Object.is(NaN, NaN)` is **true**
- `Object.is(0, -0)` is **false**

```javascript
Object.is(NaN, NaN); // true
NaN === NaN;         // false

Object.is(0, -0);    // false
0 === -0;            // true
```

## When it matters

```javascript
function sameValue(a, b) {
  return Object.is(a, b);
}
```

Use `Object.is` when you specifically care about `NaN` and `-0` edge cases (rare, but important in some numeric code and polyfills).

