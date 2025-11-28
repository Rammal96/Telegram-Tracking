import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json()

    if (!url || !url.includes('x.com') && !url.includes('twitter.com')) {
      return NextResponse.json({ error: 'Invalid Twitter URL' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('settings')
      .upsert({
        key: 'twitter_url',
        value: url,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'key'
      })
      .select()

    if (error) {
      console.error('Error updating Twitter URL:', error)
      return NextResponse.json({ error: 'Failed to update URL' }, { status: 500 })
    }

    return NextResponse.json({ success: true, url: data[0].value })
  } catch (error) {
    console.error('Exception updating Twitter URL:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

