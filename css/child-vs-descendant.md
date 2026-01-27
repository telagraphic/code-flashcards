What's the difference between child (>) and descendant combinators?
?

```css
/* Child Combinator (>): Direct child only */

/* Selects direct children */
.parent > .child {
  color: blue;
}

/* HTML:
   <div class="parent">
     <div class="child">Selected</div>  ← Selected
     <div>
       <div class="child">Not selected</div>  ← Not selected
     </div>
   </div>
*/

/* Descendant Combinator (space): Any descendant */

/* Selects all descendants */
.parent .child {
  color: red;
}

/* HTML:
   <div class="parent">
     <div class="child">Selected</div>  ← Selected
     <div>
       <div class="child">Selected</div>  ← Also selected
     </div>
   </div>
*/

/* Practical: Specific targeting */
/* Child: Only direct children */
.menu > .menu-item {
  padding: 10px;
}
/* Only .menu-item directly in .menu */

/* Descendant: All nested items */
.menu .menu-item {
  padding: 10px;
}
/* All .menu-item anywhere in .menu */

/* Practical: Component styling */
.card > .card-header {
  /* Only direct header */
}

.card .card-title {
  /* Title anywhere in card */
}

/* Performance: Child combinator is faster */
/* Browser matches right-to-left */
.parent > .child { } /* Faster - specific */
.parent .child { }   /* Slower - must check all descendants */
```
