How do you create a constructor function for a Product with methods?
?

```javascript
// Constructor function for Product
function Product(name, price, category) {
  this.name = name;
  this.price = price;
  this.category = category;
  this.inStock = true;
}

// Add methods to prototype
Product.prototype.applyDiscount = function(percent) {
  this.price = this.price * (1 - percent / 100);
  return this.price;
};

Product.prototype.toggleStock = function() {
  this.inStock = !this.inStock;
  return this.inStock;
};

Product.prototype.getDisplayPrice = function() {
  return `$${this.price.toFixed(2)}`;
};

Product.prototype.render = function() {
  return `
    <div class="product">
      <h3>${this.name}</h3>
      <p>${this.getDisplayPrice()}</p>
      <p>${this.inStock ? 'In Stock' : 'Out of Stock'}</p>
    </div>
  `;
};

// Usage
const product = new Product('Laptop', 999.99, 'Electronics');
product.applyDiscount(10);
document.getElementById('products').innerHTML = product.render();
```
