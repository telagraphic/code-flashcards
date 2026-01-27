How do you get scroll dimensions and position?
?

```javascript
// Scroll dimensions: Content size and scroll position

// window.scrollX / window.scrollY (or pageXOffset / pageYOffset)
// Current scroll position
const scrollX = window.scrollX || window.pageXOffset;
const scrollY = window.scrollY || window.pageYOffset;

// document.documentElement.scrollWidth / scrollHeight
// Total scrollable content size
const scrollWidth = document.documentElement.scrollWidth;
const scrollHeight = document.documentElement.scrollHeight;

// document.documentElement.clientWidth / clientHeight
// Visible viewport size
const clientWidth = document.documentElement.clientWidth;
const clientHeight = document.documentElement.clientHeight;

// Practical: Check if scrolled to bottom
function isScrolledToBottom() {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight;
  const clientHeight = document.documentElement.clientHeight;
  
  return scrollTop + clientHeight >= scrollHeight - 10; // 10px threshold
}

window.addEventListener('scroll', () => {
  if (isScrolledToBottom()) {
    loadMoreContent();
  }
});

// Practical: Scroll progress indicator
function updateScrollProgress() {
  const scrollTop = window.scrollY;
  const scrollHeight = document.documentElement.scrollHeight;
  const clientHeight = document.documentElement.clientHeight;
  const progress = (scrollTop / (scrollHeight - clientHeight)) * 100;
  
  document.getElementById('progress-bar').style.width = progress + '%';
}

window.addEventListener('scroll', updateScrollProgress);

// Practical: Infinite scroll detection
function checkInfiniteScroll() {
  const scrollTop = window.scrollY;
  const scrollHeight = document.documentElement.scrollHeight;
  const clientHeight = document.documentElement.clientHeight;
  const threshold = 200; // pixels from bottom
  
  if (scrollTop + clientHeight >= scrollHeight - threshold) {
    loadMoreItems();
  }
}

window.addEventListener('scroll', checkInfiniteScroll);

// Practical: Scroll to element
function scrollToElement(element) {
  const elementTop = element.offsetTop;
  window.scrollTo({
    top: elementTop,
    behavior: 'smooth'
  });
}
```
