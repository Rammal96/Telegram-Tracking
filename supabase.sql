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

