import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty"
import { deleteResponse } from "@/lib/actions"
import type { Answer, Block } from "@/lib/blocks"
import type { ResponseRow } from "@/lib/data"

const fmt = (a: Answer | undefined): string => {
  if (a === undefined) return "—"
  if (Array.isArray(a)) return a.join(", ")
  if (typeof a === "object") return Object.entries(a).map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join("/") : v}`).join("; ")
  return String(a)
}

function Bars({ items, total }: { items: [string, number][]; total: number }) {
  return (
    <div className="flex flex-col gap-2">
      {items.map(([label, n]) => (
        <div key={label} className="grid grid-cols-[1fr_auto] items-center gap-x-3 gap-y-1 text-sm">
          <span className="truncate">{label}</span>
          <span className="text-muted-foreground">{n} · {total ? Math.round((n / total) * 100) : 0}%</span>
          <Progress className="col-span-2" value={total ? (n / total) * 100 : 0} />
        </div>
      ))}
    </div>
  )
}

function Summary({ block, rs }: { block: Block; rs: ResponseRow[] }) {
  const ans = rs.map((r) => r.answers[block.id]).filter((a): a is Answer => a !== undefined)
  if (!ans.length) return <p className="text-sm text-muted-foreground">Нет ответов</p>
  const count = (keys: string[], list: string[]): [string, number][] =>
    keys.map((k) => [k, list.filter((x) => x === k).length])

  switch (block.type) {
    case "choice":
      return <Bars total={ans.length} items={count(block.options, ans.flat() as string[])} />
    case "scale": {
      const nums = ans as number[]
      const avg = nums.reduce((a, b) => a + b, 0) / nums.length
      const keys = Array.from({ length: block.max - block.min + 1 }, (_, i) => String(block.min + i))
      return (
        <div className="flex flex-col gap-3">
          <p className="text-sm">Среднее: <b>{avg.toFixed(2)}</b></p>
          <Bars total={nums.length} items={count(keys, nums.map(String))} />
        </div>
      )
    }
    case "preference":
      return <Bars total={ans.length} items={block.images.map((u, i) => [`Вариант ${i + 1} (${u})`, (ans as number[]).filter((a) => a === i).length])} />
    case "matrix":
      return (
        <Table>
          <TableHeader><TableRow><TableHead /> {block.cols.map((c) => <TableHead key={c}>{c}</TableHead>)}</TableRow></TableHeader>
          <TableBody>
            {block.rows.map((row) => (
              <TableRow key={row}>
                <TableCell className="font-medium">{row}</TableCell>
                {block.cols.map((c) => (
                  <TableCell key={c}>{(ans as Record<string, string | string[]>[]).filter((a) => [a[row]].flat().includes(c)).length}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )
    case "cardsort":
      return (
        <Table>
          <TableHeader><TableRow><TableHead>Карточка</TableHead>{block.categories.map((c) => <TableHead key={c}>{c}</TableHead>)}</TableRow></TableHeader>
          <TableBody>
            {block.cards.map((card) => (
              <TableRow key={card}>
                <TableCell className="font-medium">{card}</TableCell>
                {block.categories.map((c) => (
                  <TableCell key={c}>{(ans as Record<string, string>[]).filter((a) => a[card] === c).length}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )
    default:
      return (
        <ul className="flex flex-col gap-2 text-sm">
          {(ans as string[]).map((a, i) => <li key={i} className="rounded-md bg-muted px-3 py-2">{a}</li>)}
        </ul>
      )
  }
}

export function Results({ testId, blocks, responses }: { testId: string; blocks: Block[]; responses: ResponseRow[] }) {
  const qs = blocks.filter((b) => b.type !== "context")
  if (!responses.length)
    return (
      <Empty className="border border-dashed">
        <EmptyHeader>
          <EmptyTitle>Пока нет прохождений</EmptyTitle>
          <EmptyDescription>Опубликуйте тест и отправьте ссылку респондентам.</EmptyDescription>
        </EmptyHeader>
      </Empty>
    )
  const avg = responses.reduce((a, r) => a + r.duration_ms, 0) / responses.length / 1000
  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-muted-foreground">Прохождений: <b className="text-foreground">{responses.length}</b> · среднее время: <b className="text-foreground">{Math.round(avg)} с</b></p>
      {qs.map((b) => (
        <Card key={b.id}>
          <CardHeader><CardTitle className="text-base">{b.title}</CardTitle></CardHeader>
          <CardContent><Summary block={b} rs={responses} /></CardContent>
        </Card>
      ))}
      <Card>
        <CardHeader><CardTitle className="text-base">Все прохождения</CardTitle></CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Дата</TableHead><TableHead>Время</TableHead>
                {qs.map((b) => <TableHead key={b.id}>{b.title}</TableHead>)}
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {responses.map((r) => (
                <TableRow key={r.id}>
                  <TableCell className="whitespace-nowrap">{new Date(r.created_at).toLocaleString("ru-RU")}</TableCell>
                  <TableCell>{Math.round(r.duration_ms / 1000)} с</TableCell>
                  {qs.map((b) => <TableCell key={b.id} className="max-w-64 truncate">{fmt(r.answers[b.id])}</TableCell>)}
                  <TableCell>
                    <form action={deleteResponse.bind(null, testId, r.id)}>
                      <Button type="submit" size="icon" variant="ghost" aria-label="Удалить"><Trash2 /></Button>
                    </form>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
