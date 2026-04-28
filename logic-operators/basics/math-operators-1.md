What are JavaScript math operators, and what are the most important JavaScript-specific gotchas?
?

## Core arithmetic operators

| Operator | Meaning | Example |
|---|---|---|
| `+` | addition (or string concatenation) | `2 + 3 // 5` |
| `-` | subtraction | `5 - 2 // 3` |
| `*` | multiplication | `2 * 3 // 6` |
| `/` | division | `7 / 2 // 3.5` |
| `%` | remainder | `8 % 3 // 2` |
| `**` | exponentiation | `2 ** 3 // 8` |

## JavaScript-specific: `+` with strings

If either operand is a string, `+` concatenates and coerces the other side to a string.

```javascript
'1' + 2;     // '12'
2 + '1';     // '21'
2 + 2 + '1'; // '41' (left-to-right)
'1' + 2 + 2; // '122'
```

Most other math operators coerce to numbers:

```javascript
'6' - '2'; // 4
'6' / '2'; // 3
```

## Unary plus (`+value`) for numeric conversion

Unary `+` converts non-numbers to numbers (like `Number(value)`).

```javascript
+'42';  // 42
+true;  // 1
 +'';   // 0
```

## Operator precedence (quick reminders)

```javascript
1 + 2 * 2;      // 5  (multiplication before addition)
(1 + 2) * 2;    // 6  (parentheses win)
```

## Assignment operators and increment/decrement

```javascript
let n = 2;
n += 5; // 7
n *= 2; // 14

let c = 1;
+c; // prefix: returns new value
c++; // postfix: returns old value
```

