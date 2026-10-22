import Link from "next/link"
import { FlaskConical, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { logout } from "@/lib/actions"
import type { User } from "@/lib/auth"

export function AppHeader({ user }: { user: User }) {
  return (
    <header className="border-b">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
          <FlaskConical className="size-5" /> UX Research
        </Link>
        <form action={logout} className="flex items-center gap-3">
          <span className="hidden text-sm text-muted-foreground sm:inline">{user.name}</span>
          <Button type="submit" variant="ghost" size="sm"><LogOut /> Выйти</Button>
        </form>
      </div>
    </header>
  )
}
