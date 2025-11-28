# Twitter Auto-Update Setup

This system automatically updates the Twitter redirect URL when MaestroBots posts a new tweet.

## Setup Options

### Option 1: Using Twitter API (Recommended)

1. **Get Twitter API Access:**
   - Go to https://developer.twitter.com/en/portal/dashboard
   - Create a developer account (free tier available)
   - Create a new app/project
   - Generate a Bearer Token

2. **Add to Vercel:**
   - Go to Vercel → Your Project → Settings → Environment Variables
   - Add: `TWITTER_BEARER_TOKEN` = your bearer token

3. **Create Supabase Settings Table:**
   - Go to Supabase SQL Editor
   - Run the SQL from `supabase_settings.sql`

4. **Set up Auto-Update:**
   
   **Option A: Manual Update (Test First)**
   - Call: `POST https://telegram-tracking.vercel.app/api/twitter/fetch-latest`
   - This will fetch the latest tweet and update the URL

   **Option B: Scheduled Updates (Vercel Cron)**
   - Add to `vercel.json`:
   ```json
   {
     "crons": [{
       "path": "/api/twitter/fetch-latest",
       "schedule": "*/15 * * * *"
     }]
   }
   ```
   - This checks every 15 minutes for new tweets

   **Option C: Webhook Service**
   - Use Zapier, Make.com, or similar
   - Set up: "New Tweet from @MaestroBots" → Call API endpoint
   - Endpoint: `POST https://telegram-tracking.vercel.app/api/twitter/update`
   - Body: `{ "url": "https://x.com/MaestroBots/status/..." }`

### Option 2: Manual Update API

If you don't want to use Twitter API, you can manually update:

```bash
POST https://telegram-tracking.vercel.app/api/twitter/update
Content-Type: application/json

{
  "url": "https://x.com/MaestroBots/status/NEW_TWEET_ID"
}
```

## Testing

1. **Test manual update:**
   ```bash
   curl -X POST https://telegram-tracking.vercel.app/api/twitter/update \
     -H "Content-Type: application/json" \
     -d '{"url": "https://x.com/MaestroBots/status/1994096398837362765?s=20"}'
   ```

2. **Test auto-fetch (requires Twitter API):**
   ```bash
   curl -X POST https://telegram-tracking.vercel.app/api/twitter/fetch-latest
   ```

## How It Works

1. Twitter URL is stored in Supabase `settings` table
2. Tracking links fetch the URL from Supabase (not hardcoded)
3. When a new tweet is detected, the URL is updated in Supabase
4. All tracking links automatically use the new URL

