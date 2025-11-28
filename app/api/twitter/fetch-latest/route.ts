import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    // Check for Twitter API credentials
    const twitterBearerToken = process.env.TWITTER_BEARER_TOKEN

    if (!twitterBearerToken) {
      return NextResponse.json({ 
        error: 'Twitter API not configured. Please set TWITTER_BEARER_TOKEN in Vercel environment variables.',
        instructions: 'Get your Bearer Token from https://developer.twitter.com/en/portal/dashboard'
      }, { status: 400 })
    }

    // First, get user ID for MaestroBots
    const userResponse = await fetch(
      'https://api.twitter.com/2/users/by/username/MaestroBots',
      {
        headers: {
          'Authorization': `Bearer ${twitterBearerToken}`,
        },
      }
    )

    if (!userResponse.ok) {
      const error = await userResponse.text()
      console.error('Twitter API user error:', error)
      return NextResponse.json({ 
        error: 'Failed to fetch user from Twitter API',
        details: error
      }, { status: userResponse.status })
    }

    const userData = await userResponse.json()
    const userId = userData.data?.id

    if (!userId) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Fetch latest tweet from MaestroBots
    const response = await fetch(
      `https://api.twitter.com/2/users/${userId}/tweets?max_results=1&tweet.fields=created_at`,
      {
        headers: {
          'Authorization': `Bearer ${twitterBearerToken}`,
        },
      }
    )

    if (!response.ok) {
      const error = await response.text()
      console.error('Twitter API error:', error)
      return NextResponse.json({ 
        error: 'Failed to fetch from Twitter API',
        details: error
      }, { status: response.status })
    }

    const data = await response.json()
    
    if (!data.data || data.data.length === 0) {
      return NextResponse.json({ error: 'No tweets found' }, { status: 404 })
    }

    const latestTweet = data.data[0]
    const tweetUrl = `https://x.com/MaestroBots/status/${latestTweet.id}`

    // Update in Supabase
    const { data: updated, error: updateError } = await supabase
      .from('settings')
      .upsert({
        key: 'twitter_url',
        value: tweetUrl,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'key'
      })
      .select()

    if (updateError) {
      console.error('Error updating Twitter URL:', updateError)
      return NextResponse.json({ error: 'Failed to update URL in database' }, { status: 500 })
    }

    return NextResponse.json({ 
      success: true, 
      tweetUrl,
      tweetId: latestTweet.id,
      text: latestTweet.text
    })
  } catch (error) {
    console.error('Exception fetching latest tweet:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

