import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { AdminNav } from '@/components/admin/nav'
import { createClient } from '@/lib/supabase/server'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()
  const authToken = cookieStore.get('sb-access-token')
  
  // If no token and not on login page, redirect to login
  if (!authToken) {
    redirect('/admin-login')
  }

  // Check if user is admin
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user?.user_metadata?.is_admin) {
    redirect('/admin-login')
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminNav />
      <main className="pt-16 lg:pl-56">
        {children}
      </main>
    </div>
  )
}
