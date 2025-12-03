-- Update to latest tweet
UPDATE settings 
SET value = 'https://x.com/MaestroBots/status/1996264578792018147?s=20',
    updated_at = NOW()
WHERE key = 'twitter_url';

