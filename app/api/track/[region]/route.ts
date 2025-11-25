import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { TWITTER_REDIRECT_URL } from '@/lib/twitter'

const VALID_REGIONS = [
  'turkey',
  'russia',
  'india',
  'china',
  'vietnam',
  'indonesia',
  'germany',
  'france',
  'arabic',
  'nigeria',
  'tagalog',
  'portugal',
  'spain',
  'malay'
]

export async function GET(
  request: NextRequest,
  { params }: { params: { region: string } }
) {
  const region = params.region.toLowerCase()

  if (!VALID_REGIONS.includes(region)) {
    return NextResponse.json({ error: 'Invalid region' }, { status: 400 })
  }

  const ip = request.headers.get('x-forwarded-for') || 
             request.headers.get('x-real-ip') || 
             'unknown'
  const userAgent = request.headers.get('user-agent') || 'unknown'
  const referer = request.headers.get('referer') || 'unknown'

  try {
    const { data, error } = await supabase
      .from('clicks')
      .insert({
        region,
        ip,
        user_agent: userAgent,
        referer,
        timestamp: new Date().toISOString()
      })
      .select()
    
    if (error) {
      console.error(`Error logging click for region ${region}:`, error)
    } else {
      console.log(`Successfully logged click for region ${region}`)
    }
  } catch (error) {
    console.error(`Exception logging click for region ${region}:`, error)
  }

  return NextResponse.redirect(TWITTER_REDIRECT_URL)
}

