What’s the difference between `===` vs `==`, and what do `<`, `>`, `<=`, `>=` actually do?
?

## Prefer strict equality

- **`===` / `!==`**: no type coercion
- **`==` / `!=`**: type coercion (often surprising)

```javascript
0 === false; // false
0 == false;  // true

'' == 0;     // true
'' === 0;    // false

null == undefined;  // true
null === undefined; // false
```

## Object equality is by reference

```javascript
{} === {};      // false
const a = {};
const b = a;
a === b;        // true
```

## Relational operators (`< <= > >=`)

Rules of thumb:

- If both sides are **numbers**, it’s numeric comparison.
- If both sides are **strings**, it’s lexicographic (dictionary-ish) by code points.
- Otherwise, JavaScript tries to **coerce** to primitives (often to numbers).

```javascript
2 < 10;        // true
'2' < '10';    // false (string compare: '2' > '1')
'2' < 10;      // true  ('2' coerces to 2)

// Be careful: coercion can be weird
'' < 1;        // true  ('' -> 0)
null >= 0;     // true  (null -> 0)
undefined >= 0 // false (undefined -> NaN)
```

## “Membership” comparisons

```javascript
// `in`: property exists (including inherited)
const obj = Object.create({ inherited: 1 });
obj.own = 2;
'own' in obj;        // true
'inherited' in obj;  // true

// `instanceof`: prototype chain
[] instanceof Array; // true
```

