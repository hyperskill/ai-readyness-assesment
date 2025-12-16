# AI Readiness Assessment  
## Upsell Logic: Mapping Answers to Products

This document describes how to translate assessment results into a clear,
explainable product recommendation for upsell.

The logic is rule-based, transparent, and focused on reducing team and business risk.

---

## 1. Core Principle

**We do not sell a maturity level. We sell risk reduction.**

- Overall AI maturity provides context.
- Category gaps and imbalances trigger recommendations.
- Each recommendation answers the question:
  *“What will break next year if nothing changes?”*

---

## 2. Input Data

After the assessment, the system has:

- `CategoryScore[1..9]` — average score per category (1.0–5.0)
- `AIReadinessIndex` — overall maturity index
- `LowCategories` — categories with score `< 3.0`
- `HighCategories` — categories with score `> 3.5`
- `InconsistentCategories` — categories with high internal variance (optional)

---

## 3. Derived Signals

To simplify decision-making, calculate the following signals.

### 3.1 Alignment Signal
```
Alignment = avg(Strategy & Culture, Skills & Learning)
```

Indicates:
- shared understanding of AI
- leadership and cultural readiness

---

### 3.2 Engineering Depth Signal
```
EngineeringDepth = avg(
  Data & Infrastructure,
  Integration & Scaling,
  Impact Measurement
)
```

Indicates:
- ability to build, ship, and maintain AI products
- production readiness

---

### 3.3 Workflow Acceleration Signal
```
WorkflowAcceleration = avg(
  Tools & Automation,
  Integration & Scaling
)
```

Indicates:
- readiness to speed up development workflows
- maturity of current engineering practices

---

### 3.4 Experimentation Signal
```
Experimentation = avg(
  Experimentation & Innovation,
  Product & Processes
)
```

Indicates:
- intent to create AI-powered solutions
- product-oriented use of AI

---

## 4. Product 1 — AI Foundations

### Recommendation Rule
```
IF Alignment < 3.2
```
Additional signals:
- Strategy & Culture < 3.0
- Skills & Learning < 3.0
- Many neutral (3) answers
- High variance inside categories

### Interpretation
The team has no shared language or agreement about AI.
Further technical training would increase confusion and resistance.

### Value Proposition
- Aligns cross-functional teams
- Builds a shared mental model of LLMs and agents
- Enables safe first AI projects

### Risk if Ignored
Fragmented initiatives, resistance to AI, wasted effort.

---

## 5. Product 2 — AI Engineer Bootcamp

### Recommendation Rule
```
IF Alignment ≥ 3.2
AND Experimentation ≥ 3.2
AND EngineeringDepth < 3.4
```

Additional signals:
- Tools & Automation ≥ 3.5
- Data & Infrastructure < 3.2
- Impact Measurement < 3.2

### Interpretation
The team actively experiments with AI but lacks engineering discipline.
Prototypes are unlikely to scale or reach production reliably.

### Value Proposition
- End-to-end AI product engineering
- Debugging, deployment, evaluation, and metrics
- Production-ready practices

### Risk if Ignored
Technical debt, unstable systems, team burnout.

---

## 6. Product 3 — AI-Driven Software Development Workshops

### Recommendation Rule
```
IF Alignment ≥ 3.2
AND WorkflowAcceleration ≥ 3.4
AND EngineeringDepth ≥ 3.2
```

Additional signals:
- Tools & Automation ≥ 3.5
- Integration & Scaling < 3.8
- Security & Compliance ≥ 3.2

### Interpretation
The team is mature but AI is not yet embedded in daily engineering workflows.
There is an opportunity for fast, low-overhead improvement.

### Value Proposition
- Immediate productivity gains
- Agentic coding and PR workflows
- Quality control and maintenance practices

### Risk if Ignored
Local optimizations, dependency on individual experts.

---

## 7. Conflict Resolution Rules

If multiple products match:

1. **AI Foundations** — always highest priority if Alignment is low
2. **AI Engineer Bootcamp** — if building AI products without depth
3. **Workshops** — if targeting workflow acceleration

Only one primary recommendation should be shown.

---

## 8. Output Format

Final recommendation should include:

- **Product name**
- **Why this product fits the current state**
- **Main risk if no action is taken**
- **Expected outcome in 1–3 months**

Example:

> **Recommended product:** AI Engineer Bootcamp  
> **Why:** You experiment with AI but lack stable data, evaluation, and deployment practices.  
> **Risk:** Prototypes will not scale and technical debt will grow.  
> **Outcome:** Production-ready AI systems with clear ownership and metrics.

---

## 9. Design Guidelines

- Keep rules explainable and visible
- Avoid black-box ML recommendations
- Tie every upsell to a concrete category gap
- Frame recommendations as guidance, not sales pressure

---

This logic ensures that upsell feels like a diagnosis,
not a generic product pitch.
