"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { randomBytes } from "node:crypto"
import { db } from "./db"
import {
  createSession,
  destroySession,
  hashPassword,
  requireUser,
  verifyPassword,
} from "./auth"
import { cleanAnswer, type Answers, type Block } from "./blocks"
import { getOwnedTest, getPublicTest } from "./data"

export type FormState = { error?: string } | undefined

const uid = () => crypto.randomUUID()
const s = (v: FormDataEntryValue | null) => (typeof v === "string" ? v.trim() : "")

// ---------- auth ----------

export async function register(_: FormState, fd: FormData): Promise<FormState> {
  const name = s(fd.get("name"))
  const email = s(fd.get("email")).toLowerCase()
  const password = s(fd.get("password"))
  if (!name) return { error: "Введите имя" }
  if (!/^\S+@\S+\.\S+$/.test(email)) return { error: "Некорректный email" }
  if (password.length < 8) return { error: "Пароль — минимум 8 символов" }
  if (db.prepare("SELECT 1 FROM users WHERE email = ?").get(email))
    return { error: "Этот email уже зарегистрирован" }
  const id = uid()
  db.prepare("INSERT INTO users (id, email, name, password_hash, created_at) VALUES (?, ?, ?, ?, ?)").run(
    id, email, name, hashPassword(password), Date.now()
  )
  await createSession(id)
  redirect("/dashboard")
}

export async function login(_: FormState, fd: FormData): Promise<FormState> {
  const email = s(fd.get("email")).toLowerCase()
  const password = s(fd.get("password"))
  const u = db.prepare("SELECT id, password_hash FROM users WHERE email = ?").get(email) as
    | { id: string; password_hash: string }
    | undefined
  if (!u || !verifyPassword(password, u.password_hash)) return { error: "Неверный email или пароль" }
  await createSession(u.id)
  redirect("/dashboard")
}

export async function logout() {
  await destroySession()
  redirect("/login")
}

// ---------- folders ----------

export async function createFolder(fd: FormData) {
  const user = await requireUser()
  const name = s(fd.get("name")).slice(0, 80)
  if (!name) return
  db.prepare("INSERT INTO folders (id, user_id, name, created_at) VALUES (?, ?, ?, ?)").run(uid(), user.id, name, Date.now())
  revalidatePath("/dashboard")
}

export async function deleteFolder(id: string) {
  const user = await requireUser()
  db.prepare("DELETE FROM folders WHERE id = ? AND user_id = ?").run(id, user.id)
  redirect("/dashboard")
}

// ---------- tests ----------

export async function createTest(folderId: string | null) {
  const user = await requireUser()
  if (folderId && !db.prepare("SELECT 1 FROM folders WHERE id = ? AND user_id = ?").get(folderId, user.id))
    folderId = null
  const id = uid()
  const now = Date.now()
  db.prepare(
    "INSERT INTO tests (id, user_id, folder_id, title, share_id, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)"
  ).run(id, user.id, folderId, "Новый тест", randomBytes(6).toString("base64url"), now, now)
  redirect(`/tests/${id}`)
}

export async function saveTest(id: string, data: { title: string; description: string; blocks: Block[] }) {
  const user = await requireUser()
  const r = db
    .prepare("UPDATE tests SET title = ?, description = ?, blocks = ?, updated_at = ? WHERE id = ? AND user_id = ?")
    .run(data.title.trim().slice(0, 200) || "Без названия", data.description.slice(0, 2000), JSON.stringify(data.blocks), Date.now(), id, user.id)
  revalidatePath("/dashboard")
  return { ok: r.changes > 0 }
}

export async function setPublished(id: string, published: boolean) {
  const user = await requireUser()
  db.prepare("UPDATE tests SET published = ? WHERE id = ? AND user_id = ?").run(published ? 1 : 0, id, user.id)
  revalidatePath(`/tests/${id}`)
}

export async function moveTest(id: string, folderId: string | null) {
  const user = await requireUser()
  if (folderId && !db.prepare("SELECT 1 FROM folders WHERE id = ? AND user_id = ?").get(folderId, user.id)) return
  db.prepare("UPDATE tests SET folder_id = ? WHERE id = ? AND user_id = ?").run(folderId, id, user.id)
  revalidatePath("/dashboard")
}

export async function deleteTest(id: string) {
  const user = await requireUser()
  db.prepare("DELETE FROM tests WHERE id = ? AND user_id = ?").run(id, user.id)
  redirect("/dashboard")
}

export async function deleteResponse(testId: string, responseId: string) {
  const user = await requireUser()
  if (!getOwnedTest(user.id, testId)) return
  db.prepare("DELETE FROM responses WHERE id = ? AND test_id = ?").run(responseId, testId)
  revalidatePath(`/tests/${testId}`)
}

// ---------- respondent ----------

export async function submitResponse(
  shareId: string,
  raw: Record<string, unknown>,
  durationMs: number
): Promise<{ ok: boolean; error?: string }> {
  const test = getPublicTest(shareId)
  if (!test) return { ok: false, error: "Тест недоступен" }
  const answers: Answers = {}
  for (const b of test.blocks) {
    const a = cleanAnswer(b, raw?.[b.id])
    if (a === null) {
      if (b.required && b.type !== "context") return { ok: false, error: `Ответьте на обязательный вопрос: ${b.title}` }
    } else answers[b.id] = a
  }
  db.prepare("INSERT INTO responses (id, test_id, answers, duration_ms, created_at) VALUES (?, ?, ?, ?, ?)").run(
    uid(), test.id, JSON.stringify(answers), Math.max(0, Math.min(Math.round(durationMs) || 0, 86_400_000)), Date.now()
  )
  return { ok: true }
}
