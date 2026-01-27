What are CSS Pseudo-classes?
?

```css
/* Pseudo-classes: Keywords that select elements in specific states */

/* Structural pseudo-classes */
:first-child      /* First child element */
:last-child       /* Last child element */
:nth-child(n)     /* nth child element */
:nth-of-type(n)   /* nth element of type */
:only-child       /* Only child */
:empty            /* Empty element */

/* State pseudo-classes */
:hover            /* Mouse over */
:active           /* Being activated */
:focus            /* Has focus */
:visited          /* Visited link */
:checked           /* Checked input */
:disabled          /* Disabled element */
:enabled           /* Enabled element */

/* Practical: Interactive states */
.button:hover {
  background-color: blue;
}

.button:active {
  transform: scale(0.95);
}

.input:focus {
  outline: 2px solid blue;
}

/* Practical: Form states */
input:checked {
  accent-color: blue;
}

input:disabled {
  opacity: 0.5;
}

/* Practical: Structural selection */
li:first-child {
  font-weight: bold;
}

li:nth-child(even) {
  background-color: #f0f0f0;
}

/* Pseudo-classes add specificity (0,0,1,0) */
.button:hover { } /* 0,0,2,0 = 20 */
```
