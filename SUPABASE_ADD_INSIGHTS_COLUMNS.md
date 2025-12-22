# Add Insights Columns to Results Table

## Overview

Add columns to store all insights and analysis that users see on results page:
- Market position (diffusion segment)
- Strengths (top categories with interpretation)
- Constraints (weak areas with impact analysis)
- Overall pattern (team profile)
- Cross-category patterns
- Category insights
- Inconsistent categories

## Migration SQL

Run this in Supabase SQL Editor:

```sql
-- Add insights columns to assessment_results table
ALTER TABLE assessment_results
  -- Market Position / Diffusion Curve
  ADD COLUMN diffusion_segment VARCHAR(50),
  ADD COLUMN diffusion_description TEXT,
  ADD COLUMN market_position VARCHAR(100),
  
  -- Team Profile
  ADD COLUMN overall_pattern_title VARCHAR(200),
  ADD COLUMN overall_pattern_description TEXT,
  
  -- Strengths (JSONB array of objects)
  ADD COLUMN strengths JSONB,
  
  -- Constraints (JSONB array of objects)
  ADD COLUMN constraints JSONB,
  
  -- Cross-category patterns (JSONB array)
  ADD COLUMN patterns JSONB,
  
  -- Category insights (JSONB object)
  ADD COLUMN category_insights JSONB,
  
  -- Inconsistent categories (JSONB array)
  ADD COLUMN inconsistent_categories JSONB;

-- Add comments for documentation
COMMENT ON COLUMN assessment_results.diffusion_segment IS 'User market segment: Innovators, Early Adopters, Early Majority, Late Majority, or Laggards';
COMMENT ON COLUMN assessment_results.diffusion_description IS 'Description of what this market segment means';
COMMENT ON COLUMN assessment_results.market_position IS 'Market position within the segment (e.g., "Top 10%")';
COMMENT ON COLUMN assessment_results.overall_pattern_title IS 'Title of the overall team pattern detected';
COMMENT ON COLUMN assessment_results.overall_pattern_description IS 'Description of what this pattern means for the team';
COMMENT ON COLUMN assessment_results.strengths IS 'Array of top 3 strengths with interpretation and impact';
COMMENT ON COLUMN assessment_results.constraints IS 'Array of bottom 3 constraints with interpretation, impact, and cost';
COMMENT ON COLUMN assessment_results.patterns IS 'Array of detected cross-category patterns';
COMMENT ON COLUMN assessment_results.category_insights IS 'Detailed insights for each category';
COMMENT ON COLUMN assessment_results.inconsistent_categories IS 'Categories with high variance in responses';
```

## Data Structure Examples

### diffusion_segment
```json
{
  "segment": "Early Adopters",
  "marketPosition": "Top 25%",
  "description": "You're building AI capabilities carefully...",
  "percentage": 45
}
```

### strengths
```json
[
  {
    "id": "tools-automation",
    "name": "Tools & Automation",
    "score": 4.2,
    "interpretation": "High and consistent usage",
    "impact": "Team is saving significant time..."
  },
  ...
]
```

### constraints
```json
[
  {
    "id": "impact-measurement",
    "name": "Impact Measurement", 
    "score": 2.1,
    "interpretation": "Limited measurement practices",
    "impact": "Hard to justify AI investments...",
    "cost": "Without metrics, you risk..."
  },
  ...
]
```

### overall_pattern
```json
{
  "title": "Experimentation without Structure",
  "description": "Your team is actively trying AI tools...",
  "type": "experimental"
}
```

### patterns
```json
[
  {
    "title": "Tools without Strategy",
    "description": "High tool usage but low strategic alignment...",
    "risk": "medium",
    "categories": ["tools-automation", "strategy-culture"]
  },
  ...
]
```

### category_insights
```json
{
  "strategy-culture": {
    "score": 3.2,
    "level": "developing",
    "keyFinding": "Leadership communication is present...",
    "opportunity": "Strengthen psychological safety..."
  },
  ...
}
```

### inconsistent_categories
```json
[
  {
    "id": "skills-learning",
    "name": "Skills & Learning",
    "score": 3.4,
    "variance": 2.1,
    "interpretation": "Practices depend on individuals..."
  },
  ...
]
```

## After Migration

New columns will be available:
- `diffusion_segment` (VARCHAR)
- `diffusion_description` (TEXT)
- `market_position` (VARCHAR)
- `overall_pattern_title` (VARCHAR)
- `overall_pattern_description` (TEXT)
- `strengths` (JSONB)
- `constraints` (JSONB)
- `patterns` (JSONB)
- `category_insights` (JSONB)
- `inconsistent_categories` (JSONB)

## Query Examples

```sql
-- Get all teams in "Early Adopters" segment
SELECT email, diffusion_segment, overall_score, maturity_level
FROM assessment_results r
JOIN assessment_submissions s ON r.id = s.result_id
WHERE diffusion_segment = 'Early Adopters';

-- Get teams with specific constraints
SELECT 
  s.email,
  r.overall_score,
  r.constraints
FROM assessment_results r
JOIN assessment_submissions s ON r.id = s.result_id
WHERE r.constraints::text LIKE '%Impact Measurement%';

-- Count teams by market segment
SELECT 
  diffusion_segment,
  COUNT(*) as team_count,
  AVG(overall_score) as avg_score
FROM assessment_results
GROUP BY diffusion_segment
ORDER BY avg_score DESC;

-- Get teams with specific patterns
SELECT 
  s.email,
  r.overall_pattern_title,
  r.patterns
FROM assessment_results r
JOIN assessment_submissions s ON r.id = s.result_id
WHERE r.patterns::text LIKE '%Tools without Strategy%';
```

## Benefits

✅ **Complete data capture** - All insights shown to user are saved
✅ **Rich analytics** - Query by segment, patterns, strengths, constraints
✅ **User journey tracking** - Understand what users see and why
✅ **A/B testing** - Test different recommendation logic
✅ **Cohort analysis** - Compare teams by segment or pattern
