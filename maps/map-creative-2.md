How do you use a Map for virtual scrolling with viewport culling?
?

```javascript
// Map for efficient virtual scrolling - only render visible items
class VirtualScrollManager {
  constructor(container, itemHeight = 50) {
    this.container = container;
    this.itemHeight = itemHeight;
    this.items = new Map(); // All items
    this.visibleRange = { start: 0, end: 0 };
    this.viewportHeight = container.clientHeight;
  }
  
  setItems(items) {
    // Store items in Map with index as key
    this.items.clear();
    items.forEach((item, index) => {
      this.items.set(index, item);
    });
    this.updateVisibleRange();
  }
  
  updateVisibleRange() {
    const scrollTop = this.container.scrollTop;
    const start = Math.floor(scrollTop / this.itemHeight);
    const end = Math.min(
      start + Math.ceil(this.viewportHeight / this.itemHeight) + 1,
      this.items.size
    );
    
    this.visibleRange = { start, end };
    this.render();
  }
  
  render() {
    const fragment = document.createDocumentFragment();
    
    // Only render visible items from Map
    for (let i = this.visibleRange.start; i < this.visibleRange.end; i++) {
      if (this.items.has(i)) {
        const item = this.items.get(i);
        const element = this.createItemElement(item, i);
        fragment.appendChild(element);
      }
    }
    
    this.container.innerHTML = '';
    this.container.appendChild(fragment);
    
    // Set total height for scrollbar
    this.container.style.height = `${this.items.size * this.itemHeight}px`;
  }
  
  createItemElement(item, index) {
    const div = document.createElement('div');
    div.style.height = `${this.itemHeight}px`;
    div.style.position = 'absolute';
    div.style.top = `${index * this.itemHeight}px`;
    div.textContent = item.text;
    return div;
  }
}

// Usage: Handle thousands of items efficiently
const scrollContainer = document.getElementById('scroll-container');
const virtualScroll = new VirtualScrollManager(scrollContainer);

// Load 10,000 items - only renders ~20 visible ones
const items = Array.from({ length: 10000 }, (_, i) => ({
  id: i,
  text: `Item ${i}`
}));

virtualScroll.setItems(items);
scrollContainer.addEventListener('scroll', () => {
  virtualScroll.updateVisibleRange();
});
```
