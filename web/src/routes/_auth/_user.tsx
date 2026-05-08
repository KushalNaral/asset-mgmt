import { createFileRoute, Outlet } from '@tanstack/react-router'
import {
  BarChart3,
  Building2,
  ChevronRight,
  FileText,
  LayoutDashboard,
  Settings,
  TrendingUp,
  Wallet,
} from 'lucide-react'

export const Route = createFileRoute('/_auth/_user')({
  component: UserLayout,
})

const nav = [
  { icon: LayoutDashboard, label: 'Dashboard' },
  { icon: Building2, label: 'Assets' },
  { icon: Wallet, label: 'Portfolio' },
  { icon: TrendingUp, label: 'Reports' },
  { icon: FileText, label: 'Documents' },
  { icon: Settings, label: 'Settings' },
]

function UserLayout() {
  return (
    <div className="flex min-h-screen bg-background">
      <aside className="w-56 shrink-0 border-r border-sidebar-border bg-sidebar flex flex-col h-screen sticky top-0">
        <div className="px-4 h-14 border-b border-sidebar-border flex items-center gap-2.5">
          <div className="w-6 h-6 rounded bg-sidebar-primary flex items-center justify-center">
            <BarChart3 size={13} className="text-sidebar-primary-foreground" />
          </div>
          <span className="text-sm font-semibold text-sidebar-foreground tracking-tight">
            AssetMgmt
          </span>
        </div>

        <nav className="flex-1 px-2 py-3 space-y-0.5">
          {nav.map(({ icon: Icon, label }) => (
            <button
              key={label}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-colors cursor-pointer text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent/60"
            >
              <Icon size={15} strokeWidth={1.75} />
              {label}
            </button>
          ))}
        </nav>

        <div className="px-4 py-4 border-t border-sidebar-border">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-sidebar-accent flex items-center justify-center text-xs font-semibold text-sidebar-accent-foreground">
              KN
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-sidebar-foreground leading-none">Kushal</p>
              <p className="text-xs text-sidebar-foreground/50 mt-0.5">Member</p>
            </div>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 border-b border-border flex items-center gap-1.5 px-6 shrink-0 bg-background">
          <ChevronRight size={13} className="text-muted-foreground/40" />
          <span className="text-sm font-medium text-foreground">Dashboard</span>
        </header>
        <main className="flex-1 px-6 py-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
