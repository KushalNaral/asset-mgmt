import { createFileRoute, Outlet } from '@tanstack/react-router'
import {
  BarChart3,
  Building2,
  ChevronRight,
  FileText,
  LayoutDashboard,
  Settings,
  Shield,
  TrendingUp,
  Users,
  Wallet,
} from 'lucide-react'

export const Route = createFileRoute('/_auth/admin')({
  beforeLoad: async () => {
    // TODO: check role === 'admin'
    // const user = await getSession()
    // if (user.role !== 'admin') throw redirect({ to: '/' })
  },
  component: AdminLayout,
})

const nav = [
  { icon: LayoutDashboard, label: 'Dashboard', section: null },
  { icon: Building2, label: 'Assets', section: null },
  { icon: Wallet, label: 'Portfolio', section: null },
  { icon: TrendingUp, label: 'Reports', section: null },
  { icon: FileText, label: 'Documents', section: null },
  { icon: Users, label: 'Users', section: 'Admin' },
  { icon: Shield, label: 'Audit Log', section: 'Admin' },
  { icon: Settings, label: 'Settings', section: 'Admin' },
]

function AdminSidebar() {
  const sections = [
    { title: null, items: nav.filter((n) => !n.section) },
    { title: 'Admin', items: nav.filter((n) => n.section === 'Admin') },
  ]

  return (
    <aside className="w-56 shrink-0 border-r border-sidebar-border bg-sidebar flex flex-col h-screen sticky top-0">
      <div className="px-4 h-14 border-b border-sidebar-border flex items-center gap-2.5">
        <div className="w-6 h-6 rounded bg-sidebar-primary flex items-center justify-center">
          <BarChart3 size={13} className="text-sidebar-primary-foreground" />
        </div>
        <span className="text-sm font-semibold text-sidebar-foreground tracking-tight">
          AssetMgmt
        </span>
      </div>

      <nav className="flex-1 px-2 py-3 space-y-4 overflow-y-auto">
        {sections.map(({ title, items }) => (
          <div key={title ?? 'main'}>
            {title && (
              <p className="px-3 mb-1 text-[10px] font-semibold uppercase tracking-widest text-sidebar-foreground/40">
                {title}
              </p>
            )}
            <div className="space-y-0.5">
              {items.map(({ icon: Icon, label }) => (
                <button
                  key={label}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-colors cursor-pointer text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent/60"
                >
                  <Icon size={15} strokeWidth={1.75} />
                  {label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </nav>

      <div className="px-4 py-4 border-t border-sidebar-border">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-sidebar-primary flex items-center justify-center text-xs font-semibold text-sidebar-primary-foreground">
            KN
          </div>
          <div className="min-w-0">
            <p className="text-xs font-medium text-sidebar-foreground leading-none">Kushal</p>
            <p className="text-xs text-sidebar-foreground/50 mt-0.5">Admin</p>
          </div>
        </div>
      </div>
    </aside>
  )
}

function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 border-b border-border flex items-center gap-1.5 px-6 shrink-0 bg-background">
          <ChevronRight size={13} className="text-muted-foreground/40" />
          <span className="text-sm font-medium text-foreground">Admin</span>
        </header>
        <main className="flex-1 px-6 py-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
