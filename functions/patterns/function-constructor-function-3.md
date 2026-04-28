How do you create a constructor function with inheritance using prototypes?
?

```javascript
// Base constructor
function Animal(name, species) {
  this.name = name;
  this.species = species;
}

Animal.prototype.speak = function() {
  return `${this.name} makes a sound`;
};

// Derived constructor
function Dog(name, breed) {
  Animal.call(this, name, 'Dog'); // Call parent constructor
  this.breed = breed;
}

// Inherit from Animal prototype
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

// Override parent method
Dog.prototype.speak = function() {
  return `${this.name} barks!`;
};

Dog.prototype.fetch = function() {
  return `${this.name} fetches the ball`;
};

// Usage
const dog = new Dog('Buddy', 'Golden Retriever');
console.log(dog.speak()); // "Buddy barks!"
console.log(dog.fetch()); // "Buddy fetches the ball"
console.log(dog.species); // "Dog"
```
