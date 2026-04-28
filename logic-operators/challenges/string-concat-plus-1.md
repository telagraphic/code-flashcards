Why does `2 + 2 + '1'` become `'41'`, and how can you avoid this bug?
?

## The rule

If either operand is a string, `+` concatenates and the other operand is coerced to a string.

```javascript
2 + 2 + '1'; // '41'
'1' + 2 + 2; // '122'
```

## Challenge: fix the sum

You get two inputs that are *strings*, but you want numeric addition.

```javascript
function sumInputs(a, b) {
  // a and b are strings like '2' and '3'
  // TODO: return a number
}

sumInputs('2', '3'); // 5
```

## Hint: unary plus

```javascript
+'2'; // 2
```

