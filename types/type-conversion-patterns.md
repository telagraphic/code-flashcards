What are common JavaScript type conversion patterns (and their gotchas)?
?

JavaScript converts values in two main ways:

- **Explicit conversion**: you do it on purpose (`Number(x)`, `String(x)`, `Boolean(x)`).
- **Implicit coercion**: JavaScript does it for an operator or context (`+`, `==`, `if (...)`, template strings).

If you remember one thing: **prefer explicit conversion in app code**. It’s easier to read, easier to audit, and has fewer surprises.

---

## Quick conversion table (patterns + outcomes)

```js
/*
┌───────────────────────┬──────────────────────────────┬───────────────────────────────────────────────┬──────────────────────────────┐
│ Goal                  │ Prefer (explicit)            │ Common (implicit)                              │ Notes / gotchas              │
├───────────────────────┼──────────────────────────────┼───────────────────────────────────────────────┼──────────────────────────────┤
│ To string             │ String(x)                    │ "" + x, `${x}`                                 │ String(null) -> "null"       │
│                       │                              │                                               │ String(undefined) -> "undef" │
├───────────────────────┼──────────────────────────────┼───────────────────────────────────────────────┼──────────────────────────────┤
│ To number             │ Number(x)                    │ +x, x - 0, x * 1                               │ Number("") -> 0              │
│                       │                              │                                               │ Number("  ") -> 0            │
│                       │                              │                                               │ Number("4px") -> NaN         │
├───────────────────────┼──────────────────────────────┼───────────────────────────────────────────────┼──────────────────────────────┤
│ Parse int/float text  │ parseInt(x, 10), parseFloat  │ (none recommended)                             │ parseInt("08", 10)           │
│                       │                              │                                               │ parseInt("4px", 10) -> 4     │
│                       │                              │                                               │ Number("4px") -> NaN         │
├───────────────────────┼──────────────────────────────┼───────────────────────────────────────────────┼──────────────────────────────┤
│ To boolean            │ Boolean(x)                   │ !!x, if (x)                                    │ Truthy/falsy rules apply     │
│                       │                              │                                               │ Boolean("false") -> true     │
├───────────────────────┼──────────────────────────────┼───────────────────────────────────────────────┼──────────────────────────────┤
│ To BigInt             │ BigInt(x)                    │ (avoid)                                        │ BigInt(1.2) throws            │
│                       │                              │                                               │ BigInt("10") -> 10n          │
│                       │                              │                                               │ Cannot mix BigInt + Number    │
├───────────────────────┼──────────────────────────────┼───────────────────────────────────────────────┼──────────────────────────────┤
│ To primitive (custom) │ x.valueOf()/toString()       │ x + "" / x - 0 triggers ToPrimitive            │ Order depends on hint         │
│                       │ (implement on your objects)  │                                               │ Avoid relying on this         │
└───────────────────────┴──────────────────────────────┴───────────────────────────────────────────────┴──────────────────────────────┘
*/
```

---

## How coercion actually happens (the useful mental model)

When JS *must* combine values of different types, it applies abstract steps like:

- **ToPrimitive** (for objects): call `valueOf()` / `toString()` to get a primitive
- **ToNumber** (for numeric operators like `-`, `*`, `/`, comparisons)
- **ToString** (for string concatenation)
- **ToBoolean** (for conditions like `if`, `while`, `&&`, `||`, `?:`)

This is why:

```js
"" + 1      // "1"  (string concatenation => ToString)
"" - 1      // -1   (numeric operator => ToNumber)
"2" * "3"   // 6    (numeric operator => ToNumber)
4 + 5 + "px" // "9px" (4+5 numeric, then string concat)
```

---

## Recommended patterns for modern web apps

### 1) Form inputs (always strings)

```js
function parseRequiredNumber(inputValue) {
  const n = Number(inputValue);
  if (!Number.isFinite(n)) throw new Error("Invalid number");
  return n;
}
```

If you want to allow “units” like `"12px"`, you’re not converting — you’re **parsing**:

```js
function parsePixels(value) {
  const n = parseFloat(value);
  return Number.isFinite(n) ? n : null;
}
```

### 2) Query params / URLSearchParams

```js
const page = Number(new URLSearchParams(location.search).get("page") ?? 1);
```

Pitfall: `Number(null) === 0`, so prefer `??` to supply defaults before converting.

### 3) localStorage (always strings)

```js
localStorage.setItem("count", String(count));
const count = Number(localStorage.getItem("count") ?? 0);
```

For structured data:

```js
localStorage.setItem("settings", JSON.stringify(settings));
const settings = JSON.parse(localStorage.getItem("settings") ?? "{}");
```

### 4) Boolean flags from strings (common bug)

Avoid this:

```js
Boolean("false"); // true
```

Use explicit checks:

```js
function parseBoolean(value) {
  if (value === true || value === false) return value;
  if (value == null) return false;
  const s = String(value).trim().toLowerCase();
  return s === "true" || s === "1" || s === "yes" || s === "on";
}
```

---

## Equality coercion (`==`) vs strict (`===`)

Prefer **`===`** and **`!==`**.

`==` has a lot of coercion rules that create surprising results:

```js
0 == ""        // true
0 == "0"       // true
false == "0"   // true
null == undefined // true (special case)
```

If you want “nullish” checks, be explicit:

```js
if (value == null) {
  // matches null or undefined only (intentional pattern)
}
```

---

## Common conversion gotchas (worth memorizing)

```js
Number("")          // 0
Number("  \n\t")    // 0
Number(null)        // 0
Number(undefined)   // NaN
Number("4px")       // NaN

String(null)        // "null"
String(undefined)   // "undefined"

Boolean(0)          // false
Boolean("")         // false
Boolean("0")        // true
Boolean("false")    // true
```

