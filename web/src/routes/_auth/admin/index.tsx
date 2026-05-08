import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/admin/')({
  component: AdminDashboard,
})

function AdminDashboard() {
  return <p className="text-muted-foreground text-sm">Admin dashboard — coming soon.</p>
}
