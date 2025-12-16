-- Update Week 2 tweet count to 6
INSERT INTO settings (key, value, updated_at)
VALUES ('week2_tweet_count', '6', NOW())
ON CONFLICT (key) DO UPDATE
SET value = '6', updated_at = NOW();

