import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { DashboardNav } from '@/components/dashboard/nav'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()
  const authToken = cookieStore.get('sb-access-token')
  
  if (!authToken) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />
      <main className="pt-16">
        {children}
      </main>
    </div>
  )
}
