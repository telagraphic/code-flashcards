How do you use Object.create() for prototype-based inheritance?
?

```javascript
// Object.create() for inheritance patterns

// Practical: Simple inheritance chain
const Shape = {
  getArea() {
    return 0;
  },
  describe() {
    return `Shape with area ${this.getArea()}`;
  }
};

const Rectangle = Object.create(Shape);
Rectangle.getArea = function() {
  return this.width * this.height;
};

const Circle = Object.create(Shape);
Circle.getArea = function() {
  return Math.PI * this.radius * this.radius;
};

const rect = Object.create(Rectangle);
rect.width = 10;
rect.height = 5;
console.log(rect.getArea()); // 50

// Practical: Mixin pattern
const CanFly = {
  fly() {
    return `${this.name} is flying`;
  }
};

const CanSwim = {
  swim() {
    return `${this.name} is swimming`;
  }
};

function createAnimal(name) {
  const animal = Object.create({});
  animal.name = name;
  return animal;
}

const duck = createAnimal('Duck');
Object.assign(duck, CanFly, CanSwim);
console.log(duck.fly()); // "Duck is flying"
console.log(duck.swim()); // "Duck is swimming"

// Practical: Factory function with prototype
function createUser(name, email) {
  const user = Object.create(userPrototype);
  user.name = name;
  user.email = email;
  return user;
}

const userPrototype = {
  getDisplayName() {
    return `${this.name} (${this.email})`;
  },
  updateEmail(newEmail) {
    this.email = newEmail;
  }
};

const user = createUser('Alice', 'alice@example.com');
console.log(user.getDisplayName()); // "Alice (alice@example.com)"

// Practical: Composition over inheritance
const EventEmitter = {
  on(event, handler) {
    if (!this._events) this._events = {};
    if (!this._events[event]) this._events[event] = [];
    this._events[event].push(handler);
  },
  emit(event, data) {
    if (this._events && this._events[event]) {
      this._events[event].forEach(handler => handler(data));
    }
  }
};

const component = Object.create(EventEmitter);
component.on('click', (data) => console.log('Clicked:', data));
component.emit('click', { id: 1 });
```
