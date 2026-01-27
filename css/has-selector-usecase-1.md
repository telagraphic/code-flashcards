How do you use :has() for form validation styling?
?

```css
/* :has() for form validation */

/* Style form group when input is invalid */
.form-group:has(input:invalid) {
  border-left: 3px solid red;
  background-color: #ffe6e6;
}

/* Style form group when input is valid */
.form-group:has(input:valid) {
  border-left: 3px solid green;
}

/* Show error message container when input is invalid */
.form-group:has(input:invalid) .error-message {
  display: block;
}

.form-group:has(input:valid) .error-message {
  display: none;
}

/* Practical: Required field indicator */
.form-group:has(input[required]:invalid)::before {
  content: "Required";
  color: red;
  font-size: 0.875rem;
}

/* Practical: Disable submit button when form has invalid fields */
form:has(input:invalid) button[type="submit"] {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

/* Challenge: Style the entire form when any field is invalid */
form:has(.form-group:has(input:invalid)) {
  border: 2px solid red;
}
```
