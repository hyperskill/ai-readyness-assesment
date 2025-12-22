# Supabase Integration Changelog

## Summary

Added Supabase database integration for storing assessment submissions and results in two linked tables.

## Changes Made

### 1. New Files Created

#### `supabase.js`
Supabase client module with functions:
- `saveAssessment()` - Save submission and results to database
- `getSubmissions()` - Retrieve submissions (for future features)
- `getSubmissionsByEmail()` - Get user history (for future features)
- `isSupabaseConfigured()` - Check if Supabase is configured

#### Documentation Files
- `SUPABASE_INSTRUCTIONS.md` - Complete user guide (Russian)
- `SUPABASE_QUICKSTART.md` - Quick 5-minute setup guide
- `SUPABASE_SETUP.md` - Detailed database schema and setup
- `CHANGELOG-SUPABASE.md` - This file

### 2. Modified Files

#### `server.js`
- Added import for Supabase functions
- Integrated `saveAssessment()` call after console logging
- Added database save confirmation in response
- Graceful fallback if database save fails

#### `package.json`
- Added dependency: `@supabase/supabase-js@^2.89.0`

#### `.env.example`
- Added Supabase configuration variables:
  - `SUPABASE_URL`
  - `SUPABASE_SERVICE_KEY`

#### `README.md`
- Updated API section to mention database integration
- Added environment variables documentation
- Added links to Supabase setup guides

### 3. Dependencies Added

```bash
npm install @supabase/supabase-js
```

## Database Schema

### Table 1: `assessment_results`

Stores calculated results and user-facing content.

**Fields:**
- `id` (UUID, PK) - Unique result ID
- `overall_score` (DECIMAL) - AI Nativeness Index (1.00-5.00)
- `maturity_level` (VARCHAR) - Maturity classification
- `category_scores` (JSONB) - Scores for all 9 categories
- `recommendations` (JSONB) - Recommended products array
- `maturity_description` (TEXT) - Description shown to user
- `recommendations_text` (TEXT) - Recommendations text shown to user
- `created_at`, `updated_at` (TIMESTAMP)

### Table 2: `assessment_submissions`

Stores raw user responses.

**Fields:**
- `id` (UUID, PK) - Unique submission ID
- `email` (VARCHAR) - User email (optional)
- `responses` (JSONB) - All question answers by category
- `result_id` (UUID, FK) - References `assessment_results.id`
- `user_agent` (TEXT) - Browser info
- `ip_address` (INET) - User IP
- `created_at`, `updated_at` (TIMESTAMP)

### Relationship

```
assessment_results (1) ← (1) assessment_submissions
```

One-to-one relationship: Each submission has exactly one result.

## Data Flow

### Before (Console Only)
```
User completes → Calculate → Log to console → Show results
```

### After (Console + Database)
```
User completes → Calculate → Log to console → Save to Supabase → Show results
                                                ↓
                                          assessment_results
                                          assessment_submissions
```

## How It Works

1. User completes assessment
2. Frontend sends data to `/api/submit-assessment`
3. Server logs to console (unchanged)
4. **NEW:** Server checks if Supabase is configured
5. **NEW:** If configured, saves to database:
   - First, insert into `assessment_results`
   - Then, insert into `assessment_submissions` with `result_id` reference
6. Server responds with success (includes database IDs if saved)
7. User sees results page

## Configuration

### Required Environment Variables (Optional)

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=your-service-role-key
```

### Behavior Without Configuration

If Supabase variables are not set:
- ✅ Application works normally
- ✅ Data logged to console
- ❌ No database storage
- ℹ️ Console shows: "Supabase not configured - data will only be logged to console"

### Behavior With Configuration

If Supabase variables are set:
- ✅ Application works normally
- ✅ Data logged to console
- ✅ Data saved to database
- ✅ Console shows: "✓ Supabase client initialized"
- ✅ After save: "✓ Data saved to Supabase database"

## Setup Steps

### Quick Version (5 minutes)

1. Create Supabase project at https://supabase.com
2. Run SQL script to create tables (see `SUPABASE_SETUP.md`)
3. Copy Project URL and service_role key
4. Create `.env` file with credentials
5. Restart server (`npm run dev`)
6. Test with an assessment

### Detailed Instructions

See:
- `SUPABASE_INSTRUCTIONS.md` - Full guide (Russian)
- `SUPABASE_QUICKSTART.md` - Quick start (English)
- `SUPABASE_SETUP.md` - Detailed schema

## Testing

### 1. Test Without Database

```bash
# Don't create .env file
npm run dev
```

Expected:
```
⚠ Supabase not configured - data will only be logged to console
Server is running on http://localhost:3000
```

Complete assessment → data logged to console only

### 2. Test With Database

```bash
# Create .env with Supabase credentials
npm run dev
```

Expected:
```
✓ Supabase client initialized
Server is running on http://localhost:3000
```

Complete assessment → 
```
✓ Result saved with ID: abc-123...
✓ Submission saved with ID: def-456...
✓ Data saved to Supabase database
```

Check Supabase dashboard → data should be there!

## Error Handling

- Database save failures don't break the UI
- User always sees results page
- Errors logged to console
- Response includes `savedToDatabase: false` if save fails

## Security

- Uses `service_role` key (server-side only)
- `.env` file in `.gitignore`
- Row Level Security (RLS) enabled on tables
- Policy: Service role has full access

## Future Enhancements

With database in place, we can add:
- 📊 Analytics dashboard
- 📧 Email results to users
- 📈 Progress tracking over time
- 👥 Team/company comparison
- 📥 Export to CSV/PDF
- 🔐 User authentication
- 📊 Aggregate statistics

## Query Examples

### Get all submissions
```sql
SELECT * FROM assessment_submissions 
ORDER BY created_at DESC;
```

### Get submissions with results
```sql
SELECT 
  s.email, s.created_at,
  r.overall_score, r.maturity_level
FROM assessment_submissions s
JOIN assessment_results r ON s.result_id = r.id
ORDER BY s.created_at DESC;
```

### Statistics by maturity level
```sql
SELECT 
  maturity_level,
  COUNT(*) as count,
  AVG(overall_score) as avg_score
FROM assessment_results
GROUP BY maturity_level;
```

## Breaking Changes

None - this is backward compatible. App works with or without Supabase.

## Migration Notes

No migration needed - this is an additive feature.

## Rollback

To remove Supabase integration:

1. Remove `supabase.js` file
2. Remove Supabase import and calls from `server.js`
3. Remove Supabase env vars from `.env.example`
4. Run: `npm uninstall @supabase/supabase-js`

Application will work as before (console logging only).
