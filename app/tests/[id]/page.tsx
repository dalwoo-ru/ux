import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { AppHeader } from "@/components/app-header"
import { Builder } from "@/components/builder"
import { Results } from "@/components/results"
import { SharePanel } from "@/components/share-panel"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { requireUser } from "@/lib/auth"
import { getOwnedTest, listResponses } from "@/lib/data"

export default async function TestPage({ params }: { params: Promise<{ id: string }> }) {
  const user = await requireUser()
  const { id } = await params
  const test = await getOwnedTest(user.id, id)
  if (!test) notFound()
  const responses = await listResponses(id)

  return (
    <>
      <AppHeader user={user} />
      <main className="mx-auto flex max-w-3xl flex-col gap-4 p-4">
        <Link href={test.folder_id ? `/dashboard?folder=${test.folder_id}` : "/dashboard"} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="size-4" /> К списку
        </Link>
        <SharePanel id={id} shareId={test.share_id} published={!!test.published} />
        <Tabs defaultValue="builder">
          <TabsList>
            <TabsTrigger value="builder">Конструктор</TabsTrigger>
            <TabsTrigger value="results">Результаты ({responses.length})</TabsTrigger>
          </TabsList>
          <TabsContent value="builder" className="pt-4">
            <Builder id={id} initial={{ title: test.title, description: test.description, blocks: test.blocks }} />
          </TabsContent>
          <TabsContent value="results" className="pt-4">
            <Results testId={id} blocks={test.blocks} responses={responses} />
          </TabsContent>
        </Tabs>
      </main>
    </>
  )
}
