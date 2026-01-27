How do universal selectors and combinators affect specificity?
?

```css
/* Complex Specificity Example 4 */

/* Selector: * + .sibling.class */
/* Breakdown:
   - * (universal): 0,0,0,0 (doesn't add to specificity)
   - + (combinator): doesn't add to specificity
   - .sibling (class): 0,0,1,0
   - .class (class): 0,0,1,0
   
   Total: 0,0,2,0 = 20
*/

* + .sibling.class {
  margin-top: 20px; /* Specificity: 20 */
}

/* Selector: div > p:first-child::before */
/* Breakdown:
   - div (element): 0,0,0,1
   - > (combinator): doesn't add
   - p (element): 0,0,0,1
   - :first-child (pseudo-class): 0,0,1,0
   - ::before (pseudo-element): 0,0,0,1
   
   Total: 0,0,1,3 = 13
*/

div > p:first-child::before {
  content: "• "; /* Specificity: 13 */
}

/* Practical: Universal selector doesn't increase specificity */
* .class { } /* 0,0,1,0 = 10 */
.class { }   /* 0,0,1,0 = 10 */
/* Same specificity, order matters */
```
