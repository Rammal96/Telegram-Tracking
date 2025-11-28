-- Create settings table to store Twitter URL
CREATE TABLE IF NOT EXISTS settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert initial Twitter URL
INSERT INTO settings (key, value) 
VALUES ('twitter_url', 'https://x.com/MaestroBots/status/1994096398837362765?s=20')
ON CONFLICT (key) DO NOTHING;

CREATE INDEX IF NOT EXISTS idx_settings_key ON settings(key);

