"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { CATALOG, LABELS, newBlock, type Block, type BlockType } from "@/lib/blocks"
import { saveTest } from "@/lib/actions"

type Patch = (p: Partial<Block>) => void

function Lines({ label, value, onChange, placeholder }: { label: string; value: string[]; onChange: (v: string[]) => void; placeholder?: string }) {
  return (
    <div className="flex flex-col gap-2">
      <Label>{label} <span className="font-normal text-muted-foreground">(по одному в строке)</span></Label>
      <Textarea rows={Math.max(3, value.length)} value={value.join("\n")} placeholder={placeholder} onChange={(e) => onChange(e.target.value.split("\n"))} />
    </div>
  )
}

function Row({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  const id = useRef(crypto.randomUUID()).current
  return (
    <div className="flex items-center gap-2">
      <Switch id={id} checked={checked} onCheckedChange={onChange} />
      <Label htmlFor={id}>{label}</Label>
    </div>
  )
}

function Fields({ block, patch }: { block: Block; patch: Patch }) {
  const p = patch as (p: Record<string, unknown>) => void
  switch (block.type) {
    case "context":
      return (
        <div className="flex flex-col gap-2">
          <Label>Текст</Label>
          <Textarea rows={4} value={block.text} onChange={(e) => p({ text: e.target.value })} />
        </div>
      )
    case "question":
      return (
        <div className="flex flex-col gap-2">
          <Label>Пояснение</Label>
          <Textarea rows={2} value={block.description} onChange={(e) => p({ description: e.target.value })} />
        </div>
      )
    case "choice":
      return (
        <>
          <Lines label="Варианты" value={block.options} onChange={(options) => p({ options })} />
          <Row label="Можно выбрать несколько" checked={block.multiple} onChange={(multiple) => p({ multiple })} />
        </>
      )
    case "scale":
      return (
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-2">
            <Label>От</Label>
            <Input type="number" min={0} max={block.max - 1} value={block.min} onChange={(e) => p({ min: Number(e.target.value) })} />
          </div>
          <div className="flex flex-col gap-2">
            <Label>До</Label>
            <Input type="number" min={block.min + 1} max={11} value={block.max} onChange={(e) => p({ max: Math.min(11, Number(e.target.value)) })} />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Подпись слева</Label>
            <Input value={block.minLabel} onChange={(e) => p({ minLabel: e.target.value })} />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Подпись справа</Label>
            <Input value={block.maxLabel} onChange={(e) => p({ maxLabel: e.target.value })} />
          </div>
        </div>
      )
    case "matrix":
      return (
        <>
          <div className="grid gap-3 sm:grid-cols-2">
            <Lines label="Строки" value={block.rows} onChange={(rows) => p({ rows })} />
            <Lines label="Столбцы" value={block.cols} onChange={(cols) => p({ cols })} />
          </div>
          <Row label="Несколько ответов в строке" checked={block.multiple} onChange={(multiple) => p({ multiple })} />
        </>
      )
    case "preference":
      return <Lines label="Ссылки на изображения" value={block.images} onChange={(images) => p({ images })} placeholder="https://…" />
    case "cardsort":
      return (
        <div className="grid gap-3 sm:grid-cols-2">
          <Lines label="Карточки" value={block.cards} onChange={(cards) => p({ cards })} />
          <Lines label="Категории" value={block.categories} onChange={(categories) => p({ categories })} />
        </div>
      )
    case "fivesecond":
      return (
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <Label>Ссылка на изображение</Label>
            <Input value={block.imageUrl} placeholder="https://…" onChange={(e) => p({ imageUrl: e.target.value })} />
          </div>
          <div className="grid grid-cols-[120px_1fr] gap-3">
            <div className="flex flex-col gap-2">
              <Label>Секунд</Label>
              <Input type="number" min={1} max={60} value={block.seconds} onChange={(e) => p({ seconds: Math.min(60, Math.max(1, Number(e.target.value))) })} />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Вопрос после показа</Label>
              <Input value={block.question} onChange={(e) => p({ question: e.target.value })} />
            </div>
          </div>
        </div>
      )
  }
}

export function Builder({ id, initial }: { id: string; initial: { title: string; description: string; blocks: Block[] } }) {
  const [title, setTitle] = useState(initial.title)
  const [description, setDescription] = useState(initial.description)
  const [blocks, setBlocks] = useState<Block[]>(initial.blocks)
  const [status, setStatus] = useState<"saved" | "dirty" | "saving">("saved")
  const first = useRef(true)

  useEffect(() => {
    if (first.current) { first.current = false; return }
    setStatus("dirty")
    const t = setTimeout(async () => {
      setStatus("saving")
      const clean = blocks.map((b) => {
        const strip = (a: string[]) => a.map((s) => s.trim()).filter(Boolean)
        switch (b.type) {
          case "choice": return { ...b, options: strip(b.options) }
          case "matrix": return { ...b, rows: strip(b.rows), cols: strip(b.cols) }
          case "preference": return { ...b, images: strip(b.images) }
          case "cardsort": return { ...b, cards: strip(b.cards), categories: strip(b.categories) }
          default: return b
        }
      })
      await saveTest(id, { title, description, blocks: clean })
      setStatus("saved")
    }, 800)
    return () => clearTimeout(t)
  }, [title, description, blocks, id])

  const update = (i: number, p: Partial<Block>) =>
    setBlocks((bs) => bs.map((b, j) => (j === i ? ({ ...b, ...p } as Block) : b)))
  const move = (i: number, d: number) =>
    setBlocks((bs) => {
      const n = [...bs]
      ;[n[i], n[i + d]] = [n[i + d], n[i]]
      return n
    })

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3">
        <Input className="h-12 text-xl font-semibold" value={title} onChange={(e) => setTitle(e.target.value)} aria-label="Название теста" />
        <Textarea rows={2} placeholder="Описание для респондента (необязательно)" value={description} onChange={(e) => setDescription(e.target.value)} />
        <p className="text-xs text-muted-foreground">
          {status === "saved" ? "Сохранено" : status === "saving" ? "Сохранение…" : "Есть несохранённые изменения"}
        </p>
      </div>

      {blocks.map((b, i) => (
        <Card key={b.id}>
          <CardHeader className="flex-row items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Badge variant="secondary">{i + 1}</Badge>
              <Badge variant="outline">{LABELS[b.type]}</Badge>
            </div>
            <div className="flex">
              <Button size="icon" variant="ghost" disabled={i === 0} onClick={() => move(i, -1)} aria-label="Выше"><ArrowUp /></Button>
              <Button size="icon" variant="ghost" disabled={i === blocks.length - 1} onClick={() => move(i, 1)} aria-label="Ниже"><ArrowDown /></Button>
              <Button size="icon" variant="ghost" onClick={() => setBlocks((bs) => bs.filter((_, j) => j !== i))} aria-label="Удалить"><Trash2 /></Button>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label>Заголовок</Label>
              <Input value={b.title} onChange={(e) => update(i, { title: e.target.value })} />
            </div>
            <Fields block={b} patch={(p) => update(i, p)} />
            {b.type !== "context" && <Row label="Обязательный" checked={b.required} onChange={(required) => update(i, { required })} />}
          </CardContent>
        </Card>
      ))}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="self-start"><Plus /> Добавить блок</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-72">
          {CATALOG.map((c) => (
            <DropdownMenuItem key={c.type} onSelect={() => setBlocks((bs) => [...bs, newBlock(c.type as BlockType)])} className="flex-col items-start gap-0">
              <span className="font-medium">{c.label}</span>
              <span className="text-xs text-muted-foreground">{c.hint}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
