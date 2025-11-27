import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Allow login page without authentication
  if (typeof window === 'undefined') {
    const cookieStore = await cookies()
    const authCookie = cookieStore.get('dashboard_auth')
    
    if (!process.env.DASHBOARD_PASSWORD) {
      return <div className="min-h-screen bg-black flex items-center justify-center text-yellow-400">Dashboard password not configured. Please set DASHBOARD_PASSWORD in Vercel.</div>
    }

    // Check if we're on the login page by checking the pathname
    // Since we can't access pathname in layout, we'll handle this differently
    // The login page will be accessible, and we'll protect only the main dashboard
  }

  return <>{children}</>
}

