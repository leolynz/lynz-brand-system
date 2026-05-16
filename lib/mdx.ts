import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { DocMeta, Doc } from './types'

const CONTENT_DIR = path.join(process.cwd(), 'content')

function getFilesRecursively(dir: string): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  return entries.flatMap((entry) => {
    const fullPath = path.join(dir, entry.name)
    return entry.isDirectory() ? getFilesRecursively(fullPath) : fullPath
  })
}

export async function getAllDocs(): Promise<DocMeta[]> {
  const files = getFilesRecursively(CONTENT_DIR).filter((f) => f.endsWith('.mdx'))

  const docs = files.map((filePath) => {
    const raw = fs.readFileSync(filePath, 'utf8')
    const { data } = matter(raw)
    return data as DocMeta
  })

  return docs.sort((a, b) => {
    const catOrder = ['fundamentos', 'identidade-verbal', 'identidade-visual', 'aplicacoes']
    const catDiff = catOrder.indexOf(a.category) - catOrder.indexOf(b.category)
    if (catDiff !== 0) return catDiff
    return a.order - b.order
  })
}

export async function getDocBySlug(slug: string): Promise<Doc> {
  const files = getFilesRecursively(CONTENT_DIR).filter((f) => f.endsWith('.mdx'))

  for (const filePath of files) {
    const raw = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(raw)
    if (data.slug === slug) {
      return { meta: data as DocMeta, source: content }
    }
  }

  throw new Error(`Doc not found for slug: ${slug}`)
}
