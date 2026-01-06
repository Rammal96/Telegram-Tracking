import { supabase } from './supabase'

export async function getTwitterUrl(): Promise<string> {
  try {
    const { data, error } = await supabase
      .from('settings')
      .select('value')
      .eq('key', 'twitter_url')
      .single()

    if (error || !data) {
      console.log('Twitter URL not found in settings, using fallback')
      // Fallback to default if not found
      return 'https://x.com/MaestroBots/status/1996671035568214460?s=20'
    }

    const url = data.value
    console.log('Twitter URL from Supabase:', url)
    
    if (!url || !url.startsWith('http')) {
      console.error('Invalid Twitter URL format:', url)
      return 'https://x.com/MaestroBots/status/1996671035568214460?s=20'
    }

    return url
  } catch (error) {
    console.error('Error fetching Twitter URL:', error)
    return 'https://x.com/MaestroBots/status/1996671035568214460?s=20'
  }
}

// Keep for backward compatibility
export const TWITTER_REDIRECT_URL = "https://x.com/MaestroBots/status/1996671035568214460?s=20"
