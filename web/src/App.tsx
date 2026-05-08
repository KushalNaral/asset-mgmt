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

const stats = [
  { label: 'Total Assets', value: '247', sub: '+12 this month' },
  { label: 'Portfolio Value', value: '$4.2M', sub: '+3.2% YTD' },
  { label: 'Active Leases', value: '38', sub: '2 expiring soon' },
  { label: 'Pending Actions', value: '7', sub: '3 overdue' },
]

const assets = [
  { id: 'AST-001', name: 'Main Street Office', type: 'Real Estate', value: '$850,000', status: 'Active' },
  { id: 'AST-002', name: 'Fleet Vehicle #14', type: 'Equipment', value: '$42,000', status: 'Active' },
  { id: 'AST-003', name: 'Server Rack — DC2', type: 'IT Equipment', value: '$28,500', status: 'Maintenance' },
  { id: 'AST-004', name: 'Warehouse Unit B', type: 'Real Estate', value: '$320,000', status: 'Active' },
  { id: 'AST-005', name: 'CNC Machine #3', type: 'Machinery', value: '$95,000', status: 'Inactive' },
]

const nav = [
  { icon: LayoutDashboard, label: 'Dashboard', active: true },
  { icon: Building2, label: 'Assets' },
  { icon: Wallet, label: 'Portfolio' },
  { icon: TrendingUp, label: 'Reports' },
  { icon: FileText, label: 'Documents' },
  { icon: Settings, label: 'Settings' },
]

const statusClass: Record<string, string> = {
  Active: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  Maintenance: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
  Inactive: 'bg-muted text-muted-foreground',
}

function Sidebar() {
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

      <nav className="flex-1 px-2 py-3 space-y-0.5">
        {nav.map(({ icon: Icon, label, active }) => (
          <button
            key={label}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-colors cursor-pointer ${
              active
                ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium'
                : 'text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent/60'
            }`}
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
            <p className="text-xs font-medium text-sidebar-foreground leading-none">John Doe</p>
            <p className="text-xs text-sidebar-foreground/50 mt-0.5">Admin</p>
          </div>
        </div>
      </div>
    </aside>
  )
}

function StatCard({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="border border-border rounded-lg p-4 bg-card">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-[1.75rem] font-semibold text-foreground tracking-tight leading-none mt-2">
        {value}
      </p>
      <p className="text-xs text-muted-foreground mt-2">{sub}</p>
    </div>
  )
}

export default function App() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 border-b border-border flex items-center gap-1.5 px-6 shrink-0 bg-background">
          <span className="text-sm text-muted-foreground">Dashboard</span>
          <ChevronRight size={13} className="text-muted-foreground/40" />
          <span className="text-sm font-medium text-foreground">Overview</span>
          <div className="ml-auto">
            <button className="h-8 px-3.5 text-xs font-medium bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
              + Add Asset
            </button>
          </div>
        </header>

        <main className="flex-1 px-6 py-6 space-y-5">
          <div className="grid grid-cols-4 gap-3">
            {stats.map((s) => (
              <StatCard key={s.label} {...s} />
            ))}
          </div>

          <div className="border border-border rounded-lg overflow-hidden">
            <div className="px-4 py-3 border-b border-border flex items-center justify-between bg-card">
              <span className="text-sm font-medium text-foreground">Recent Assets</span>
              <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                View all
              </button>
            </div>

            <table className="w-full text-sm bg-card">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left px-4 py-2.5 text-xs font-medium text-muted-foreground w-28">
                    ID
                  </th>
                  <th className="text-left px-4 py-2.5 text-xs font-medium text-muted-foreground">
                    Name
                  </th>
                  <th className="text-left px-4 py-2.5 text-xs font-medium text-muted-foreground">
                    Type
                  </th>
                  <th className="text-right px-4 py-2.5 text-xs font-medium text-muted-foreground">
                    Value
                  </th>
                  <th className="text-left px-4 py-2.5 text-xs font-medium text-muted-foreground w-28">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {assets.map((a) => (
                  <tr
                    key={a.id}
                    className="hover:bg-muted/20 transition-colors cursor-pointer"
                  >
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                      {a.id}
                    </td>
                    <td className="px-4 py-3 font-medium text-foreground">{a.name}</td>
                    <td className="px-4 py-3 text-muted-foreground">{a.type}</td>
                    <td className="px-4 py-3 text-right font-mono text-sm text-foreground">
                      {a.value}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${statusClass[a.status]}`}
                      >
                        {a.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  )
}
