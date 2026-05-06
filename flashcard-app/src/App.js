import { CardCollection } from './CardCollection.js'
import { FlashcardParser } from './FlashcardParser.js'
import { MarkdownRenderer } from './MarkdownRenderer.js'
import { SessionStore } from './SessionStore.js'

export class App {
  constructor() {
    this.parser = new FlashcardParser()
    this.renderer = new MarkdownRenderer()
    this.session = new SessionStore()

    this.collection = null
    this.deckId = 'all'
    this.cardIndex = 0
    this.showAnswer = false

    /** @type {{ path: string, raw: string } | null} */
    this.cache = null
    this.abortFetch = null

    this.root = null
    this.refs = {}
    this._onKeyDown = this._onKeyDown.bind(this)
  }

  /**
   * @param {HTMLElement} root
   */
  mount(root) {
    this.root = root
    this.root.innerHTML = this._template()
    this._cacheRefs()
    this._wire()
    document.addEventListener('keydown', this._onKeyDown)
    void this._bootstrap()
  }

  destroy() {
    document.removeEventListener('keydown', this._onKeyDown)
    if (this.abortFetch) this.abortFetch.abort()
  }

  _template() {
    return `
      <div class="shell">
        <header class="toolbar" role="region" aria-label="Flashcard controls">
          <label class="deck-field">
            <span class="label-text">Deck</span>
            <select id="deck-select" class="deck-select"></select>
          </label>
          <div class="nav-group" role="group" aria-label="Card navigation">
            <button type="button" class="btn" id="btn-prev">Prev</button>
            <button type="button" class="btn" id="btn-next">Next</button>
            <button type="button" class="btn" id="btn-random">Random</button>
          </div>
          <button type="button" class="btn btn-primary" id="btn-toggle">Show answer</button>
        </header>
        <main class="stage">
          <article class="card" aria-live="polite">
            <div id="card-body" class="card-body prose"></div>
            <p id="card-meta" class="card-meta"></p>
          </article>
        </main>
        <p id="app-error" class="app-error" role="alert" hidden></p>
      </div>
    `
  }

  _cacheRefs() {
    this.refs = {
      deckSelect: this.root.querySelector('#deck-select'),
      prev: this.root.querySelector('#btn-prev'),
      next: this.root.querySelector('#btn-next'),
      random: this.root.querySelector('#btn-random'),
      toggle: this.root.querySelector('#btn-toggle'),
      cardBody: this.root.querySelector('#card-body'),
      cardMeta: this.root.querySelector('#card-meta'),
      error: this.root.querySelector('#app-error'),
    }
  }

  _wire() {
    this.refs.deckSelect.addEventListener('change', () => {
      this.deckId = this.refs.deckSelect.value
      this.cardIndex = 0
      this.showAnswer = false
      this.cache = null
      void this.renderCard()
    })

    this.refs.prev.addEventListener('click', () => {
      void this.goPrev()
    })
    this.refs.next.addEventListener('click', () => {
      void this.goNext()
    })
    this.refs.random.addEventListener('click', () => {
      void this.goRandom()
    })
    this.refs.toggle.addEventListener('click', () => {
      void this.toggleAnswer()
    })
  }

  _onKeyDown(e) {
    const tag = document.activeElement?.tagName
    if (tag === 'INPUT' || tag === 'TEXTAREA') return

    if (e.code === 'ArrowLeft') {
      e.preventDefault()
      void this.goPrev()
      return
    }
    if (e.code === 'ArrowRight') {
      e.preventDefault()
      void this.goNext()
      return
    }
    if (e.code === 'Space') {
      e.preventDefault()
      void this.toggleAnswer()
      return
    }
    if (e.code === 'KeyR' && !e.ctrlKey && !e.metaKey) {
      e.preventDefault()
      void this.goRandom()
    }
  }

  async _bootstrap() {
    try {
      const res = await fetch('/flashcards/index.json')
      if (!res.ok) {
        throw new Error(`Could not load /flashcards/index.json (HTTP ${res.status}). Run npm run generate-index.`)
      }
      const data = await res.json()
      this.collection = new CardCollection(data.cards)
      this._populateDeckSelect()
      this._applySavedSession()
      await this.renderCard()
    } catch (err) {
      this._showError(err instanceof Error ? err.message : String(err))
    }
  }

