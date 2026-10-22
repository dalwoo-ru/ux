import "server-only"
import { db } from "./db"
import type { Block, Answers } from "./blocks"

export type Folder = { id: string; name: string }
export type TestRow = {
  id: string
  title: string
  description: string
  folder_id: string | null
  published: number
  share_id: string
  updated_at: number
  responses: number
}
export type Test = Omit<TestRow, "responses"> & { blocks: Block[] }
export type ResponseRow = { id: string; answers: Answers; duration_ms: number; created_at: number }

export function listFolders(userId: string) {
  return db.prepare("SELECT id, name FROM folders WHERE user_id = ? ORDER BY name").all(userId) as Folder[]
}

export function listTests(userId: string, folder: string | null) {
  const where = folder ? "t.folder_id = ?" : "t.folder_id IS NULL"
  const args = folder ? [userId, folder] : [userId]
  return db
    .prepare(
      `SELECT t.id, t.title, t.description, t.folder_id, t.published, t.share_id, t.updated_at,
        (SELECT COUNT(*) FROM responses r WHERE r.test_id = t.id) AS responses
       FROM tests t WHERE t.user_id = ? AND ${where} ORDER BY t.updated_at DESC`
    )
    .all(...args) as TestRow[]
}

function parseTest(row: (Omit<Test, "blocks"> & { blocks: string }) | undefined): Test | null {
  return row ? { ...row, blocks: JSON.parse(row.blocks) } : null
}

export function getOwnedTest(userId: string, id: string) {
  return parseTest(
    db.prepare("SELECT * FROM tests WHERE id = ? AND user_id = ?").get(id, userId) as never
  )
}

export function getPublicTest(shareId: string) {
  return parseTest(
    db.prepare("SELECT * FROM tests WHERE share_id = ? AND published = 1").get(shareId) as never
  )
}

export function listResponses(testId: string) {
  return (
    db
      .prepare("SELECT id, answers, duration_ms, created_at FROM responses WHERE test_id = ? ORDER BY created_at DESC")
      .all(testId) as { id: string; answers: string; duration_ms: number; created_at: number }[]
  ).map((r): ResponseRow => ({ ...r, answers: JSON.parse(r.answers) }))
}
