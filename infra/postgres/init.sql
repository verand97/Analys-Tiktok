-- Users
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  role VARCHAR(20) DEFAULT 'free', -- free | pro | admin
  subscription_expires_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT now()
);

-- Categories
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL
);

-- Hashtags
CREATE TABLE hashtags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tag VARCHAR(255) UNIQUE NOT NULL,
  category_id INT REFERENCES categories(id),
  created_at TIMESTAMP DEFAULT now()
);

-- Hashtag historical snapshots (data nyata, time-series)
CREATE TABLE hashtag_snapshots (
  id BIGSERIAL PRIMARY KEY,
  hashtag_id UUID REFERENCES hashtags(id),
  view_count BIGINT NOT NULL,
  video_count BIGINT,
  fetched_at TIMESTAMP DEFAULT now()
);

-- Sounds
CREATE TABLE sounds (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tiktok_sound_id VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(255),
  author VARCHAR(255),
  category_id INT REFERENCES categories(id)
);

CREATE TABLE sound_snapshots (
  id BIGSERIAL PRIMARY KEY,
  sound_id UUID REFERENCES sounds(id),
  usage_count BIGINT NOT NULL,
  fetched_at TIMESTAMP DEFAULT now()
);

-- Tracked accounts (untuk competitor analysis)
CREATE TABLE tracked_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username VARCHAR(255) UNIQUE NOT NULL,
  added_by_user_id UUID REFERENCES users(id)
);

CREATE TABLE account_snapshots (
  id BIGSERIAL PRIMARY KEY,
  account_id UUID REFERENCES tracked_accounts(id),
  follower_count BIGINT,
  avg_views BIGINT,
  posting_frequency_per_week FLOAT,
  fetched_at TIMESTAMP DEFAULT now()
);

-- Watchlist
CREATE TABLE watchlist_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  item_type VARCHAR(20) NOT NULL, -- hashtag | sound | account
  item_id UUID NOT NULL,
  created_at TIMESTAMP DEFAULT now()
);

-- Hype score requests (log + hasil, untuk audit & rate limit)
CREATE TABLE hype_score_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  video_url VARCHAR(500),
  score FLOAT,
  breakdown JSONB, -- {velocity: x, trending_position: y, category_avg: z}
  created_at TIMESTAMP DEFAULT now()
);
