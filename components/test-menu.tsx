"use client"

import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { deleteTest, moveTest } from "@/lib/actions"

export function TestMenu({ id, folders }: { id: string; folders: { id: string; name: string }[] }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Действия"><MoreHorizontal /></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Переместить в…</DropdownMenuLabel>
        <DropdownMenuItem onSelect={() => moveTest(id, null)}>Без папки</DropdownMenuItem>
        {folders.map((f) => (
          <DropdownMenuItem key={f.id} onSelect={() => moveTest(id, f.id)}>{f.name}</DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-destructive focus:text-destructive"
          onSelect={() => confirm("Удалить тест вместе с результатами?") && deleteTest(id)}
        >
          Удалить
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
