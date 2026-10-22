import { AuthForm } from "@/components/auth-form"
import { register } from "@/lib/actions"

export default function Page() {
  return <AuthForm mode="register" action={register} />
}