  _showError(message) {
    const el = this.refs.error
    if (!el) return
    el.textContent = message
    el.hidden = false
  }

  _populateDeckSelect() {
    const sel = this.refs.deckSelect
    sel.replaceChildren()

    const all = document.createElement('option')
    all.value = 'all'
    all.textContent = 'All decks'
    sel.appendChild(all)

    for (const id of this.collection.deckIds) {
      const opt = document.createElement('option')
      opt.value = id
      opt.textContent = id
      sel.appendChild(opt)
    }
  }

  _applySavedSession() {
    const stored = this.session.load()
    const ids = new Set(['all', ...this.collection.deckIds])

    if (stored && ids.has(stored.deckId)) {
      this.deckId = stored.deckId
    } else {
      this.deckId = 'all'
    }

    this.refs.deckSelect.value = this.deckId

    const list = this.collection.getCards(this.deckId)
    let idx = stored && stored.deckId === this.deckId ? stored.cardIndex : 0
    this.cardIndex = this._clampIndex(idx, list.length)
    this.showAnswer = false
    this.cache = null
    this._persist()
  }

  _persist() {
    this.session.save({ deckId: this.deckId, cardIndex: this.cardIndex })
  }

  /**
   * @param {number} idx
   * @param {number} len
   */
  _clampIndex(idx, len) {
    if (len <= 0) return 0
    if (!Number.isFinite(idx)) return 0
    if (idx < 0) return 0
    if (idx >= len) return len - 1
    return idx
  }

  async renderCard() {
    const list = this.collection?.getCards(this.deckId) ?? []
    if (!this.collection) return

    const navEnabled = list.length > 0
    ;[this.refs.prev, this.refs.next, this.refs.random, this.refs.toggle].forEach((b) => {
      b.disabled = !navEnabled
    })

    if (!list.length) {
      this.cache = null
      this.refs.cardBody.innerHTML = '<p class="muted">No cards in this selection. Copy markdown into <code>public/flashcards/</code> and run <code>npm run generate-index</code>.</p>'
      this.refs.cardMeta.textContent = ''
      this._persist()
      return
    }

    this.cardIndex = this._clampIndex(this.cardIndex, list.length)
    const current = list[this.cardIndex]

    if (this.cache?.path !== current.path) {
      if (this.abortFetch) this.abortFetch.abort()
      this.abortFetch = new AbortController()
      const res = await fetch(`/flashcards/${current.path}`, { signal: this.abortFetch.signal })
      if (!res.ok) {
        this.refs.cardBody.innerHTML = `<p class="muted">Failed to load card (HTTP ${res.status}).</p>`
        this.refs.cardMeta.textContent = `${current.deck} · ${current.path}`
        return
      }
      const raw = await res.text()
      this.cache = { path: current.path, raw }
    }

    const { front, back } = this.parser.split(this.cache.raw)
    const markdown = this.showAnswer ? back : front
    this.refs.cardBody.innerHTML = this.renderer.renderToHtml(markdown)
    this.refs.cardMeta.textContent = `${current.deck} · ${current.path}`
    this._updateToggleLabel()
    this._persist()
  }

  _updateToggleLabel() {
    this.refs.toggle.textContent = this.showAnswer ? 'Show question' : 'Show answer'
  }

  async goPrev() {
    const list = this.collection.getCards(this.deckId)
    if (!list.length) return
    this.showAnswer = false
    this.cardIndex = (this.cardIndex - 1 + list.length) % list.length
    await this.renderCard()
  }

  async goNext() {
    const list = this.collection.getCards(this.deckId)
    if (!list.length) return
    this.showAnswer = false
    this.cardIndex = (this.cardIndex + 1) % list.length
    await this.renderCard()
  }

  async goRandom() {
    const list = this.collection.getCards(this.deckId)
    if (!list.length) return
    this.showAnswer = false
    if (list.length === 1) {
      this.cardIndex = 0
    } else {
      let next = this.cardIndex
      do {
        next = Math.floor(Math.random() * list.length)
      } while (next === this.cardIndex)
      this.cardIndex = next
    }
    await this.renderCard()
  }

  async toggleAnswer() {
    const list = this.collection.getCards(this.deckId)
    if (!list.length) return
    this.showAnswer = !this.showAnswer
    await this.renderCard()
  }
}
