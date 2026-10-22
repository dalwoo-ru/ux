import { neon } from "@neondatabase/serverless"

const url = process.env.DATABASE_URL ?? process.env.POSTGRES_URL
const sql = url ? neon(url) : null

const SCHEMA = [
  `CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    password_hash TEXT NOT NULL,
    created_at DOUBLE PRECISION NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS sessions (
    token TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    expires_at DOUBLE PRECISION NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS folders (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    created_at DOUBLE PRECISION NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS tests (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    folder_id TEXT REFERENCES folders(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL DEFAULT '',
    blocks JSONB NOT NULL DEFAULT '[]',
    published INTEGER NOT NULL DEFAULT 0,
    share_id TEXT NOT NULL UNIQUE,
    created_at DOUBLE PRECISION NOT NULL,
    updated_at DOUBLE PRECISION NOT NULL
  )`,
  `CREATE INDEX IF NOT EXISTS tests_user ON tests(user_id, folder_id)`,
  `CREATE TABLE IF NOT EXISTS responses (
    id TEXT PRIMARY KEY,
    test_id TEXT NOT NULL REFERENCES tests(id) ON DELETE CASCADE,
    answers JSONB NOT NULL,
    duration_ms INTEGER NOT NULL DEFAULT 0,
    created_at DOUBLE PRECISION NOT NULL
  )`,
  `CREATE INDEX IF NOT EXISTS responses_test ON responses(test_id, created_at)`,
]

const g = globalThis as unknown as { __ready?: Promise<void> }

function ready() {
  if (!sql) throw new Error("DATABASE_URL is not set (connect a Neon database)")
  return (g.__ready ??= (async () => {
    for (const s of SCHEMA) await sql.query(s)
  })().catch((e) => {
    g.__ready = undefined
    throw e
  }))
}

/** Run a parameterised query ($1, $2…) and return rows. */
export async function q<T = Record<string, unknown>>(text: string, params: unknown[] = []): Promise<T[]> {
  await ready()
  return (await sql!.query(text, params)) as T[]
}
