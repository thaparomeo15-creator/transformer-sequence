-- Run this in Supabase Dashboard → SQL Editor
CREATE TABLE IF NOT EXISTS waitlist (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email text UNIQUE NOT NULL,
  tier text DEFAULT 'personal',
  referral_code text UNIQUE,
  referred_by text,
  source text DEFAULT 'website',
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;
CREATE POLICY "insert_policy" ON waitlist FOR INSERT WITH CHECK (true);
CREATE POLICY "select_own" ON waitlist FOR SELECT USING (true);
