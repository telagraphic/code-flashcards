const KEY = 'flashcard-app.session.v1'

export class SessionStore {
  /**
   * @returns {{ deckId: string, cardIndex: number } | null}
   */
  load() {
    try {
      const raw = localStorage.getItem(KEY)
      if (!raw) return null
      const data = JSON.parse(raw)
      if (!data || typeof data !== 'object') return null
      const deckId = typeof data.deckId === 'string' ? data.deckId : null
      const cardIndex =
        typeof data.cardIndex === 'number' && Number.isFinite(data.cardIndex)
          ? data.cardIndex
          : null
      if (!deckId || cardIndex === null) return null
      return { deckId, cardIndex }
    } catch {
      return null
    }
  }

  /**
   * @param {{ deckId: string, cardIndex: number }} session
   */
  save(session) {
    localStorage.setItem(KEY, JSON.stringify(session))
  }
}
