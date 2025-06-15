-- Create the feedback table in Supabase
-- Run this SQL in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS public.feedback (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  staff TEXT,
  visit_date DATE,
  feedback TEXT NOT NULL,
  contact TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- If the table already exists, ensure the staff column is nullable
ALTER TABLE public.feedback
  ALTER COLUMN staff DROP NOT NULL;

-- Create an index on created_at for better query performance
CREATE INDEX idx_feedback_created_at ON feedback(created_at DESC);

-- Create an index on staff for filtering by staff member
CREATE INDEX idx_feedback_staff ON feedback(staff);

-- Reset everything
DROP POLICY IF EXISTS "Allow anonymous submissions" ON public.feedback;
DROP POLICY IF EXISTS "Allow anonymous feedback submission" ON public.feedback;
DROP POLICY IF EXISTS "Allow authenticated users to read feedback" ON public.feedback;
DROP POLICY IF EXISTS "Enable all access" ON public.feedback;

-- Disable and re-enable RLS
ALTER TABLE public.feedback DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;

-- Remove all existing policies
DROP POLICY IF EXISTS "Enable insert for anonymous users" ON public.feedback;
DROP POLICY IF EXISTS "Enable select for authenticated users" ON public.feedback;

-- Create a single policy for anonymous inserts
CREATE POLICY "Enable anonymous inserts"
ON public.feedback
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Optional: Add read policy for authenticated users
CREATE POLICY "Enable authenticated reads"
ON public.feedback
FOR SELECT
TO authenticated
USING (true);

-- Verify the policy is created
SELECT * FROM pg_policies WHERE tablename = 'feedback';

-- Optional: Create a view for feedback statistics
CREATE VIEW feedback_stats AS
SELECT 
  staff,
  COUNT(*) as total_feedback,
  COUNT(CASE WHEN visit_date >= CURRENT_DATE - INTERVAL '30 days' THEN 1 END) as recent_feedback,
  AVG(LENGTH(feedback)) as avg_feedback_length
FROM feedback 
GROUP BY staff
ORDER BY total_feedback DESC; 