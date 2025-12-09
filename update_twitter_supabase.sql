-- Update Twitter URL to latest tweet
UPDATE settings 
SET value = 'https://x.com/MaestroBots/status/1996671035568214460?s=20',
    updated_at = NOW()
WHERE key = 'twitter_url';

