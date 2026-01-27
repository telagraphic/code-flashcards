How is CSS Specificity calculated?
?

```css
/* CSS Specificity: Determines which rule applies
   Calculated as: (inline, IDs, classes, elements) */

/* Specificity values:
   - Inline style: 1,0,0,0 (1000)
   - ID selector: 0,1,0,0 (100)
   - Class/pseudo-class/attribute: 0,0,1,0 (10)
   - Element/pseudo-element: 0,0,0,1 (1)
*/

/* Examples */
div { }                    /* 0,0,0,1 = 1 */
.class { }                 /* 0,0,1,0 = 10 */
#id { }                    /* 0,1,0,0 = 100 */
div.class { }             /* 0,0,1,1 = 11 */
#id .class { }            /* 0,1,1,0 = 110 */
div#id.class { }          /* 0,1,1,1 = 111 */
[style] { }               /* 0,0,1,0 = 10 */
:not(.class) { }          /* 0,0,1,0 = 10 (pseudo-class) */
::before { }              /* 0,0,0,1 = 1 (pseudo-element) */

/* Practical: Understanding specificity helps override styles */
.button { color: blue; }           /* 10 */
.button.primary { color: red; }    /* 20 - wins */
#submit.button { color: green; }   /* 110 - wins */

/* !important overrides specificity */
.button { color: yellow !important; } /* Wins over everything */
```
