import "server-only"
import { q } from "./db"
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
  return q<Folder>("SELECT id, name FROM folders WHERE user_id = $1 ORDER BY name", [userId])
}

export function listTests(userId: string, folder: string | null) {
  return q<TestRow>(
    `SELECT t.id, t.title, t.description, t.folder_id, t.published, t.share_id, t.updated_at,
      (SELECT COUNT(*)::int FROM responses r WHERE r.test_id = t.id) AS responses
     FROM tests t WHERE t.user_id = $1 AND ${folder ? "t.folder_id = $2" : "t.folder_id IS NULL"}
     ORDER BY t.updated_at DESC`,
    folder ? [userId, folder] : [userId]
  )
}

export async function getOwnedTest(userId: string, id: string) {
  const [t] = await q<Test>("SELECT * FROM tests WHERE id = $1 AND user_id = $2", [id, userId])
  return t ?? null
}

export async function getPublicTest(shareId: string) {
  const [t] = await q<Test>("SELECT * FROM tests WHERE share_id = $1 AND published = 1", [shareId])
  return t ?? null
}

export function listResponses(testId: string) {
  return q<ResponseRow>(
    "SELECT id, answers, duration_ms, created_at FROM responses WHERE test_id = $1 ORDER BY created_at DESC",
    [testId]
  )
}
