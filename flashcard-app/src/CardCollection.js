export class CardCollection {
  /**
   * @param {{ deck: string, path: string }[]} cards
   */
  constructor(cards) {
    const safe = Array.isArray(cards) ? cards : []
    this.cards = [...safe].sort(
      (a, b) => a.deck.localeCompare(b.deck) || a.path.localeCompare(b.path),
    )
    this.deckIds = [...new Set(this.cards.map((c) => c.deck))].sort((a, b) =>
      a.localeCompare(b),
    )
  }

  /**
   * @param {'all' | string} deckId
   */
  getCards(deckId) {
    if (deckId === 'all') return this.cards
    return this.cards.filter((c) => c.deck === deckId)
  }
}
