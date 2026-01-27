Which CSS properties trigger repaints but not reflows?
?

```css
/* Properties that trigger REPAINT only (no reflow) */

/* Visual properties - repaint only */
color
background-color
background-image
background-position
background-repeat
border-color
border-style
outline-color
outline-style
box-shadow
text-shadow
opacity
visibility (when visible/hidden, not display:none)

/* Practical: Use repaint-only properties for animations */
/* BAD: Triggers reflow + repaint */
.element {
  left: 100px; /* Reflow + repaint */
}

/* GOOD: Triggers repaint only */
.element {
  transform: translateX(100px); /* Repaint only */
  opacity: 0.5; /* Repaint only */
}

/* Properties that trigger COMPOSITE only (fastest):
   - transform
   - opacity
   - filter
   - will-change
   
   These are GPU-accelerated and don't trigger layout/paint
*/

/* Practical: Optimize animations */
@keyframes slide {
  from { transform: translateX(0); }
  to { transform: translateX(100px); }
}
/* Uses Composite only - 60fps smooth */

/* Avoid animating reflow properties */
@keyframes slide-bad {
  from { left: 0; }
  to { left: 100px; }
}
/* Triggers reflow + repaint - janky */
```
