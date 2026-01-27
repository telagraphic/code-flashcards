How do attribute selectors and pseudo-classes affect specificity?
?

```css
/* Complex Specificity Example 2 */

/* Selector: input[type="text"].form-control:focus */
/* Breakdown:
   - input (element): 0,0,0,1
   - [type="text"] (attribute): 0,0,1,0
   - .form-control (class): 0,0,1,0
   - :focus (pseudo-class): 0,0,1,0
   
   Total: 0,0,3,1 = 31
*/

input[type="text"].form-control:focus {
  border-color: blue; /* Specificity: 31 */
}

/* Selector: .form-group > input:not([disabled]) */
/* Breakdown:
   - .form-group (class): 0,0,1,0
   - input (element): 0,0,0,1
   - :not() (pseudo-class): 0,0,1,0
   - [disabled] (attribute): 0,0,1,0
   
   Total: 0,0,3,1 = 31
*/

.form-group > input:not([disabled]) {
  opacity: 1; /* Specificity: 31 */
}

/* Practical: Form styling */
input.form-input[required]:invalid { } /* 0,0,3,1 = 31 */
.form input.form-input { } /* 0,0,2,1 = 21 */
/* First selector wins (higher specificity) */
```
