How do multiple IDs and classes stack in specificity?
?

```css
/* Complex Specificity Example 3 */

/* Selector: #header #nav #menu-item.active */
/* Breakdown:
   - #header (ID): 0,1,0,0
   - #nav (ID): 0,1,0,0
   - #menu-item (ID): 0,1,0,0
   - .active (class): 0,0,1,0
   
   Total: 0,3,1,0 = 310
*/

#header #nav #menu-item.active {
  color: blue; /* Specificity: 310 */
}

/* Selector: .page-header .navigation .menu .item */
/* Breakdown:
   - .page-header (class): 0,0,1,0
   - .navigation (class): 0,0,1,0
   - .menu (class): 0,0,1,0
   - .item (class): 0,0,1,0
   
   Total: 0,0,4,0 = 40
*/

.page-header .navigation .menu .item {
  color: red; /* Specificity: 40 */
}

/* First selector wins (310 > 40) */

/* Practical: BEM methodology helps avoid high specificity */
.block__element--modifier { } /* 0,0,1,0 = 10 */
/* Better than: .block .element.modifier { } = 30 */
```
