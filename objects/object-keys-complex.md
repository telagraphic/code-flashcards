What is a complex scenario using Object.keys() in modern web apps?
?

```javascript
// Complex: Dynamic form field generation and validation

// Practical: Generate form fields from object structure
class FormGenerator {
  constructor(schema) {
    this.schema = schema;
  }
  
  generateFields(data) {
    const fields = {};
    
    for (const key of Object.keys(data)) {
      const value = data[key];
      const fieldConfig = this.schema[key] || {};
      
      fields[key] = {
        name: key,
        type: this.inferType(value, fieldConfig.type),
        value: value,
        required: fieldConfig.required || false,
        validation: fieldConfig.validation || null,
        label: fieldConfig.label || this.formatLabel(key)
      };
    }
    
    return fields;
  }
  
  inferType(value, explicitType) {
    if (explicitType) return explicitType;
    
    if (typeof value === 'number') return 'number';
    if (typeof value === 'boolean') return 'checkbox';
    if (value instanceof Date) return 'date';
    if (typeof value === 'string') {
      if (value.includes('@')) return 'email';
      if (value.match(/^\d{4}-\d{2}-\d{2}$/)) return 'date';
      return 'text';
    }
    return 'text';
  }
  
  formatLabel(key) {
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .trim();
  }
}

// Usage
const schema = {
  email: { type: 'email', required: true },
  age: { type: 'number', validation: (val) => val >= 18 }
};

const generator = new FormGenerator(schema);
const data = { email: 'alice@example.com', age: 30, userName: 'Alice' };
const fields = generator.generateFields(data);

// Complex: Object diff with key tracking
function calculateObjectDiff(obj1, obj2) {
  const allKeys = new Set([...Object.keys(obj1), ...Object.keys(obj2)]);
  const diff = {
    added: {},
    removed: {},
    changed: {},
    unchanged: {}
  };
  
  for (const key of allKeys) {
    const val1 = obj1[key];
    const val2 = obj2[key];
    
    if (!(key in obj1)) {
      diff.added[key] = val2;
    } else if (!(key in obj2)) {
      diff.removed[key] = val1;
    } else if (val1 !== val2) {
      diff.changed[key] = { old: val1, new: val2 };
    } else {
      diff.unchanged[key] = val1;
    }
  }
  
  return diff;
}

// Complex: Permission-based field filtering
class PermissionFilter {
  constructor(permissions) {
    this.permissions = permissions;
  }
  
  filterFields(data, fieldPermissions) {
    const allowedKeys = Object.keys(data).filter(key => {
      const requiredPermission = fieldPermissions[key];
      if (!requiredPermission) return true; // No permission required
      
      return this.permissions.includes(requiredPermission);
    });
    
    return Object.fromEntries(
      allowedKeys.map(key => [key, data[key]])
    );
  }
}

// Usage
const user = {
  name: 'Alice',
  email: 'alice@example.com',
  salary: 50000,
  ssn: '123-45-6789'
};

const fieldPermissions = {
  name: null, // Public
  email: null, // Public
  salary: 'hr', // HR only
  ssn: 'admin' // Admin only
};

const filter = new PermissionFilter(['hr']);
const filtered = filter.filterFields(user, fieldPermissions);
// { name: 'Alice', email: 'alice@example.com', salary: 50000 }
```
