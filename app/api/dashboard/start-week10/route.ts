import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { cookies } from 'next/headers'

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const cookieStore = await cookies()
    const authCookie = cookieStore.get('dashboard_auth')
    
    if (!process.env.DASHBOARD_PASSWORD) {
      return NextResponse.json({ error: 'Dashboard not configured' }, { status: 500 })
    }

    if (!authCookie || authCookie.value !== process.env.DASHBOARD_PASSWORD) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Set the start time for Week 10 tracking (current timestamp)
    const startTime = new Date().toISOString()

    const { data, error } = await supabase
      .from('settings')
      .upsert({
        key: 'week10_start_time',
        value: startTime,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'key'
      })
      .select()

    if (error) {
      console.error('Error setting Week 10 start time:', error)
      return NextResponse.json({ error: 'Failed to set start time' }, { status: 500 })
    }

    // Set tweet count to 0 initially
    await supabase
      .from('settings')
      .upsert({
        key: 'week10_tweet_count',
        value: '0',
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'key'
      })

    return NextResponse.json({ 
      success: true, 
      startTime,
      message: 'Week 10 tracking started'
    })
  } catch (error) {
    console.error('Exception setting Week 10 start time:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
