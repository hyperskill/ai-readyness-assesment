# Supabase Quick Start Guide

## 🚀 Quick Setup (5 minutes)

### Step 1: Create Supabase Account & Project

1. Go to https://supabase.com
2. Sign up / Log in
3. Click "New Project"
4. Fill in:
   - **Name**: ai-readiness (or any name)
   - **Database Password**: (create a strong password)
   - **Region**: Choose closest to you
5. Click "Create new project" (wait 1-2 minutes for setup)

### Step 2: Create Database Tables

1. In your Supabase dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy and paste this SQL:

```sql
-- Table 1: Assessment Results
CREATE TABLE assessment_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  overall_score DECIMAL(3,2) NOT NULL,
  maturity_level VARCHAR(50) NOT NULL,
  category_scores JSONB NOT NULL,
  recommendations JSONB,
  maturity_description TEXT,
  recommendations_text TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Table 2: Assessment Submissions
CREATE TABLE assessment_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  email VARCHAR(255),
  responses JSONB NOT NULL,
  result_id UUID NOT NULL REFERENCES assessment_results(id) ON DELETE CASCADE,
  user_agent TEXT,
  ip_address INET,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Indexes for performance
CREATE INDEX idx_assessment_results_created_at ON assessment_results(created_at DESC);
CREATE INDEX idx_assessment_submissions_created_at ON assessment_submissions(created_at DESC);
CREATE INDEX idx_assessment_submissions_email ON assessment_submissions(email);
CREATE INDEX idx_assessment_submissions_result_id ON assessment_submissions(result_id);

-- Enable Row Level Security
ALTER TABLE assessment_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessment_submissions ENABLE ROW LEVEL SECURITY;

-- Policies: Allow service role full access
CREATE POLICY "Allow service role full access on assessment_results" 
  ON assessment_results FOR ALL USING (true);

CREATE POLICY "Allow service role full access on assessment_submissions" 
  ON assessment_submissions FOR ALL USING (true);
```

4. Click **Run** (or press Cmd/Ctrl + Enter)
5. You should see "Success. No rows returned"

### Step 3: Get API Keys

1. In Supabase dashboard, go to **Settings** → **API**
2. Find and copy:
   - **Project URL** (looks like `https://xxxxx.supabase.co`)
   - **service_role key** (click "Reveal" to see it)

⚠️ **Important**: Use the `service_role` key (NOT the `anon` key) for server-side access.

### Step 4: Configure Your Application

1. In your project root, create a `.env` file:

```bash
# Copy the example
cp .env.example .env
```

2. Edit `.env` and add your Supabase credentials:

```env
PORT=3000

SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_SERVICE_KEY=your-service-role-key-here
```

Replace:
- `your-project-id` with your actual project ID
- `your-service-role-key-here` with your actual service role key

### Step 5: Restart Server

```bash
# If server is running, stop it (Ctrl+C)
# Then restart:
npm run dev
```

You should see:
```
✓ Supabase client initialized
Server is running on http://localhost:3000
```

### Step 6: Test It!

1. Open http://localhost:3000
2. Complete the assessment
3. Check your server console - should see:
   ```
   ✓ Data saved to Supabase database
   ```
4. Go to Supabase dashboard → **Table Editor**
5. Click on `assessment_submissions` - you should see your data!
6. Click on `assessment_results` - you should see the calculated scores!

## 🎉 Done!

Your assessments are now being saved to Supabase!

## 📊 View Your Data

### In Supabase Dashboard:

1. Go to **Table Editor**
2. Select `assessment_submissions` to see all submissions
3. Select `assessment_results` to see all results
4. Click on a row to see details

### Query Your Data:

Go to **SQL Editor** and try:

```sql
-- Get all submissions with results
SELECT 
  s.email,
  s.created_at,
  r.overall_score,
  r.maturity_level
FROM assessment_submissions s
JOIN assessment_results r ON s.result_id = r.id
ORDER BY s.created_at DESC
LIMIT 10;
```

```sql
-- Count by maturity level
SELECT 
  maturity_level,
  COUNT(*) as count,
  AVG(overall_score) as avg_score
FROM assessment_results
GROUP BY maturity_level
ORDER BY avg_score DESC;
```

```sql
-- Get all submissions for a specific email
SELECT 
  s.*,
  r.overall_score,
  r.maturity_level,
  r.category_scores
FROM assessment_submissions s
JOIN assessment_results r ON s.result_id = r.id
WHERE s.email = 'user@example.com'
ORDER BY s.created_at DESC;
```

## 🔧 Troubleshooting

### Error: "Supabase client not initialized"
- Make sure `.env` file exists
- Check that `SUPABASE_URL` and `SUPABASE_SERVICE_KEY` are set
- Restart the server

### Error: "relation does not exist"
- Make sure you ran the SQL in Step 2
- Check table names match exactly
- Verify in Table Editor that tables exist

### Error: "new row violates row-level security policy"
- Make sure you used the `service_role` key (not `anon` key)
- Check that RLS policies were created correctly

### Data not appearing in tables
- Check server console for error messages
- Verify Supabase URL and key are correct
- Try completing another assessment

## 🔒 Security Notes

- **Never commit `.env` file** (already in `.gitignore`)
- **Never share your service_role key**
- **Use environment variables** in production
- Consider adding IP restrictions in Supabase settings

## 📖 More Info

- See [SUPABASE_SETUP.md](SUPABASE_SETUP.md) for detailed schema info
- See [API.md](API.md) for API documentation
- Visit https://supabase.com/docs for Supabase docs
