#!/usr/bin/env node
/**
 * Scans public/flashcards for all .md files (excluding index.json) and writes
 * public/flashcards/index.json for the runtime app to consume.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '../public/flashcards')

function walk(dir, relBase, out) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  for (const ent of entries) {
    if (ent.name === 'index.json') continue
    const abs = path.join(dir, ent.name)
    const rel = relBase ? `${relBase}/${ent.name}` : ent.name
    if (ent.isDirectory()) {
      walk(abs, rel.replace(/\\/g, '/'), out)
      continue
    }
    if (!ent.name.endsWith('.md')) continue

    const parts = rel.split(/[/\\]/)
    const deck = parts[0]
    if (!deck) continue
    out.push({
      deck,
      path: rel.replace(/\\/g, '/'),
    })
  }
}

function main() {
  const cards = []
  if (fs.existsSync(ROOT)) {
    walk(ROOT, '', cards)
  }

  cards.sort((a, b) => a.deck.localeCompare(b.deck) || a.path.localeCompare(b.path))

  const payload = {
    generatedAt: new Date().toISOString(),
    cards,
  }

  fs.mkdirSync(ROOT, { recursive: true })
  fs.writeFileSync(path.join(ROOT, 'index.json'), `${JSON.stringify(payload, null, 2)}\n`, 'utf8')
  console.log(`Wrote ${cards.length} card(s) to public/flashcards/index.json`)
}

main()
