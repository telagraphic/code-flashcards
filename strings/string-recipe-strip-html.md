How do you strip HTML tags from a string using string methods?
?

```javascript
// Recipe: replace(/<[^>]*>/g, '') for simple tags; trim + normalize space

function stripHtml(html) {
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

console.log(stripHtml('<p>Hello <b>world</b></p>')); // 'Hello world'

// Decode common entities (replaceAll)
function stripHtmlAndEntities(html) {
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ')
    .trim();
}

// Practical: Preview text from rich content; search indexing
const plainPreview = stripHtml(articleBody).slice(0, 160) + '...';
```
