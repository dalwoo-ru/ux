import "server-only"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto"
import { q } from "./db"

const COOKIE = "sid"
const TTL = 30 * 24 * 3600 * 1000

export type User = { id: string; email: string; name: string }

export function hashPassword(pw: string) {
  const salt = randomBytes(16)
  return `${salt.toString("hex")}:${scryptSync(pw, salt, 64).toString("hex")}`
}

export function verifyPassword(pw: string, stored: string) {
  const [salt, hash] = stored.split(":")
  const a = Buffer.from(hash, "hex")
  const b = scryptSync(pw, Buffer.from(salt, "hex"), 64)
  return a.length === b.length && timingSafeEqual(a, b)
}

export async function createSession(userId: string) {
  const token = randomBytes(32).toString("hex")
  const expires = Date.now() + TTL
  await q("INSERT INTO ux_sessions (token, user_id, expires_at) VALUES ($1, $2, $3)", [token, userId, expires])
  ;(await cookies()).set(COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: new Date(expires),
  })
}

export async function destroySession() {
  const jar = await cookies()
  const token = jar.get(COOKIE)?.value
  if (token) await q("DELETE FROM ux_sessions WHERE token = $1", [token])
  jar.delete(COOKIE)
}

export async function getUser(): Promise<User | null> {
  const token = (await cookies()).get(COOKIE)?.value
  if (!token) return null
  const [row] = await q<User>(
    "SELECT u.id, u.email, u.name FROM ux_sessions s JOIN ux_users u ON u.id = s.user_id WHERE s.token = $1 AND s.expires_at > $2",
    [token, Date.now()]
  )
  return row ?? null
}

export async function requireUser() {
  const user = await getUser()
  if (!user) redirect("/login")
  return user
}
