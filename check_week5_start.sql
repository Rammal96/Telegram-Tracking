-- Check current Week 5 start time
SELECT * FROM settings WHERE key = 'week5_start_time';

-- If it exists, update it
-- If it doesn't exist, insert it
INSERT INTO settings (key, value, updated_at)
VALUES ('week5_start_time', '2025-01-06T00:00:00.000Z', NOW())
ON CONFLICT (key) DO UPDATE
SET value = '2025-01-06T00:00:00.000Z', updated_at = NOW();
