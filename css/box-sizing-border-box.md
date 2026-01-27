What does box-sizing: border-box do?
?

```css
/* box-sizing: border-box
   Width/height includes content + padding + border
   More intuitive and easier to work with */

.element {
  box-sizing: border-box;
  width: 200px;
  padding: 20px;
  border: 5px solid;
  
  /* Total width = 200px (includes padding and border) */
  /* Content width = 200 - 20*2 - 5*2 = 150px */
}

/* Practical: Modern web development standard */
* {
  box-sizing: border-box; /* Apply to all elements */
}

.card {
  width: 300px;
  padding: 20px;
  border: 2px solid;
  
  /* Total width: exactly 300px */
  /* Much easier to calculate! */
}

/* Benefits:
   - Easier percentage-based layouts
   - Predictable sizing
   - No math needed for padding/border
*/

/* Practical: Responsive grid system */
.grid-item {
  box-sizing: border-box;
  width: 33.333%;
  padding: 15px;
  border: 1px solid;
  /* Always exactly 1/3 width, regardless of padding */
}

/* Practical: Form inputs */
input {
  box-sizing: border-box;
  width: 100%;
  padding: 10px;
  border: 2px solid;
  /* Fits perfectly in container */
}
```
