What is the Owl Selector (Lobotomized Owl)?
?

```css
/* Owl Selector: * + * (universal adjacent sibling selector)
   Selects all elements that follow another element */

/* Basic owl selector */
* + * {
  margin-top: 1rem;
}
/* Adds margin-top to all elements except first */

/* Practical: Vertical rhythm */
.article * + * {
  margin-top: 1.5rem;
}
/* Consistent spacing between elements */

/* Practical: List spacing */
ul * + * {
  margin-top: 0.5rem;
}
/* Space between list items */

/* Practical: Card components */
.card > * + * {
  margin-top: 1rem;
}
/* Space between card children */

/* Benefits:
   - Consistent spacing
   - Less CSS needed
   - Self-documenting
*/

/* Limitations:
   - Only works with adjacent siblings
   - Can't target first element
   - May need overrides
*/

/* Practical: Combined with other selectors */
.container > * + * {
  border-top: 1px solid #ccc;
  padding-top: 1rem;
}
/* Dividers between sections */

/* Named after the "lobotomized owl" (* + *) */
/* Looks like an owl: * + * */
```
