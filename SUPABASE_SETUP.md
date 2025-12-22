# Supabase Integration Setup

## Step 1: Create Supabase Project

1. Go to https://supabase.com
2. Sign up or log in
3. Create a new project
4. Save your project URL and API keys

## Step 2: Database Schema

Create two tables in Supabase:

### Table 1: `assessment_results`

This table stores the calculated results and user-facing text.

```sql
CREATE TABLE assessment_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  
  -- Scores
  overall_score DECIMAL(3,2) NOT NULL,
  maturity_level VARCHAR(50) NOT NULL,
  category_scores JSONB NOT NULL,
  
  -- Recommendations
  recommendations JSONB,
  
  -- User-facing content (what user sees on results page)
  maturity_description TEXT,
  recommendations_text TEXT,
  
  -- Metadata
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Index for faster queries
CREATE INDEX idx_assessment_results_created_at ON assessment_results(created_at DESC);
CREATE INDEX idx_assessment_results_maturity ON assessment_results(maturity_level);
```

### Table 2: `assessment_submissions`

This table stores raw user responses.

```sql
CREATE TABLE assessment_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  
  -- User info
  email VARCHAR(255),
  
  -- Raw responses (JSON object with category IDs as keys)
  responses JSONB NOT NULL,
  
  -- Foreign key to results
  result_id UUID NOT NULL REFERENCES assessment_results(id) ON DELETE CASCADE,
  
  -- Metadata
  user_agent TEXT,
  ip_address INET,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Indexes
CREATE INDEX idx_assessment_submissions_created_at ON assessment_submissions(created_at DESC);
CREATE INDEX idx_assessment_submissions_email ON assessment_submissions(email);
CREATE INDEX idx_assessment_submissions_result_id ON assessment_submissions(result_id);
```

### Enable Row Level Security (RLS)

```sql
-- Enable RLS
ALTER TABLE assessment_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessment_submissions ENABLE ROW LEVEL SECURITY;

-- Policy: Allow service role to do everything
CREATE POLICY "Allow service role full access on assessment_results" 
  ON assessment_results 
  FOR ALL 
  USING (true);

CREATE POLICY "Allow service role full access on assessment_submissions" 
  ON assessment_submissions 
  FOR ALL 
  USING (true);
```

## Step 3: Get API Keys

From your Supabase project settings:
1. Go to Settings → API
2. Copy:
   - Project URL (e.g., `https://xxxxx.supabase.co`)
   - `anon` public key (for client-side, if needed)
   - `service_role` key (for server-side, **keep secret!**)

## Step 4: Environment Variables

Create `.env` file in project root:

```env
PORT=3000

# Supabase Configuration
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=your-service-role-key-here
```

**Important:** Add `.env` to `.gitignore` (already done)

## Step 5: Install Dependencies

```bash
npm install @supabase/supabase-js
```

## Step 6: Test Connection

After setup, test with:

```bash
npm start
# Complete an assessment in browser
# Check Supabase dashboard to see data
```

## Data Relationship

```
assessment_results (id: UUID)
    ↓ (one-to-one)
assessment_submissions (result_id: UUID → assessment_results.id)
```

Each submission references one result entry.

## Querying Data

### Get submission with results:
```sql
SELECT 
  s.*,
  r.overall_score,
  r.maturity_level,
  r.category_scores,
  r.recommendations
FROM assessment_submissions s
JOIN assessment_results r ON s.result_id = r.id
ORDER BY s.created_at DESC;
```

### Get all submissions for an email:
```sql
SELECT * FROM assessment_submissions 
WHERE email = 'user@example.com'
ORDER BY created_at DESC;
```

### Analytics - Average scores by maturity level:
```sql
SELECT 
  maturity_level,
  COUNT(*) as count,
  AVG(overall_score) as avg_score
FROM assessment_results
GROUP BY maturity_level;
```
