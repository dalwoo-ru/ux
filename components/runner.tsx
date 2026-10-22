"use client"

import { useEffect, useRef, useState } from "react"
import { CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { cn } from "@/lib/utils"
import { submitResponse } from "@/lib/actions"
import type { Block } from "@/lib/blocks"

type V = unknown

function toggle(arr: string[] | undefined, v: string, on: boolean) {
  const a = arr ?? []
  return on ? [...a, v] : a.filter((x) => x !== v)
}

function FiveSecond({ block, value, onChange }: { block: Extract<Block, { type: "fivesecond" }>; value: V; onChange: (v: V) => void }) {
  const [left, setLeft] = useState<number | null>(null)
  const [phase, setPhase] = useState<"ready" | "show" | "ask">(value ? "ask" : "ready")
  useEffect(() => {
    if (phase !== "show") return
    setLeft(block.seconds)
    const t = setInterval(() => setLeft((l) => (l ?? 1) - 1), 1000)
    return () => clearInterval(t)
  }, [phase, block.seconds])
  useEffect(() => { if (phase === "show" && left !== null && left <= 0) setPhase("ask") }, [left, phase])

  if (phase === "ready")
    return (
      <div className="flex flex-col items-start gap-3">
        <p className="text-sm text-muted-foreground">Изображение будет показано {block.seconds} с. Приготовьтесь.</p>
        <Button onClick={() => setPhase("show")}>Показать</Button>
      </div>
    )
  if (phase === "show")
    return (
      <div className="flex flex-col gap-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={block.imageUrl} alt="" className="max-h-96 w-full rounded-md object-contain" />
        <p className="text-sm text-muted-foreground">Осталось: {Math.max(left ?? 0, 0)} с</p>
      </div>
    )
  return (
    <div className="flex flex-col gap-2">
      <Label>{block.question}</Label>
      <Textarea rows={4} value={(value as string) ?? ""} onChange={(e) => onChange(e.target.value)} />
    </div>
  )
}

function Body({ block, value, onChange }: { block: Block; value: V; onChange: (v: V) => void }) {
  switch (block.type) {
    case "context":
      return <p className="whitespace-pre-wrap">{block.text}</p>
    case "question":
      return <Textarea rows={5} value={(value as string) ?? ""} onChange={(e) => onChange(e.target.value)} />
    case "choice":
      return block.multiple ? (
        <div className="flex flex-col gap-3">
          {block.options.map((o) => (
            <Label key={o} className="font-normal">
              <Checkbox checked={((value as string[]) ?? []).includes(o)} onCheckedChange={(c) => onChange(toggle(value as string[], o, !!c))} />
              {o}
            </Label>
          ))}
        </div>
      ) : (
        <RadioGroup value={(value as string) ?? ""} onValueChange={onChange}>
          {block.options.map((o) => (
            <Label key={o} className="font-normal">
              <RadioGroupItem value={o} /> {o}
            </Label>
          ))}
        </RadioGroup>
      )
    case "scale": {
      const nums = Array.from({ length: block.max - block.min + 1 }, (_, i) => block.min + i)
      return (
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap gap-2">
            {nums.map((n) => (
              <Button key={n} type="button" size="icon" variant={value === n ? "default" : "outline"} onClick={() => onChange(n)}>{n}</Button>
            ))}
          </div>
          <div className="flex justify-between text-xs text-muted-foreground"><span>{block.minLabel}</span><span>{block.maxLabel}</span></div>
        </div>
      )
    }
    case "matrix": {
      const val = (value as Record<string, string | string[]>) ?? {}
      return (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr><th />{block.cols.map((c) => <th key={c} className="px-2 py-2 text-center font-medium">{c}</th>)}</tr>
            </thead>
            <tbody>
              {block.rows.map((r) => (
                <tr key={r} className="border-t">
                  <td className="py-3 pr-3">{r}</td>
                  {block.cols.map((c) => (
                    <td key={c} className="px-2 text-center">
                      {block.multiple ? (
                        <Checkbox aria-label={`${r}: ${c}`} checked={[val[r] ?? []].flat().includes(c)} onCheckedChange={(on) => onChange({ ...val, [r]: toggle([val[r] ?? []].flat(), c, !!on) })} />
                      ) : (
                        <input type="radio" className="size-4 accent-primary" name={`${block.id}-${r}`} aria-label={`${r}: ${c}`} checked={val[r] === c} onChange={() => onChange({ ...val, [r]: c })} />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    }
    case "preference":
      return (
        <div className="grid gap-3 sm:grid-cols-2">
          {block.images.map((u, i) => (
            <button key={i} type="button" onClick={() => onChange(i)} className={cn("overflow-hidden rounded-lg border-2 p-1 transition", value === i ? "border-primary" : "border-transparent hover:border-border")}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={u} alt={`Вариант ${i + 1}`} className="aspect-video w-full rounded-md object-cover" />
            </button>
          ))}
        </div>
      )
    case "cardsort": {
      const val = (value as Record<string, string>) ?? {}
      return (
        <div className="flex flex-col gap-3">
          {block.cards.map((c) => (
            <div key={c} className="grid items-center gap-2 sm:grid-cols-2">
              <span className="rounded-md border px-3 py-2 text-sm">{c}</span>
              <Select value={val[c] ?? ""} onValueChange={(v) => onChange({ ...val, [c]: v })}>
                <SelectTrigger className="w-full"><SelectValue placeholder="Выберите категорию" /></SelectTrigger>
                <SelectContent>{block.categories.map((cat) => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}</SelectContent>
              </Select>
            </div>
          ))}
        </div>
      )
    }
    case "fivesecond":
      return <FiveSecond block={block} value={value} onChange={onChange} />
  }
}

const empty = (b: Block, v: V) =>
  b.type === "context" ? false : v === undefined || v === "" || (Array.isArray(v) && !v.length) ||
  (typeof v === "object" && !Array.isArray(v) && v !== null &&
    Object.keys(v).length < (b.type === "matrix" ? b.rows.length : b.type === "cardsort" ? b.cards.length : 1))

export function Runner({ shareId, title, description, blocks }: { shareId: string; title: string; description: string; blocks: Block[] }) {
  const [step, setStep] = useState(-1)
  const [values, setValues] = useState<Record<string, V>>({})
  const [error, setError] = useState("")
  const [done, setDone] = useState(false)
  const [busy, setBusy] = useState(false)
  const startedAt = useRef(0)

  if (done)
    return (
      <Shell>
        <Card>
          <CardContent className="flex flex-col items-center gap-3 py-12 text-center">
            <CheckCircle2 className="size-12 text-primary" />
            <h1 className="text-xl font-semibold">Спасибо за участие!</h1>
            <p className="text-muted-foreground">Ваши ответы сохранены.</p>
          </CardContent>
        </Card>
      </Shell>
    )

  if (step === -1)
    return (
      <Shell>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{title}</CardTitle>
            {description && <CardDescription className="whitespace-pre-wrap">{description}</CardDescription>}
          </CardHeader>
          <CardFooter>
            <Button disabled={!blocks.length} onClick={() => { startedAt.current = Date.now(); setStep(0) }}>Начать</Button>
          </CardFooter>
        </Card>
      </Shell>
    )

  const block = blocks[step]
  const last = step === blocks.length - 1
  const next = async () => {
    if (block.required && empty(block, values[block.id])) return setError("Ответьте на этот вопрос, чтобы продолжить")
    setError("")
    if (!last) return setStep(step + 1)
    setBusy(true)
    const r = await submitResponse(shareId, values, Date.now() - startedAt.current)
    setBusy(false)
    r.ok ? setDone(true) : setError(r.error ?? "Не удалось сохранить ответы")
  }

  return (
    <Shell>
      <Progress value={((step + 1) / blocks.length) * 100} />
      <Card>
        <CardHeader>
          <CardTitle>{block.title}{block.required && <span className="text-destructive"> *</span>}</CardTitle>
          {block.type === "question" && block.description && <CardDescription>{block.description}</CardDescription>}
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Body block={block} value={values[block.id]} onChange={(v) => setValues((s) => ({ ...s, [block.id]: v }))} />
          {error && <Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>}
        </CardContent>
        <CardFooter className="justify-between">
          <Button variant="ghost" disabled={step === 0} onClick={() => { setError(""); setStep(step - 1) }}>Назад</Button>
          <Button onClick={next} disabled={busy}>{last ? "Завершить" : "Далее"}</Button>
        </CardFooter>
      </Card>
    </Shell>
  )
}

function Shell({ children }: { children: React.ReactNode }) {
  return <main className="mx-auto flex min-h-svh max-w-xl flex-col justify-center gap-4 p-4">{children}</main>
}
