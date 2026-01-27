What are all JavaScript data types and their characteristics?
?

```javascript
// JavaScript Data Types Summary Table

/*
┌─────────────┬──────────────┬────────────┬─────────────────────────────────────┐
│ Type        │ Category     │ Mutable?   │ Key Characteristics                  │
├─────────────┼──────────────┼────────────┼─────────────────────────────────────┤
│ String      │ Primitive    │ No         │ Immutable, sequence of characters   │
│ Number      │ Primitive    │ No         │ IEEE 754, includes NaN, Infinity     │
│ Boolean     │ Primitive    │ No         │ true or false, truthy/falsy values  │
│ Undefined   │ Primitive    │ No         │ Uninitialized variable default      │
│ Null        │ Primitive    │ No         │ Intentional absence of value        │
│ Symbol      │ Primitive    │ No         │ Unique identifier, object keys      │
│ BigInt      │ Primitive    │ No         │ Large integers beyond safe range    │
│ Object      │ Object       │ Yes        │ Key-value pairs, reference type     │
│ Array       │ Object       │ Yes        │ Ordered collection, numeric indices │
│ Function    │ Object       │ Yes        │ Callable object, first-class        │
│ Date        │ Object       │ Yes        │ Date and time representation        │
└─────────────┴──────────────┴────────────┴─────────────────────────────────────┘
*/

// Type Checking Functions
typeof 'string';        // 'string'
typeof 42;             // 'number'
typeof true;            // 'boolean'
typeof undefined;       // 'undefined'
typeof null;            // 'object' (historical bug!)
typeof Symbol();        // 'symbol'
typeof 10n;             // 'bigint'
typeof {};              // 'object'
typeof [];              // 'object'
typeof function() {};   // 'function'
typeof new Date();      // 'object'

// Better Type Checking
Array.isArray([]);                    // true
instanceof Date;                       // true for Date objects
Object.prototype.toString.call([]);   // '[object Array]'

// Type Conversion
String(123);           // '123'
Number('42');          // 42
Boolean(1);            // true
BigInt(123);           // 123n
parseInt('42px');      // 42
parseFloat('3.14');    // 3.14

// Key Differences

// Primitives vs Objects:
// - Primitives: Immutable, compared by value
// - Objects: Mutable, compared by reference

const a = 'hello';
const b = 'hello';
console.log(a === b); // true (same value)

const obj1 = {};
const obj2 = {};
console.log(obj1 === obj2); // false (different references)

// Undefined vs Null:
// - undefined: Not assigned, automatic default
// - null: Explicitly assigned, intentional empty

// Number vs BigInt:
// - Number: Up to 2^53 - 1, floating point
// - BigInt: Arbitrary precision integers

// Array vs Object:
// - Array: Numeric indices, length property, array methods
// - Object: String/Symbol keys, no length, object methods

// Function vs Other Objects:
// - Function: Callable, has name/length properties
// - Regular Object: Not callable, custom properties
```
