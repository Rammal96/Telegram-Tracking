-- Update to latest tweet
UPDATE settings 
SET value = 'https://x.com/MaestroBots/status/1995547428137656685?s=20',
    updated_at = NOW()
WHERE key = 'twitter_url';

