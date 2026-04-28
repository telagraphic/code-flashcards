What do `%` (remainder) and `**` (exponentiation) do?
?

## Remainder `%`

`a % b` is the remainder after dividing `a` by `b`.

```javascript
5 % 2;  // 1
8 % 3;  // 2
8 % 4;  // 0
```

Challenge: implement `isEven(n)` using `%`.

```javascript
function isEven(n) {
  // TODO
}

isEven(2); // true
isEven(3); // false
```

## Exponentiation `**`

`a ** b` raises `a` to the power of `b`.

```javascript
2 ** 2;      // 4
2 ** 3;      // 8
4 ** (1/2);  // 2   (square root)
8 ** (1/3);  // 2   (cube root)
```

Challenge: write `squareRoot(n)` using `**` (no `Math.sqrt`).

```javascript
function squareRoot(n) {
  // TODO
}

squareRoot(9); // 3
```

