import { notFound } from "next/navigation"
import { Runner } from "@/components/runner"
import { getPublicTest } from "@/lib/data"

export const dynamic = "force-dynamic"

export default async function Page({ params }: { params: Promise<{ shareId: string }> }) {
  const { shareId } = await params
  const test = await getPublicTest(shareId)
  if (!test) notFound()
  return <Runner shareId={shareId} title={test.title} description={test.description} blocks={test.blocks} />
}
