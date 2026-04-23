# Supabase Waitlist Setup

To fix the "TRANSMISSION FAILED" error, follow these steps to ensure your database is correctly configured.

### Step 1: Create the Table
Open your [Supabase SQL Editor](https://supabase.com/dashboard/project/xiuyiiugamhhvcdzvntb/sql) and run this exact command:

```sql
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
```

### Step 2: Configure RLS (Row Level Security)
Run these commands in the SQL Editor to allow anonymous submissions:

```sql
-- Enable RLS
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (Required for the waitlist form)
CREATE POLICY "anon_insert" ON waitlist
  FOR INSERT
  WITH CHECK (true);

-- Allow anonymous selects (Optional: for duplicate checking)
CREATE POLICY "anon_select" ON waitlist
  FOR SELECT
  USING (true);
```

### Step 3: Verify anon Role
Ensure the `anon` role is enabled in your project settings (**Authentication → Policies**). If you see a warning that anonymous access is disabled, click the "Enable" button in the dashboard.

---
**FINAL VERIFICATION**
After running these, try submitting an email again. If it works, you will see a green "// ACCESS QUEUED" message and a referral code.
