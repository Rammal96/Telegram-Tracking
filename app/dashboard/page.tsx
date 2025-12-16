import { supabase } from '@/lib/supabase'
import DashboardClient from './DashboardClient'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

export const revalidate = 0

interface Click {
  id: string
  region: string
  timestamp: string
  ip: string
  user_agent: string
  referer: string
}

async function getTrackingStartTime(): Promise<string | null> {
  try {
    // Get Week 2 start time (Week 1 shows everything before Week 2)
    const { data, error } = await supabase
      .from('settings')
      .select('value')
      .eq('key', 'week2_start_time')
      .single()

    if (error || !data) {
      return null
    }

    return data.value
  } catch (error) {
    return null
  }
}

async function getClicks() {
  try {
    const startTime = await getTrackingStartTime()
    
    let query = supabase
      .from('clicks')
      .select('*')
      .order('timestamp', { ascending: false })

    // If Week 2 has started, only show clicks before that time
    if (startTime) {
      query = query.lt('timestamp', startTime)
    }

    const { data, error } = await query

    if (error) {
      console.error('Error fetching clicks:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Error in getClicks:', error)
    return []
  }
}

export default async function Dashboard() {
  // Check authentication
  const cookieStore = await cookies()
  const authCookie = cookieStore.get('dashboard_auth')
  
  if (!process.env.DASHBOARD_PASSWORD) {
    return <div className="min-h-screen bg-black flex items-center justify-center text-yellow-400">Dashboard password not configured. Please set DASHBOARD_PASSWORD in Vercel.</div>
  }

  if (!authCookie || authCookie.value !== process.env.DASHBOARD_PASSWORD) {
    redirect('/dashboard/login')
  }

  const clicks = await getClicks()

  const totalClicks = clicks.length

  const regionCounts: Record<string, number> = {}
  clicks.forEach((click: Click) => {
    regionCounts[click.region] = (regionCounts[click.region] || 0) + 1
  })

  const regionData = Object.entries(regionCounts).map(([region, count]) => ({
    region,
    clicks: count
  })).sort((a, b) => b.clicks - a.clicks)

  const timeData: Record<string, number> = {}
  clicks.forEach((click: Click) => {
    const date = new Date(click.timestamp).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })
    timeData[date] = (timeData[date] || 0) + 1
  })

  const timeChartData = Object.entries(timeData)
    .map(([date, count]) => ({ date, clicks: count }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  const startTime = await getTrackingStartTime()

  return (
    <DashboardClient 
      clicks={clicks} 
      regionData={regionData} 
      timeChartData={timeChartData} 
      totalClicks={totalClicks} 
      regionCounts={regionCounts}
      title="Week 1 Dashboard"
      startTime={startTime ? null : undefined}
    />
  )
}

