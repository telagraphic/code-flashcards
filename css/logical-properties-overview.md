What are CSS Logical Properties and why use them?
?

```css
/* Logical Properties: Direction-agnostic properties
   Work with writing modes and text direction */

/* Physical properties (direction-dependent) */
.element {
  margin-top: 10px;
  margin-right: 20px;
  margin-bottom: 10px;
  margin-left: 20px;
  width: 100px;
  height: 50px;
}

/* Logical properties (direction-agnostic) */
.element {
  margin-block-start: 10px;  /* Top in LTR, right in vertical */
  margin-inline-end: 20px;   /* Right in LTR, bottom in vertical */
  margin-block-end: 10px;    /* Bottom in LTR, left in vertical */
  margin-inline-start: 20px;  /* Left in LTR, top in vertical */
  inline-size: 100px;         /* width */
  block-size: 50px;           /* height */
}

/* Block dimension: Perpendicular to text flow */
/* Inline dimension: Parallel to text flow */

/* Practical: RTL support */
/* Physical: Breaks in RTL */
.button {
  margin-left: 10px;
  padding-right: 20px;
}

/* Logical: Works in both LTR and RTL */
.button {
  margin-inline-start: 10px;
  padding-inline-end: 20px;
}

/* Practical: Vertical writing modes */
/* Physical: Doesn't adapt */
.container {
  width: 300px;
  height: 200px;
}

/* Logical: Adapts to writing mode */
.container {
  inline-size: 300px;
  block-size: 200px;
}

/* Benefits:
   - Internationalization support
   - Works with vertical text
   - Future-proof
   - More semantic
*/
```
