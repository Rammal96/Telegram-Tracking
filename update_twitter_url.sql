-- Update Twitter URL to latest tweet
UPDATE settings 
SET value = 'https://x.com/MaestroBots/status/1994194433412137104?s=20',
    updated_at = NOW()
WHERE key = 'twitter_url';

-- Verify the update
SELECT * FROM settings WHERE key = 'twitter_url';

