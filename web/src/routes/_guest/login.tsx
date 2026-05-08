import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_guest/login')({
  component: LoginPage,
})

function LoginPage() {
  return <p className="text-muted-foreground text-sm">Login — coming soon.</p>
}
