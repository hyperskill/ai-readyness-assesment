# AI Readiness Assessment  
## Implementation Guide (Likert → AI Maturity)

This document explains how to implement scoring, interpretation, and result mapping
for the AI Readiness Assessment based on Likert-scale responses.

---

## 1. Input Structure

### 1.1 Likert Scale
Each question is answered on a **1–5 Likert scale**:

- 1 — Strongly disagree  
- 2 — Disagree  
- 3 — Partially agree / Neutral  
- 4 — Agree  
- 5 — Strongly agree  

All questions use the same scale.

---

### 1.2 Categories
The assessment consists of **9 categories**:

1. Strategy & Culture  
2. Data & Infrastructure  
3. Tools & Automation  
4. Skills & Learning  
5. Product & Processes  
6. Security & Compliance  
7. Experimentation & Innovation  
8. Integration & Scaling  
9. Impact Measurement  

Each category contains **5 questions**.  
All questions inside a category have **equal weight**.

---

## 2. Category Scoring

For each category, calculate a **Category Score** as the average of its questions:

```
Category Score = (Q1 + Q2 + Q3 + Q4 + Q5) / 5
```

- Output range: **1.0 – 5.0**
- Meaning: maturity level of the team in this specific area

---

## 3. Category Score Interpretation

| Score Range | Interpretation |
|------------|----------------|
| 1.0 – 2.0 | Critical gap. The area is largely unaddressed |
| 2.1 – 3.0 | Early stage. Awareness exists, but practices are inconsistent |
| 3.1 – 4.0 | Operational. Practices are used, but not yet fully mature |
| 4.1 – 5.0 | Mature. The area is embedded in team processes |

> **Important**  
> Any category with a low score should be treated as a **bottleneck**, even if the
overall AI Readiness Index is high.

---

## 4. Overall AI Readiness Index

Calculate the overall index as the average of all category scores:

```
AI Readiness Index = (Σ Category Scores) / 9
```

- Output range: **1.0 – 5.0**
- Meaning: overall readiness of the team to use AI in a systematic way

---

### 4.1 Percentage Conversion (Optional)

For UI and reporting purposes, convert the index to a percentage:

```
AI Readiness % = ((AI Readiness Index - 1) / 4) × 100
```

Examples:
- 1.0 → 0%
- 3.0 → 50%
- 5.0 → 100%

---

## 5. Mapping to AI Maturity Levels

Map the AI Readiness Index to one of four maturity levels:

| Index Range | Level | Description |
|------------|-------|-------------|
| 1.0 – 2.0 | AI-Curious | Isolated interest, experimentation without structure |
| 2.1 – 3.0 | AI-Enabled | Initial adoption and local pilots |
| 3.1 – 4.0 | AI-Driven | AI embedded in workflows with measurable impact |
| 4.1 – 5.0 | AI-Native | AI integrated into strategy, culture, and architecture |

---

## 6. Consistency & Quality Checks

### 6.1 Intra-Category Consistency

If answers inside a category vary significantly  
(e.g. mix of very low and very high scores):

- Mark the category as **inconsistent**
- Interpretation:
  - Practices exist but are uneven
  - Knowledge depends on individuals
  - Processes are not standardized

This signal is often as important as the average score.

---

### 6.2 Cross-Category Patterns

Look for common patterns across categories:

- **High Tools & Low Data**  
  → AI is used, but without a reliable data foundation

- **High Skills & Low Strategy**  
  → Strong individuals without leadership alignment

- **High Experimentation & Low Measurement**  
  → Innovation activity without proven business impact

These patterns should directly influence recommendations.

---

## 7. Result Structure

The final assessment output includes multiple layers of insight:

### 1. Core Metrics
- **AI Readiness Index** (1.0-5.0)
- **AI Readiness Percentage** (0-100%)
- **Maturity Level** (AI-Curious / AI-Enabled / AI-Driven / AI-Native)
- **Category Scores** (9 categories, each 1.0-5.0)

### 2. Market Context (NEW)
- **Diffusion Segment** — Position in innovation adoption curve
  - Segment name (Innovators, Early Adopters, Early Majority, Late Majority, Laggards)
  - Percentile ranking
  - Market position description
  - Score range for segment

