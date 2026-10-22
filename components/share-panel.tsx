"use client"

import { useState, useTransition } from "react"
import { Check, Copy } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { setPublished } from "@/lib/actions"

export function SharePanel({ id, shareId, published }: { id: string; shareId: string; published: boolean }) {
  const [on, setOn] = useState(published)
  const [copied, setCopied] = useState(false)
  const [, start] = useTransition()
  const url = typeof window === "undefined" ? `/t/${shareId}` : `${location.origin}/t/${shareId}`

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex items-center gap-2">
        <Switch id="pub" checked={on} onCheckedChange={(v) => { setOn(v); start(() => setPublished(id, v)) }} />
        <Label htmlFor="pub">Опубликован</Label>
      </div>
      {on && (
        <div className="flex min-w-0 flex-1 gap-2">
          <Input readOnly value={url} onFocus={(e) => e.currentTarget.select()} className="min-w-48" />
          <Button
            variant="outline"
            onClick={async () => {
              await navigator.clipboard.writeText(url)
              setCopied(true)
              toast.success("Ссылка скопирована")
              setTimeout(() => setCopied(false), 1500)
            }}
          >
            {copied ? <Check /> : <Copy />} Копировать
          </Button>
        </div>
      )}
    </div>
  )
}
