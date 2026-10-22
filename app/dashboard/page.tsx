import Link from "next/link"
import { FileText, Folder, FolderPlus, Plus, Trash2 } from "lucide-react"
import { AppHeader } from "@/components/app-header"
import { TestMenu } from "@/components/test-menu"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty"
import { Input } from "@/components/ui/input"
import { requireUser } from "@/lib/auth"
import { listFolders, listTests } from "@/lib/data"
import { createFolder, createTest, deleteFolder } from "@/lib/actions"
import { cn } from "@/lib/utils"

export default async function Dashboard({ searchParams }: { searchParams: Promise<{ folder?: string }> }) {
  const user = await requireUser()
  const folders = listFolders(user.id)
  const { folder } = await searchParams
  const current = folders.find((f) => f.id === folder) ?? null
  const tests = listTests(user.id, current?.id ?? null)

  const navItem = (active: boolean) =>
    cn("flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-accent", active && "bg-accent font-medium")

  return (
    <>
      <AppHeader user={user} />
      <div className="mx-auto grid max-w-6xl gap-6 p-4 md:grid-cols-[240px_1fr]">
        <aside className="flex flex-col gap-2">
          <Link href="/dashboard" className={navItem(!current)}><FileText className="size-4" /> Все тесты</Link>
          {folders.map((f) => (
            <Link key={f.id} href={`/dashboard?folder=${f.id}`} className={navItem(current?.id === f.id)}>
              <Folder className="size-4" /> <span className="truncate">{f.name}</span>
            </Link>
          ))}
          <form action={createFolder} className="mt-2 flex gap-2">
            <Input name="name" placeholder="Новая папка" required maxLength={80} />
            <Button type="submit" size="icon" variant="outline" aria-label="Создать папку"><FolderPlus /></Button>
          </form>
        </aside>

        <main className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-2">
            <h1 className="text-2xl font-semibold tracking-tight">{current?.name ?? "Тесты без папки"}</h1>
            <div className="flex gap-2">
              {current && (
                <form action={deleteFolder.bind(null, current.id)}>
                  <Button type="submit" variant="outline"><Trash2 /> Удалить папку</Button>
                </form>
              )}
              <form action={createTest.bind(null, current?.id ?? null)}>
                <Button type="submit"><Plus /> Новый тест</Button>
              </form>
            </div>
          </div>

          {tests.length === 0 ? (
            <Empty className="border border-dashed">
              <EmptyHeader>
                <EmptyTitle>Здесь пока пусто</EmptyTitle>
                <EmptyDescription>Создайте первый тест — он появится в этой папке.</EmptyDescription>
              </EmptyHeader>
            </Empty>
          ) : (
            <div className="grid gap-3">
              {tests.map((t) => (
                <Card key={t.id} className="py-4">
                  <CardHeader className="flex-row items-center justify-between gap-2">
                    <Link href={`/tests/${t.id}`} className="min-w-0 flex-1">
                      <CardTitle className="truncate">{t.title}</CardTitle>
                      <CardDescription className="mt-1 flex items-center gap-2">
                        <Badge variant={t.published ? "default" : "secondary"}>{t.published ? "Опубликован" : "Черновик"}</Badge>
                        <span>Ответов: {t.responses}</span>
                      </CardDescription>
                    </Link>
                    <TestMenu id={t.id} folders={folders} />
                  </CardHeader>
                </Card>
              ))}
            </div>
          )}
        </main>
      </div>
    </>
  )
}
