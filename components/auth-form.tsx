"use client"

import Link from "next/link"
import { useActionState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import type { FormState } from "@/lib/actions"

export function AuthForm({
  mode,
  action,
}: {
  mode: "login" | "register"
  action: (s: FormState, fd: FormData) => Promise<FormState>
}) {
  const [state, run, pending] = useActionState(action, undefined)
  const reg = mode === "register"
  return (
    <main className="flex min-h-svh items-center justify-center p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>{reg ? "Регистрация" : "Вход"}</CardTitle>
          <CardDescription>{reg ? "Создайте аккаунт исследователя" : "Войдите в свой аккаунт"}</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={run} className="flex flex-col gap-4">
            {reg && (
              <div className="flex flex-col gap-2">
                <Label htmlFor="name">Имя</Label>
                <Input id="name" name="name" required autoComplete="name" />
              </div>
            )}
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required autoComplete="email" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="password">Пароль</Label>
              <Input id="password" name="password" type="password" required minLength={reg ? 8 : undefined} autoComplete={reg ? "new-password" : "current-password"} />
            </div>
            {state?.error && (
              <Alert variant="destructive"><AlertDescription>{state.error}</AlertDescription></Alert>
            )}
            <Button type="submit" disabled={pending}>{reg ? "Зарегистрироваться" : "Войти"}</Button>
            <p className="text-center text-sm text-muted-foreground">
              {reg ? "Уже есть аккаунт? " : "Нет аккаунта? "}
              <Link className="underline" href={reg ? "/login" : "/register"}>{reg ? "Войти" : "Регистрация"}</Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </main>
  )
}
