# Complete Setup Guide

## Step 1: Create Supabase Account & Project

1. Go to https://supabase.com
2. Click "Start your project" or "Sign up"
3. Sign up with GitHub (recommended) or email
4. Click "New Project"
5. Fill in:
   - Project name: `telegram-tracking` (or any name)
   - Database password: Create a strong password (save it!)
   - Region: Choose closest to you
6. Click "Create new project"
7. Wait 2-3 minutes for project to initialize

## Step 2: Get Your Supabase Credentials

1. In your Supabase project dashboard, click **Settings** (gear icon) in left sidebar
2. Click **API** in the settings menu
3. You'll see two values you need:
   - **Project URL** - looks like: `https://xxxxxxxxxxxxx.supabase.co`
   - **Service Role Key** - long string starting with `eyJ...` (click "Reveal" to see it)

## Step 3: Create the Database Table

1. In Supabase dashboard, click **SQL Editor** in left sidebar
2. Click **New query**
3. Copy and paste this SQL:

```sql
CREATE TABLE clicks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  region TEXT NOT NULL,
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  ip TEXT,
  user_agent TEXT,
  referer TEXT
);

CREATE INDEX idx_clicks_region ON clicks(region);
CREATE INDEX idx_clicks_timestamp ON clicks(timestamp);
```

4. Click **Run** (or press Cmd/Ctrl + Enter)
5. You should see "Success. No rows returned"

## Step 4: Update Environment Variables

1. Open `.env.local` in your project
2. Replace the placeholder values:

```
SUPABASE_URL=https://your-actual-project-url.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-actual-service-role-key-here
```

**Important:** Use the **Service Role Key**, NOT the anon/public key!

## Step 5: Update Twitter Redirect URL

1. Open `lib/twitter.ts`
2. Replace the placeholder with your actual Twitter post URL:

```typescript
export const TWITTER_REDIRECT_URL = "https://twitter.com/yourusername/status/1234567890";
```

## Step 6: Restart the Server

The dev server should auto-reload, but if not:
1. Stop the server (Ctrl+C)
2. Run: `npm run dev`

## Step 7: Test It

1. Visit: http://localhost:3000/api/track/turkey
   - Should redirect to your Twitter post
2. Visit: http://localhost:3000/dashboard
   - Should show the click you just made

## Troubleshooting

**Error: "Invalid supabaseUrl"**
- Check that SUPABASE_URL in `.env.local` starts with `https://`
- Make sure there are no extra spaces or quotes

**Error: "Missing Supabase environment variables"**
- Make sure `.env.local` exists in the project root
- Restart the dev server after creating/updating `.env.local`

**Dashboard shows error**
- Check that you ran the SQL to create the `clicks` table
- Verify your Service Role Key is correct (not the anon key)

**Tracking link doesn't redirect**
- Check that `lib/twitter.ts` has a valid Twitter URL
- Check browser console for errors
