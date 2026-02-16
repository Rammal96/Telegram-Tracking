import { supabase } from '@/lib/supabase'
import DashboardClient from '../DashboardClient'
import StartWeek11Button from './start-button'
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
    const { data, error } = await supabase
      .from('settings')
      .select('value')
      .eq('key', 'week11_start_time')
      .single()

    if (error || !data) {
      return null
    }

    return data.value
  } catch (error) {
    return null
  }
}

async function getWeek12StartTime(): Promise<string | null> {
  try {
    const { data, error } = await supabase
      .from('settings')
      .select('value')
      .eq('key', 'week12_start_time')
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
    const week12StartTime = await getWeek12StartTime()
    
    // Fetch all clicks using pagination to bypass Supabase's default 1000 limit
    let allClicks: any[] = []
    let from = 0
    const pageSize = 1000
    let hasMore = true

    while (hasMore) {
      let query = supabase
        .from('clicks')
        .select('*', { count: 'exact' })
        .order('timestamp', { ascending: false })
        .range(from, from + pageSize - 1)

      // Filter clicks from Week 11 start time until Week 12 starts
      if (startTime) {
        query = query.gte('timestamp', startTime)
      }

      // Exclude Week 12 clicks if Week 12 has started
      if (week12StartTime) {
        query = query.lt('timestamp', week12StartTime)
      }

      const { data, error } = await query

      if (error) {
        console.error('Error fetching clicks:', error)
        break
      }

      if (data && data.length > 0) {
        allClicks = [...allClicks, ...data]
        from += pageSize
        hasMore = data.length === pageSize // Continue if we got a full page
      } else {
        hasMore = false
      }
    }

    return allClicks
  } catch (error) {
    console.error('Error in getClicks:', error)
    return []
  }
}

async function getTweetCount(): Promise<number> {
  try {
    const { data, error } = await supabase
      .from('settings')
      .select('value')
      .eq('key', 'week11_tweet_count')
      .single()

    if (error || !data) {
      return 0 // Default to 0 if not set
    }

    return parseInt(data.value) || 0
  } catch (error) {
    return 0
  }
}

export default async function Week11Dashboard() {
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
  const startTime = await getTrackingStartTime()
  const tweetCount = await getTweetCount()

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

  return (
    <div>
      {!startTime && (
        <div className="mb-6 bg-yellow-900/50 border border-yellow-400/30 p-4 rounded-lg">
          <p className="text-yellow-400 mb-3">Week 11 tracking has not started yet.</p>
          <StartWeek11Button />
        </div>
      )}
      <DashboardClient 
        clicks={clicks} 
        regionData={regionData} 
        timeChartData={timeChartData} 
        totalClicks={totalClicks} 
        regionCounts={regionCounts}
        title="Week 11 Dashboard"
        startTime={startTime}
        tweetCount={tweetCount}
      />
    </div>
  )
}
