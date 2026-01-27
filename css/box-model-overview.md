What is the CSS Box Model?
?

```css
/* CSS Box Model: How elements are sized and spaced
   Consists of: Content, Padding, Border, Margin */

/* Box Model layers (inside to outside):
   1. Content: Actual content area
   2. Padding: Space between content and border
   3. Border: Border around padding
   4. Margin: Space outside border
*/

/* Visual representation:
   ┌─────────────────────────┐ ← Margin (transparent)
   │ ┌─────────────────────┐ │
   │ │ ┌─────────────────┐ │ │ ← Border
   │ │ │ ┌─────────────┐ │ │ │
   │ │ │ │   Content   │ │ │ │ ← Padding
   │ │ │ └─────────────┘ │ │ │
   │ │ └─────────────────┘ │ │
   │ └─────────────────────┘ │
   └─────────────────────────┘
*/

/* Example */
.box {
  width: 200px;        /* Content width */
  padding: 20px;       /* Padding on all sides */
  border: 5px solid;  /* Border */
  margin: 10px;       /* Margin */
  
  /* Total width = 200 + 20*2 + 5*2 + 10*2 = 270px */
}

/* Practical: Understanding box model helps with layout */
.card {
  width: 300px;
  padding: 20px;
  border: 2px solid #ccc;
  margin: 15px;
  /* Total space: 300 + 40 + 4 + 30 = 374px */
}

/* Box-sizing affects how width is calculated */
/* content-box (default): width = content only */
/* border-box: width = content + padding + border */
```
