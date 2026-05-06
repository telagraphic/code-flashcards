import MarkdownIt from 'markdown-it'
import DOMPurify from 'dompurify'
import hljs from 'highlight.js/lib/core'
import bash from 'highlight.js/lib/languages/bash'
import css from 'highlight.js/lib/languages/css'
import javascript from 'highlight.js/lib/languages/javascript'
import json from 'highlight.js/lib/languages/json'
import typescript from 'highlight.js/lib/languages/typescript'
import xml from 'highlight.js/lib/languages/xml'

const LANG_ALIASES = {
  js: 'javascript',
  javascript: 'javascript',
  ts: 'typescript',
  typescript: 'typescript',
  html: 'xml',
  htm: 'xml',
  xml: 'xml',
  sh: 'bash',
  shell: 'bash',
}

hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('css', css)
hljs.registerLanguage('xml', xml)
hljs.registerLanguage('json', json)
hljs.registerLanguage('typescript', typescript)
hljs.registerLanguage('bash', bash)

const PURIFY = {
  ALLOWED_TAGS: [
    'p',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'ul',
    'ol',
    'li',
    'strong',
    'em',
    'code',
    'pre',
    'a',
    'blockquote',
    'hr',
    'del',
    'br',
    'span',
  ],
  ALLOWED_ATTR: ['href', 'target', 'rel', 'class'],
}

function normalizeLang(lang) {
  if (!lang) return ''
  const key = String(lang).trim().toLowerCase()
  return LANG_ALIASES[key] || key
}

function escapeHtml(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function highlightCode(str, rawLang) {
  const lang = normalizeLang(rawLang)
  try {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(str, { language: lang, ignoreIllegals: true }).value
    }
  } catch {
    /* fall through */
  }
  return escapeHtml(str)
}

export class MarkdownRenderer {

  constructor() {
    this.md = new MarkdownIt({
      html: false,
      linkify: true,
      typographer: false,
      highlight: (src, rawLang) => {
        const highlighted = highlightCode(src, rawLang)
        const langClass = normalizeLang(rawLang)
          ? ` language-${escapeHtml(normalizeLang(rawLang))}`
          : ''
        return `<pre class="hljs${langClass}"><code>${highlighted}</code></pre>`
      },
    })
  }

  /**
   * @param {string} markdown
   * @returns {string}
   */
  renderToHtml(markdown) {
    const dirty = this.md.render(markdown ?? '')
    return DOMPurify.sanitize(dirty, PURIFY)
  }
}
