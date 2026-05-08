import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth')({
  beforeLoad: async () => {
    // TODO: check session token
    // const user = await getSession()
    // if (!user) throw redirect({ to: '/login' })
  },
  component: () => <Outlet />,
})
