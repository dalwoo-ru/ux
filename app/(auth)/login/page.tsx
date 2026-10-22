import { AuthForm } from "@/components/auth-form"
import { login } from "@/lib/actions"

export default function Page() {
  return <AuthForm mode="login" action={login} />
}
