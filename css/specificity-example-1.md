How do you calculate specificity for complex selectors?
?

```css
/* Complex Specificity Example 1 */

/* Selector: div.container > ul li.item.active */
/* Breakdown:
   - div (element): 0,0,0,1
   - .container (class): 0,0,1,0
   - ul (element): 0,0,0,1
   - li (element): 0,0,0,1
   - .item (class): 0,0,1,0
   - .active (class): 0,0,1,0
   
   Total: 0,0,3,3 = 33
*/

div.container > ul li.item.active {
  color: blue; /* Specificity: 33 */
}

/* Selector: #sidebar .menu-item:hover */
/* Breakdown:
   - #sidebar (ID): 0,1,0,0
   - .menu-item (class): 0,0,1,0
   - :hover (pseudo-class): 0,0,1,0
   
   Total: 0,1,2,0 = 120
*/

#sidebar .menu-item:hover {
  color: red; /* Specificity: 120 - wins over above */
}

/* Practical: Component styling */
.card .card-header .card-title { } /* 0,0,3,0 = 30 */
.card.card-featured .card-title { } /* 0,0,3,0 = 30 */
/* Order matters when specificity is equal */
```
