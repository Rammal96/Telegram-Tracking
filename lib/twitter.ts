import { supabase } from './supabase'

export async function getTwitterUrl(): Promise<string> {
  try {
    const { data, error } = await supabase
      .from('settings')
      .select('value')
      .eq('key', 'twitter_url')
      .single()

    if (error || !data) {
      // Fallback to default if not found
      return 'https://x.com/MaestroBots/status/1994194433412137104?s=20'
    }

    return data.value
  } catch (error) {
    console.error('Error fetching Twitter URL:', error)
    return 'https://x.com/MaestroBots/status/1994194433412137104?s=20'
  }
}

// Keep for backward compatibility
export const TWITTER_REDIRECT_URL = "https://x.com/MaestroBots/status/1994194433412137104?s=20"
