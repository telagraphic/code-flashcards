What are practical use cases for getBoundingClientRect?
?

```javascript
// Practical use cases for getBoundingClientRect

// 1. Tooltip positioning
function positionTooltip(element, tooltip) {
  const rect = element.getBoundingClientRect();
  const tooltipRect = tooltip.getBoundingClientRect();
  
  // Position above element
  tooltip.style.left = rect.left + (rect.width - tooltipRect.width) / 2 + 'px';
  tooltip.style.top = rect.top - tooltipRect.height - 10 + 'px';
}

// 2. Scroll spy (highlight section in viewport)
function updateScrollSpy() {
  const sections = document.querySelectorAll('section');
  const scrollTop = window.scrollY;
  
  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    const navLink = document.querySelector(`a[href="#${section.id}"]`);
    
    if (rect.top <= 100 && rect.bottom >= 100) {
      navLink.classList.add('active');
    } else {
      navLink.classList.remove('active');
    }
  });
}

window.addEventListener('scroll', updateScrollSpy);

// 3. Drag and drop boundaries
function constrainDrag(element, dragX, dragY) {
  const rect = element.getBoundingClientRect();
  const container = element.parentElement;
  const containerRect = container.getBoundingClientRect();
  
  const constrainedX = Math.max(
    containerRect.left,
    Math.min(dragX, containerRect.right - rect.width)
  );
  const constrainedY = Math.max(
    containerRect.top,
    Math.min(dragY, containerRect.bottom - rect.height)
  );
  
  return { x: constrainedX, y: constrainedY };
}

// 4. Intersection detection
function elementsIntersect(el1, el2) {
  const rect1 = el1.getBoundingClientRect();
  const rect2 = el2.getBoundingClientRect();
  
  return !(
    rect1.right < rect2.left ||
    rect1.left > rect2.right ||
    rect1.bottom < rect2.top ||
    rect1.top > rect2.bottom
  );
}

// 5. Sticky header detection
function checkStickyHeader(header) {
  const rect = header.getBoundingClientRect();
  if (rect.top <= 0) {
    header.classList.add('stuck');
  } else {
    header.classList.remove('stuck');
  }
}

window.addEventListener('scroll', () => {
  checkStickyHeader(document.querySelector('header'));
});

// 6. Calculate scroll position for element
function getScrollPositionForElement(element) {
  const rect = element.getBoundingClientRect();
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  return scrollTop + rect.top;
}

// 7. Measure element distance from viewport edges
function getDistanceFromViewport(element) {
  const rect = element.getBoundingClientRect();
  return {
    fromTop: rect.top,
    fromBottom: window.innerHeight - rect.bottom,
    fromLeft: rect.left,
    fromRight: window.innerWidth - rect.right
  };
}
```
