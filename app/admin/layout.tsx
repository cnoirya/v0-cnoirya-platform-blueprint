'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { AdminNav } from '@/components/admin/nav'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Skip auth check for login page
    if (pathname === '/admin/login') {
      setIsLoading(false)
      setIsAuthenticated(true)
      return
    }

    // Check if admin is authenticated
    const authFlag = localStorage.getItem('cnoirya_admin_auth')
    const authTime = localStorage.getItem('cnoirya_admin_auth_time')
    
    // Session expires after 24 hours
    const isValid = authFlag === 'true' && authTime && 
      (Date.now() - parseInt(authTime)) < 24 * 60 * 60 * 1000

    if (!isValid) {
      localStorage.removeItem('cnoirya_admin_auth')
      localStorage.removeItem('cnoirya_admin_auth_time')
      router.push('/admin/login')
    } else {
      setIsAuthenticated(true)
    }
    
    setIsLoading(false)
  }, [pathname, router])

  // Show nothing while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-xs text-muted-foreground">Loading...</p>
      </div>
    )
  }

  // Login page doesn't need the admin nav
  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  // Not authenticated
  if (!isAuthenticated) {
    return null
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
