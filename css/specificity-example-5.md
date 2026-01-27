How do :is(), :where(), and :not() affect specificity?
?

```css
/* Complex Specificity Example 5 */

/* Selector: :is(.class1, .class2) .target */
/* Breakdown:
   - :is() takes highest specificity from arguments
   - .class1 or .class2: 0,0,1,0
   - .target (class): 0,0,1,0
   
   Total: 0,0,2,0 = 20
*/

:is(.class1, .class2) .target {
  color: blue; /* Specificity: 20 */
}

/* Selector: :where(.class1, .class2) .target */
/* Breakdown:
   - :where() has 0 specificity
   - .target (class): 0,0,1,0
   
   Total: 0,0,1,0 = 10
*/

:where(.class1, .class2) .target {
  color: red; /* Specificity: 10 */
}

/* :is() increases specificity, :where() doesn't */

/* Selector: :not(.class) #id */
/* Breakdown:
   - :not() adds specificity of argument
   - .class: 0,0,1,0
   - #id: 0,1,0,0
   
   Total: 0,1,1,0 = 110
*/

:not(.class) #id {
  color: green; /* Specificity: 110 */
}

/* Practical: Use :where() to reduce specificity */
:where(header, footer) .link { } /* 0,0,1,0 = 10 */
/* Easier to override than :is() */
```