### 3. Qualitative Insights (NEW)
- **Overall Pattern** — Detected from score combinations:
  - Pattern title (e.g., "High energy + Low structure")
  - Pattern description (what it means)
  
- **Strengths** — Top 3 categories (score >= 3.0):
  - Category name and score
  - Interpretation (what high score means)
  - Impact (why it's beneficial)
  
- **Constraints** — Bottom 3 categories (score < 3.5):
  - Category name and score
  - Interpretation (what low score means)
  - Impact (how it affects team)
  - Cost (what you're losing)

### 4. Category Analysis
- **Insights** — Top 3 and bottom 3 categories
- **Inconsistent Categories** — High variance (> 1.5)
  - Indicates uneven practices
  - Suggests knowledge depends on individuals

### 5. Cross-Category Patterns
Detection of system-level issues:
- High Tools & Low Data → Foundation risk
- High Skills & Low Strategy → Alignment gap
- High Experimentation & Low Measurement → Validation gap
- High Integration & Low Security → Governance risk

### 6. Signals for Recommendations
Composite signals calculated from categories:
- **Alignment Signal** = avg(Strategy, Skills)
- **Engineering Depth Signal** = avg(Data, Integration, Measurement)
- **Workflow Acceleration Signal** = avg(Tools, Integration)
- **Experimentation Signal** = avg(Experimentation, Product)

### 7. Product Recommendation
Based on signal thresholds:
- **AI Foundations** if Alignment < 3.2
- **AI Engineering** if Alignment >= 3.2, Experimentation >= 3.2, Engineering < 3.4
- **AI-Driven Development** if Alignment >= 3.2, Workflow >= 3.4, Engineering >= 3.2

---

## 8. Advanced Scoring Methods (Implementation)

### 8.1 Diffusion Segment Mapping

Maps percentage score to innovation adoption curve segments:

```javascript
if (percentage < 15)  → Laggards (bottom 15%)
if (percentage < 35)  → Late Majority (bottom 35%)
if (percentage < 65)  → Early Majority (middle 50%)
if (percentage < 85)  → Early Adopters (top 25%)
if (percentage >= 85) → Innovators (top 10%)
```

Each segment includes:
- Segment name
- Percentile ranking
- Short description
- Market position label

### 8.2 Overall Pattern Detection

Analyzes score combinations to identify team archetypes:

**Pattern 1: High individual energy + Low organizational structure**
- Condition: Skills > 3.5 AND Strategy < 2.8
- Meaning: Capable individuals, but no shared direction

**Pattern 2: Active tool usage + Weak foundation**
- Condition: Tools > 3.5 AND Data < 2.8
- Meaning: Using AI actively, but infrastructure lags

**Pattern 3: Early exploration phase**
- Condition: Average constraint score < 2.5
- Meaning: Beginning of AI journey, need foundations

**Pattern 4: Strong foundation in place**
- Condition: Average strength score > 3.8
- Meaning: Solid capabilities, ready to scale

**Pattern 5: Building systematically** (default)
- Condition: All other cases
- Meaning: Making progress across dimensions

### 8.3 Qualitative Strength Analysis

For each top-scoring category (>= 3.0):
- Generate interpretation text (what high score means)
- Generate impact text (why it's beneficial)
- All texts are category-specific and contextual

Example (Strategy & Culture):
- Interpretation: "Your team has clear direction and leadership support"
- Impact: "This creates momentum and clear priorities"

### 8.4 Qualitative Constraint Analysis

For each low-scoring category (< 3.5):
- Generate interpretation text (what low score means)
- Generate impact text (how it affects team)
- Generate cost text (what you're losing)

Example (Data & Infrastructure):
- Interpretation: "AI works in demos but breaks in production"
- Impact: "AI solutions are fragile and hard to maintain"
- Cost: "Re-work, fragile systems, limited trust in AI"

### 8.5 Variance Detection

For each category, calculate variance:

```
Variance = Σ(response - mean)² / n
```

If variance > 1.5:
- Mark category as "inconsistent"
- Interpretation: Uneven practices within team
- Indicates knowledge depends on individuals

### 8.6 Signal Calculation

Composite signals for recommendation logic:

```
Alignment = (Strategy + Skills) / 2
Engineering Depth = (Data + Integration + Measurement) / 3
Workflow Acceleration = (Tools + Integration) / 2
Experimentation = (Experimentation + Product) / 2
```

These signals drive product recommendation logic.

---

## 9. Complete Result Object Structure

The `ScoringEngine.calculate()` method returns a comprehensive object:

```javascript
{
  // Core metrics
  aiNativenessIndex: 2.8,           // 1.0-5.0
  aiNativenessPercentage: 45,        // 0-100
  maturityLevel: 'AI-Enabled',       // String
  
  // Category data
  categoryScores: {
    'strategy-culture': {
      name: 'Strategy & Culture',
      score: 2.4,
      variance: 0.8,
      isInconsistent: false
    },
    // ... 8 more categories
  },
  
  // Market context (NEW)
  diffusionSegment: {
    segment: 'Early Majority',
    percentile: 50,
    description: 'Systematically building AI capabilities',
    marketPosition: 'middle 50%'
  },
  
  // Qualitative insights (NEW)
  strengths: [
    {
      name: 'Tools & Automation',
      score: 4.2,
      interpretation: 'Your team actively uses AI...',
      impact: 'This builds practical experience...'
    },
    // ... up to 3 total
  ],
  
  constraints: [
    {
      name: 'Strategy & Culture',
      score: 2.1,
      interpretation: 'Experiments don\'t scale...',
      impact: 'Individual teams experimenting...',
      cost: 'Duplicated effort, inconsistent quality...'
    },
    // ... up to 3 total
  ],
  
  overallPattern: {
    title: 'High energy + Low structure = Fragile progress',
    description: 'This is common for teams at your stage...'
  },
  
  // Analysis
  insights: {
    strongest: [/* top 3 categories */],
    weakest: [/* bottom 3 categories */]
  },
  
  patterns: [
    {
      type: 'high-skills-low-strategy',
      title: 'Skills without alignment',
      description: 'Individual competence exists...',
      risk: 'medium'
    },
    // ... if detected
  ],
  
  inconsistentCategories: [
    {
      id: 'experimentation-innovation',
      name: 'Experimentation & Innovation',
      score: 3.2,
      variance: 1.8
    },
    // ... if any
  ],
  
  // Signals
  signals: {
    alignment: 2.8,
    engineeringDepth: 2.6,
    workflowAcceleration: 3.4,
    experimentation: 3.1
  },
  
  // Recommendation
  recommendation: {
    product: 'AI foundations training',
    reason: 'alignment-gap'
  }
}
```

This rich structure enables:
- Multiple visualization approaches
- Detailed analysis and reporting
- Personalized recommendations
- Quality signals and warnings

---

## 10. Text Content Management

All user-facing text is centralized for easy content management:

### Location of Text Content

1. **Maturity level descriptions** → `js/data.js` (LEVEL_DESCRIPTIONS)
2. **Product recommendations** → `js/data.js` (PRODUCT_DESCRIPTIONS)
3. **Category interpretations** → `js/scoring.js` (methods)
4. **Pattern descriptions** → `js/scoring.js` (getOverallPattern)
5. **Benchmark messages** → `js/survey.js` (getBenchmarkMeaning)

### Master Reference

All text content is documented in:
- **`docs/level-descriptions.md`** — Complete text reference
  - All 7 categories of text
  - Conditions for each variant
  - Context and usage notes

This file serves as the single source of truth for content editing.

### Categories of Text

1. **Maturity Level Descriptions** (4 variants)
2. **Diffusion Segment Descriptions** (5 variants)
3. **Benchmark Context Messages** (5 variants)
4. **Overall Team Patterns** (5 variants)
5. **Strength Interpretations** (9 categories × 2 texts)
6. **Constraint Interpretations** (9 categories × 3 texts)
7. **Product Recommendations** (3 options)

All texts follow principles:
- Constructive, not judgmental
- Specific, not generic
- Action-oriented, not theoretical
- Respectful of team effort

---

## 11. Design Principles

- Keep scoring transparent and explainable
- Avoid black-box calculations
- Emphasize system maturity, not individual performance
- Frame results as guidance for planning, not judgment
- Provide both quantitative and qualitative insights
- Make patterns visible that teams might not notice themselves

---

This methodology supports honest self-reflection, clear communication,
and data-driven recommendations for AI transformation initiatives.
