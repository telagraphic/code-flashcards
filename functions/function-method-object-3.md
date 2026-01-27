How do you create an object with methods that manage form state?
?

```javascript
// Form state manager object
const formManager = {
  fields: {},
  errors: {},
  
  setField(name, value) {
    this.fields[name] = value;
    this.validateField(name);
  },
  
  validateField(name) {
    const value = this.fields[name];
    if (!value || value.trim() === '') {
      this.errors[name] = `${name} is required`;
    } else {
      delete this.errors[name];
    }
  },
  
  isValid() {
    return Object.keys(this.errors).length === 0;
  },
  
  getFormData() {
    return { ...this.fields };
  },
  
  reset() {
    this.fields = {};
    this.errors = {};
  }
};

// Usage
formManager.setField('username', 'alice');
formManager.setField('email', '');
formManager.validateField('email');
console.log(formManager.isValid()); // false
console.log(formManager.errors); // { email: 'email is required' }
```
