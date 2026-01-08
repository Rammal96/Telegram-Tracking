import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { getTwitterUrl } from '@/lib/twitter'

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
  const rawRegion = params.region
  const region = rawRegion.toLowerCase()
  const url = request.url

  console.log(`[TRACK] URL: ${url}`)
  console.log(`[TRACK] Raw region param: ${rawRegion}`)
  console.log(`[TRACK] Normalized region: ${region}`)

  if (!VALID_REGIONS.includes(region)) {
    console.error(`[TRACK] Invalid region: ${region}`)
    return NextResponse.json({ error: 'Invalid region' }, { status: 400 })
  }

  const ip = request.headers.get('x-forwarded-for') || 
             request.headers.get('x-real-ip') || 
             'unknown'
  const userAgent = request.headers.get('user-agent') || 'unknown'
  const referer = request.headers.get('referer') || 'unknown'

  console.log(`[TRACK] About to insert click for region: ${region}`)
  console.log(`[TRACK] IP: ${ip}, Referer: ${referer}`)

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
      console.error(`[TRACK] Error logging click for region ${region}:`, error)
    } else {
      console.log(`[TRACK] Successfully logged click for region ${region}. Inserted data:`, data)
      if (data && data.length > 0) {
        console.log(`[TRACK] Confirmed region in database: ${data[0].region}`)
      }
    }
  } catch (error) {
    console.error(`[TRACK] Exception logging click for region ${region}:`, error)
  }

  const twitterUrl = await getTwitterUrl()
  console.log(`Redirecting region ${region} to Twitter URL: ${twitterUrl}`)
  
  if (!twitterUrl || !twitterUrl.startsWith('http')) {
    console.error(`Invalid Twitter URL: ${twitterUrl}`)
    return NextResponse.json({ error: 'Twitter URL not configured' }, { status: 500 })
  }
  
  // Use 307 redirect to preserve method and avoid confirmation dialogs
  return NextResponse.redirect(twitterUrl, { status: 307 })
}

