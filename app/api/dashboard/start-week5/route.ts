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

    // Set the start time for Week 5 tracking to today (January 6, 2025) 00:00:00 UTC
    // Get today's date and set to midnight UTC
    const today = new Date()
    today.setUTCHours(0, 0, 0, 0)
    const startTime = today.toISOString()

    const { data, error } = await supabase
      .from('settings')
      .upsert({
        key: 'week5_start_time',
        value: startTime,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'key'
      })
      .select()

    if (error) {
      console.error('Error setting Week 5 start time:', error)
      return NextResponse.json({ error: 'Failed to set start time' }, { status: 500 })
    }

    // Set tweet count to 0 initially
    await supabase
      .from('settings')
      .upsert({
        key: 'week5_tweet_count',
        value: '0',
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'key'
      })

    return NextResponse.json({ 
      success: true, 
      startTime,
      message: 'Week 5 tracking started from January 6, 2025'
    })
  } catch (error) {
    console.error('Exception setting Week 5 start time:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

