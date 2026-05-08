import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/_user/')({
  component: UserDashboard,
})

function UserDashboard() {
  return <p className="text-muted-foreground text-sm">User dashboard — coming soon.</p>
}
