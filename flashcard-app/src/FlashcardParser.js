export class FlashcardParser {
  /**
   * @param {string} raw
   * @returns {{ front: string, back: string }}
   */
  split(raw) {
    const text = raw ?? ''
    const lines = text.split(/\r?\n/)
    const idx = lines.findIndex((line) => line.trim() === '?')

    if (idx === -1) {
      return { front: text.trimEnd(), back: '' }
    }

    const front = lines.slice(0, idx).join('\n')
    const back = lines.slice(idx + 1).join('\n')
    return { front, back }
  }
}
