# Setup Instructions

## Local Development

1. Install dependencies:
```bash
npm install
```

2. Set up Supabase:
   - Create a free account at https://supabase.com
   - Create a new project
   - Go to SQL Editor and run the SQL from `supabase.sql`
   - Go to Settings > API and copy your project URL and service role key

3. Create `.env.local` file:
```bash
cp .env.example .env.local
```

4. Add your Supabase credentials to `.env.local`:
```
SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

5. Update Twitter redirect URL in `lib/twitter.ts`:
   - Replace the placeholder URL with your actual Twitter post URL

6. Run development server:
```bash
npm run dev
```

7. Test tracking links:
   - Visit `http://localhost:3000/api/track/turkey`
   - Visit `http://localhost:3000/api/track/russia`
   - Test all 14 regions
   - Check dashboard at `http://localhost:3000/dashboard`

## Deploy on Vercel

1. Push code to GitHub repository

2. Go to https://vercel.com and sign in

3. Click "New Project" and import your repository

4. Add environment variables:
   - `SUPABASE_URL`: Your Supabase project URL
   - `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase service role key

5. Click "Deploy"

6. After deployment, test your tracking links:
   - `https://your-domain.vercel.app/api/track/turkey`
   - `https://your-domain.vercel.app/api/track/russia`
   - Test all 14 regions

## Connect Supabase

1. Go to your Supabase project dashboard
2. Navigate to Settings > API
3. Copy:
   - Project URL → Use as `SUPABASE_URL`
   - Service Role Key → Use as `SUPABASE_SERVICE_ROLE_KEY` (keep this secret)
4. Run the SQL from `supabase.sql` in the SQL Editor

## Test Each Tracking Link

Available regions (all lowercase):
- `/api/track/turkey`
- `/api/track/russia`
- `/api/track/india`
- `/api/track/china`
- `/api/track/vietnam`
- `/api/track/indonesia`
- `/api/track/germany`
- `/api/track/france`
- `/api/track/arabic`
- `/api/track/nigeria`
- `/api/track/tagalog`
- `/api/track/portugal`
- `/api/track/spain`
- `/api/track/malay`

Each link will:
1. Log the click to Supabase
2. Redirect to the Twitter post URL

## Add New Regions

1. Edit `app/api/track/[region]/route.ts`
2. Add the new region to the `VALID_REGIONS` array
3. Deploy the updated code

