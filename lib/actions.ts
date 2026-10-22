"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { randomBytes } from "node:crypto"
import { q } from "./db"
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
async function ownsFolder(userId: string, folderId: string) {
  return (await q("SELECT 1 FROM ux_folders WHERE id = $1 AND user_id = $2", [folderId, userId])).length > 0
}

const s = (v: FormDataEntryValue | null) => (typeof v === "string" ? v.trim() : "")

// ---------- auth ----------

function dbError(e: unknown): FormState {
  console.error("auth action failed", e)
  const msg = e instanceof Error ? e.message : String(e)
  return { error: `Ошибка базы данных: ${msg}` }
}

export async function register(_: FormState, fd: FormData): Promise<FormState> {
  const name = s(fd.get("name"))
  const email = s(fd.get("email")).toLowerCase()
  const password = s(fd.get("password"))
  if (!name) return { error: "Введите имя" }
  if (!/^\S+@\S+\.\S+$/.test(email)) return { error: "Некорректный email" }
  if (password.length < 8) return { error: "Пароль — минимум 8 символов" }
  try {
    const id = uid()
    const ins = await q(
      "INSERT INTO ux_users (id, email, name, password_hash, created_at) VALUES ($1, $2, $3, $4, $5) ON CONFLICT (email) DO NOTHING RETURNING id",
      [id, email, name, hashPassword(password), Date.now()]
    )
    if (!ins.length) return { error: "Этот email уже зарегистрирован" }
    await createSession(id)
  } catch (e) {
    return dbError(e)
  }
  redirect("/dashboard")
}

export async function login(_: FormState, fd: FormData): Promise<FormState> {
  const email = s(fd.get("email")).toLowerCase()
  const password = s(fd.get("password"))
  try {
    const [u] = await q<{ id: string; password_hash: string }>(
      "SELECT id, password_hash FROM ux_users WHERE email = $1",
      [email]
    )
    if (!u || !verifyPassword(password, u.password_hash)) return { error: "Неверный email или пароль" }
    await createSession(u.id)
  } catch (e) {
    return dbError(e)
  }
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
  await q("INSERT INTO ux_folders (id, user_id, name, created_at) VALUES ($1, $2, $3, $4)", [uid(), user.id, name, Date.now()])
  revalidatePath("/dashboard")
}

export async function deleteFolder(id: string) {
  const user = await requireUser()
  await q("DELETE FROM ux_folders WHERE id = $1 AND user_id = $2", [id, user.id])
  redirect("/dashboard")
}

// ---------- tests ----------

export async function createTest(folderId: string | null) {
  const user = await requireUser()
  if (folderId && !(await ownsFolder(user.id, folderId))) folderId = null
  const id = uid()
  const now = Date.now()
  await q(
    "INSERT INTO ux_tests (id, user_id, folder_id, title, share_id, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7)",
    [id, user.id, folderId, "Новый тест", randomBytes(6).toString("base64url"), now, now]
  )
  redirect(`/tests/${id}`)
}

export async function saveTest(id: string, data: { title: string; description: string; blocks: Block[] }) {
  const user = await requireUser()
  const r = await q(
    "UPDATE ux_tests SET title = $1, description = $2, blocks = $3::jsonb, updated_at = $4 WHERE id = $5 AND user_id = $6 RETURNING id",
    [data.title.trim().slice(0, 200) || "Без названия", data.description.slice(0, 2000), JSON.stringify(data.blocks), Date.now(), id, user.id]
  )
  revalidatePath("/dashboard")
  return { ok: r.length > 0 }
}

export async function setPublished(id: string, published: boolean) {
  const user = await requireUser()
  await q("UPDATE ux_tests SET published = $1 WHERE id = $2 AND user_id = $3", [published ? 1 : 0, id, user.id])
  revalidatePath(`/tests/${id}`)
}

export async function moveTest(id: string, folderId: string | null) {
  const user = await requireUser()
  if (folderId && !(await ownsFolder(user.id, folderId))) return
  await q("UPDATE ux_tests SET folder_id = $1 WHERE id = $2 AND user_id = $3", [folderId, id, user.id])
  revalidatePath("/dashboard")
}

export async function deleteTest(id: string) {
  const user = await requireUser()
  await q("DELETE FROM ux_tests WHERE id = $1 AND user_id = $2", [id, user.id])
  redirect("/dashboard")
}

export async function deleteResponse(testId: string, responseId: string) {
  const user = await requireUser()
  if (!(await getOwnedTest(user.id, testId))) return
  await q("DELETE FROM ux_responses WHERE id = $1 AND test_id = $2", [responseId, testId])
  revalidatePath(`/tests/${testId}`)
}

// ---------- respondent ----------

export async function submitResponse(
  shareId: string,
  raw: Record<string, unknown>,
  durationMs: number
): Promise<{ ok: boolean; error?: string }> {
  const test = await getPublicTest(shareId)
  if (!test) return { ok: false, error: "Тест недоступен" }
  const answers: Answers = {}
  for (const b of test.blocks) {
    const a = cleanAnswer(b, raw?.[b.id])
    if (a === null) {
      if (b.required && b.type !== "context") return { ok: false, error: `Ответьте на обязательный вопрос: ${b.title}` }
    } else answers[b.id] = a
  }
  await q("INSERT INTO ux_responses (id, test_id, answers, duration_ms, created_at) VALUES ($1, $2, $3::jsonb, $4, $5)", [
    uid(), test.id, JSON.stringify(answers), Math.max(0, Math.min(Math.round(durationMs) || 0, 86_400_000)), Date.now(),
  ])
  return { ok: true }
}
