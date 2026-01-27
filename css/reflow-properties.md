Which CSS properties trigger reflows (layout recalculation)?
?

```css
/* Properties that trigger REFLOW (Layout recalculation) */

/* Geometry properties - trigger reflow */
width, height
margin, margin-top, margin-right, margin-bottom, margin-left
padding, padding-top, padding-right, padding-bottom, padding-left
border, border-width
min-width, min-height
max-width, max-height
left, right, top, bottom
position (when changed)

/* Display properties - trigger reflow */
display
float
clear
visibility (when changed from/to hidden)

/* Font properties - trigger reflow */
font-size
font-weight
line-height
font-family
text-align

/* Layout properties - trigger reflow */
overflow
overflow-x, overflow-y
vertical-align
white-space
word-spacing
letter-spacing

/* Practical: Minimize reflow-triggering changes */
/* BAD: Multiple reflows */
.element {
  width: 100px;   /* Reflow */
  height: 100px;  /* Reflow */
  margin: 10px;   /* Reflow */
}

/* GOOD: Batch changes */
.element {
  width: 100px;
  height: 100px;
  margin: 10px;
  /* Single reflow */
}

/* Properties that DON'T trigger reflow:
   - transform
   - opacity
   - filter
   - will-change
   - These trigger Composite only (faster)
*/
```
