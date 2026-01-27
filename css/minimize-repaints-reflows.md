How do you minimize repaints and reflows?
?

```css
/* Strategies to minimize repaints and reflows */

/* 1. Batch DOM reads and writes */
/* BAD: Alternating reads/writes */
for (let i = 0; i < items.length; i++) {
  items[i].style.width = items[i].offsetWidth + 10 + 'px';
  /* Forces reflow on each iteration */
}

/* GOOD: Batch reads, then writes */
const widths = items.map(item => item.offsetWidth);
items.forEach((item, i) => {
  item.style.width = widths[i] + 10 + 'px';
});
/* Single reflow */

/* 2. Use transform/opacity for animations */
/* BAD: Animate position */
.element {
  animation: move 1s;
}
@keyframes move {
  from { left: 0; }
  to { left: 100px; }
}

/* GOOD: Animate transform */
.element {
  animation: move 1s;
}
@keyframes move {
  from { transform: translateX(0); }
  to { transform: translateX(100px); }
}

/* 3. Use will-change hint */
.element {
  will-change: transform;
  /* Browser optimizes for transform changes */
}

/* 4. Use requestAnimationFrame */
function animate() {
  element.style.transform = `translateX(${position}px)`;
  position++;
  requestAnimationFrame(animate);
}

/* 5. Avoid table layouts */
/* Tables trigger reflow for entire table */
table { width: 100%; } /* Expensive */

/* 6. Use CSS containment */
.container {
  contain: layout style paint;
  /* Isolates reflows to container */
}

/* 7. Minimize style recalculation */
/* Use classes instead of inline styles */
.element.active { } /* Better than .element { style: ... } */
```
