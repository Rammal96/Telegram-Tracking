# Deployment Guide

## Step 1: Push to GitHub

1. **Initialize git (if not already done):**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Telegram tracking system"
   ```

2. **Create a new repository on GitHub:**
   - Go to https://github.com/new
   - Create a new repository (don't initialize with README)
   - Copy the repository URL

3. **Push your code:**
   ```bash
   git remote add origin YOUR_GITHUB_REPO_URL
   git branch -M main
   git push -u origin main
   ```

## Step 2: Deploy on Vercel

1. **Go to Vercel:**
   - Visit https://vercel.com
   - Sign in with GitHub

2. **Import your project:**
   - Click "Add New..." → "Project"
   - Select your GitHub repository
   - Click "Import"

3. **Configure project:**
   - Framework Preset: **Next.js** (auto-detected)
   - Root Directory: `./` (default)
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)

4. **Add Environment Variables:**
   Click "Environment Variables" and add:
   - **Name:** `SUPABASE_URL`
     **Value:** `https://wucmxcknjkuovyigeyxg.supabase.co`
   
   - **Name:** `SUPABASE_SERVICE_ROLE_KEY`
     **Value:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind1Y214Y2tuamt1b3Z5aWdleXhnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MzEyNDYzMCwiZXhwIjoyMDc4NzAwNjMwfQ.KUvTSmtzbYHy0Thh-R6dRU_IgHqHfl_xgkegohjOdBE`

5. **Deploy:**
   - Click "Deploy"
   - Wait 2-3 minutes for deployment

## Step 3: Get Your Public URLs

After deployment, Vercel will give you a URL like:
- `https://your-project-name.vercel.app`

**Your 14 tracking links will be:**
- `https://your-project-name.vercel.app/api/track/turkey`
- `https://your-project-name.vercel.app/api/track/russia`
- `https://your-project-name.vercel.app/api/track/india`
- `https://your-project-name.vercel.app/api/track/china`
- `https://your-project-name.vercel.app/api/track/vietnam`
- `https://your-project-name.vercel.app/api/track/indonesia`
- `https://your-project-name.vercel.app/api/track/germany`
- `https://your-project-name.vercel.app/api/track/france`
- `https://your-project-name.vercel.app/api/track/arabic`
- `https://your-project-name.vercel.app/api/track/nigeria`
- `https://your-project-name.vercel.app/api/track/tagalog`
- `https://your-project-name.vercel.app/api/track/portugal`
- `https://your-project-name.vercel.app/api/track/spain`
- `https://your-project-name.vercel.app/api/track/malay`

**Dashboard:**
- `https://your-project-name.vercel.app/dashboard`

## Step 4: Test After Deployment

1. Test a tracking link (e.g., turkey)
2. Check the dashboard to verify the click was logged
3. Test another region (e.g., russia)
4. Verify both appear in the dashboard

## Step 5: Share Your Links

Send the appropriate tracking link to each Telegram group based on their region.

## Important Notes

- **Free tier:** Vercel and Supabase free tiers are sufficient for this project
- **Auto-deploy:** Every push to GitHub will automatically redeploy
- **Environment variables:** Already configured, no need to change
- **Custom domain:** You can add a custom domain in Vercel settings if needed

