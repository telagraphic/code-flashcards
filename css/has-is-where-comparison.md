What are the differences between :has(), :is(), and :where()?
?

```css
/* Comparison of :has(), :is(), and :where() */

/* :has() - Parent selector */
.parent:has(.child) { }
/* Selects parent based on children
   Specificity: Adds specificity of argument */

/* :is() - Selector grouping */
:is(.class1, .class2) { }
/* Groups selectors, takes highest specificity
   Specificity: Highest from arguments */

/* :where() - Zero-specificity grouping */
:where(.class1, .class2) { }
/* Groups selectors, always 0 specificity
   Specificity: Always 0,0,0,0 */

/* Specificity examples */
:has(.class) { }        /* 0,0,1,0 = 10 */
:is(.class, #id) { }   /* 0,1,0,0 = 100 (highest) */
:where(.class, #id) { } /* 0,0,0,0 = 0 (always 0) */

/* Use cases */

/* :has() - When to use:
   - Style parent based on children
   - Conditional layouts
   - Form validation
   - Content-based styling
*/

/* :is() - When to use:
   - Simplify selector lists
   - Group related selectors
   - When you need specificity
   - Component variants
*/

/* :where() - When to use:
   - Reset styles
   - Base styles that should be easy to override
   - Component library defaults
   - When you want zero specificity
*/

/* Practical: Choosing the right one */
/* Need to style parent? Use :has() */
.card:has(.button) { }

/* Need to group selectors? Use :is() or :where() */
/* Want specificity? Use :is() */
:is(.btn-primary, .btn-secondary) { }

/* Want easy override? Use :where() */
:where(.btn-primary, .btn-secondary) { }
```
