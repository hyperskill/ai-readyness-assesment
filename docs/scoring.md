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

The final assessment output should include three layers:

### 1. Headline Result
- AI maturity level (AI-Curious / AI-Enabled / AI-Driven / AI-Native)

### 2. Category Profile
- Strongest categories (top 2–3)
- Weakest categories / bottlenecks (bottom 2–3)

### 3. Next-Step Recommendation
- Suggested intervention based on bottlenecks and patterns
- Recommendation should be tied to category weaknesses, not only the overall level

---

## 8. Design Principles

- Keep scoring transparent and explainable
- Avoid black-box calculations
- Emphasize system maturity, not individual performance
- Frame results as guidance for planning, not judgment

---

This methodology supports honest self-reflection, clear communication,
and data-driven recommendations for AI transformation initiatives.
