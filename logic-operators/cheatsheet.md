JavaScript logical + comparison operators cheatsheet
?

## Quick API lookup

| Operator | Category | Returns | What it does | Example |
|---|---|---|---|---|
| `!a` | logical | boolean | Negates truthiness | `!0 // true` |
| `!!a` | logical | boolean | Coerces to boolean | `!!'x' // true` |
| `a && b` | logical | value | If `a` truthy → `b`, else `a` | `isOk && run()` |
| `a || b` | logical | value | If `a` truthy → `a`, else `b` | `name || 'Anon'` |
| `a ?? b` | logical | value | If `a` is nullish → `b`, else `a` | `count ?? 0` |
| `cond ? a : b` | conditional | value | Choose based on condition | `ok ? 'Y' : 'N'` |
| `a ||= b` | logical assign | value | If `a` falsy → assign `b` | `title ||= 'Untitled'` |
| `a &&= b` | logical assign | value | If `a` truthy → assign `b` | `token &&= token.trim()` |
| `a ??= b` | nullish assign | value | If `a` nullish → assign `b` | `retries ??= 3` |
| `a + b` | math | number/string | Add numbers; concatenate if either is a string | `'1' + 2 // '12'` |
| `+a` | math | number | Unary plus: numeric conversion | `+'42' // 42` |
| `a - b` | math | number | Subtract (coerces to number) | `'6' - '2' // 4` |
| `a * b` | math | number | Multiply (coerces to number) | `'2' * '3' // 6` |
| `a / b` | math | number | Divide (coerces to number) | `'6' / '2' // 3` |
| `a % b` | math | number | Remainder | `8 % 3 // 2` |
| `a ** b` | math | number | Exponentiation | `2 ** 3 // 8` |
| `a += b` | math assign | number/string | Add then assign | `n += 5` |
| `a -= b` | math assign | number | Subtract then assign | `n -= 5` |
| `a *= b` | math assign | number | Multiply then assign | `n *= 2` |
| `a /= b` | math assign | number | Divide then assign | `n /= 2` |
| `a %= b` | math assign | number | Remainder then assign | `n %= 2` |
| `a **= b` | math assign | number | Exponentiate then assign | `n **= 2` |
| `++a` | increment | number | Prefix increment (returns new value) | `++i` |
| `a++` | increment | number | Postfix increment (returns old value) | `i++` |
| `--a` | decrement | number | Prefix decrement (returns new value) | `--i` |
| `a--` | decrement | number | Postfix decrement (returns old value) | `i--` |
| `a === b` | equality | boolean | Strict equality (no coercion) | `0 === false // false` |
| `a !== b` | equality | boolean | Strict inequality | `'1' !== 1 // true` |
| `a == b` | equality | boolean | Loose equality (coerces) | `0 == false // true` |
| `a != b` | equality | boolean | Loose inequality (coerces) | `'' != 0 // false` |
| `a < b` | relational | boolean | Less-than (numeric/string/coercion) | `'2' < 10 // true` |
| `a <= b` | relational | boolean | Less-than-or-equal | `3 <= 3 // true` |
| `a > b` | relational | boolean | Greater-than | `'b' > 'a' // true` |
| `a >= b` | relational | boolean | Greater-than-or-equal | `null >= 0 // true` |
| `'k' in obj` | membership | boolean | Property exists (incl inherited) | `'toString' in {}` |
| `x instanceof C` | type/proto | boolean | Prototype chain check | `[] instanceof Array` |
| `Object.is(a, b)` | equality | boolean | Like `===`, but `NaN` equals itself and `-0` differs from `0` | `Object.is(NaN, NaN)` |

## The two defaulting patterns you’ll use most

```javascript
// 1) Keep valid falsy values (0/false/'')
const retries = input.retries ?? 3;

// 2) Treat “empty” as missing
const title = input.title || 'Untitled';
```

## Truthy/falsy reminder

Falsy values are only:
`false`, `0`, `-0`, `0n`, `''`, `null`, `undefined`, `NaN`.

