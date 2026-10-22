import Link from "next/link"
import { redirect } from "next/navigation"
import { getUser } from "@/lib/auth"
import { Button } from "@/components/ui/button"

export default async function Home() {
  if (await getUser()) redirect("/dashboard")
  return (
    <main className="mx-auto flex min-h-svh max-w-2xl flex-col items-center justify-center gap-6 p-6 text-center">
      <h1 className="text-4xl font-semibold tracking-tight">UX Research</h1>
      <p className="text-muted-foreground">
        Создавайте тесты из готовых блоков, делитесь ссылкой с респондентами и собирайте результаты в одном месте.
      </p>
      <div className="flex gap-2">
        <Button asChild><Link href="/register">Начать бесплатно</Link></Button>
        <Button asChild variant="outline"><Link href="/login">Войти</Link></Button>
      </div>
    </main>
  )
}
