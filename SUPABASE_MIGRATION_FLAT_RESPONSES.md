# Database Migration: Flat Response Structure

## Overview

Instead of storing all responses in a single JSONB field, we'll create individual columns for each question response (45 columns total).

## Benefits
- Easy SQL queries and filtering
- Better for analytics and reporting
- Can create indexes on specific questions
- Clear column names describe what each question is about

## Migration SQL

Run this in Supabase SQL Editor:

```sql
-- Step 1: Add individual response columns to assessment_submissions
ALTER TABLE assessment_submissions
  -- Strategy & Culture (5 questions)
  ADD COLUMN q_strategy_leadership_communication INTEGER,
  ADD COLUMN q_strategy_role_alignment INTEGER,
  ADD COLUMN q_strategy_psychological_safety INTEGER,
  ADD COLUMN q_strategy_usage_guidance INTEGER,
  ADD COLUMN q_strategy_learning_from_failure INTEGER,
  
  -- Skills & Learning (5 questions)
  ADD COLUMN q_skills_training_opportunities INTEGER,
  ADD COLUMN q_skills_knowledge_sharing INTEGER,
  ADD COLUMN q_skills_learning_time INTEGER,
  ADD COLUMN q_skills_experimentation_support INTEGER,
  ADD COLUMN q_skills_prompt_engineering INTEGER,
  
  -- Data & Infrastructure (5 questions)
  ADD COLUMN q_data_identified_sources INTEGER,
  ADD COLUMN q_data_quality_readiness INTEGER,
  ADD COLUMN q_data_privacy_rules INTEGER,
  ADD COLUMN q_data_api_integrations INTEGER,
  ADD COLUMN q_data_infrastructure_constraints INTEGER,
  
  -- Tools & Automation (5 questions)
  ADD COLUMN q_tools_regular_usage INTEGER,
  ADD COLUMN q_tools_output_review INTEGER,
  ADD COLUMN q_tools_assistants_vs_agents INTEGER,
  ADD COLUMN q_tools_time_savings INTEGER,
  ADD COLUMN q_tools_stack_reassessment INTEGER,
  
  -- Integration & Scaling (5 questions)
  ADD COLUMN q_integration_workflow_embedding INTEGER,
  ADD COLUMN q_integration_production_deployment INTEGER,
  ADD COLUMN q_integration_error_handling INTEGER,
  ADD COLUMN q_integration_versioning INTEGER,
  ADD COLUMN q_integration_dependency_management INTEGER,
  
  -- Experimentation & Innovation (5 questions)
  ADD COLUMN q_experiment_hypothesis_testing INTEGER,
  ADD COLUMN q_experiment_failure_analysis INTEGER,
  ADD COLUMN q_experiment_incremental_approach INTEGER,
  ADD COLUMN q_experiment_rollback_capability INTEGER,
  ADD COLUMN q_experiment_sharing_learnings INTEGER,
  
  -- Product & Processes (5 questions)
  ADD COLUMN q_product_value_definition INTEGER,
  ADD COLUMN q_product_user_feedback INTEGER,
  ADD COLUMN q_product_iteration_speed INTEGER,
  ADD COLUMN q_product_quality_standards INTEGER,
  ADD COLUMN q_product_process_adaptation INTEGER,
  
  -- Ethics & Governance (5 questions)
  ADD COLUMN q_ethics_transparency INTEGER,
  ADD COLUMN q_ethics_bias_monitoring INTEGER,
  ADD COLUMN q_ethics_responsibility_ownership INTEGER,
  ADD COLUMN q_ethics_external_compliance INTEGER,
  ADD COLUMN q_ethics_regular_review INTEGER,
  
  -- Impact Measurement (5 questions)
  ADD COLUMN q_impact_success_metrics INTEGER,
  ADD COLUMN q_impact_tracking_collection INTEGER,
  ADD COLUMN q_impact_performance_comparison INTEGER,
  ADD COLUMN q_impact_roi_assessment INTEGER,
  ADD COLUMN q_impact_adjustment_based_on_data INTEGER;

-- Step 2: Add constraints to ensure valid Likert scale values (1-5)
ALTER TABLE assessment_submissions
  ADD CONSTRAINT check_response_values CHECK (
    -- Strategy & Culture
    (q_strategy_leadership_communication IS NULL OR (q_strategy_leadership_communication BETWEEN 1 AND 5)) AND
    (q_strategy_role_alignment IS NULL OR (q_strategy_role_alignment BETWEEN 1 AND 5)) AND
    (q_strategy_psychological_safety IS NULL OR (q_strategy_psychological_safety BETWEEN 1 AND 5)) AND
    (q_strategy_usage_guidance IS NULL OR (q_strategy_usage_guidance BETWEEN 1 AND 5)) AND
    (q_strategy_learning_from_failure IS NULL OR (q_strategy_learning_from_failure BETWEEN 1 AND 5)) AND
    
    -- Skills & Learning
    (q_skills_training_opportunities IS NULL OR (q_skills_training_opportunities BETWEEN 1 AND 5)) AND
    (q_skills_knowledge_sharing IS NULL OR (q_skills_knowledge_sharing BETWEEN 1 AND 5)) AND
    (q_skills_learning_time IS NULL OR (q_skills_learning_time BETWEEN 1 AND 5)) AND
    (q_skills_experimentation_support IS NULL OR (q_skills_experimentation_support BETWEEN 1 AND 5)) AND
    (q_skills_prompt_engineering IS NULL OR (q_skills_prompt_engineering BETWEEN 1 AND 5)) AND
    
    -- Data & Infrastructure
    (q_data_identified_sources IS NULL OR (q_data_identified_sources BETWEEN 1 AND 5)) AND
    (q_data_quality_readiness IS NULL OR (q_data_quality_readiness BETWEEN 1 AND 5)) AND
    (q_data_privacy_rules IS NULL OR (q_data_privacy_rules BETWEEN 1 AND 5)) AND
    (q_data_api_integrations IS NULL OR (q_data_api_integrations BETWEEN 1 AND 5)) AND
    (q_data_infrastructure_constraints IS NULL OR (q_data_infrastructure_constraints BETWEEN 1 AND 5)) AND
    
    -- Tools & Automation
    (q_tools_regular_usage IS NULL OR (q_tools_regular_usage BETWEEN 1 AND 5)) AND
    (q_tools_output_review IS NULL OR (q_tools_output_review BETWEEN 1 AND 5)) AND
    (q_tools_assistants_vs_agents IS NULL OR (q_tools_assistants_vs_agents BETWEEN 1 AND 5)) AND
    (q_tools_time_savings IS NULL OR (q_tools_time_savings BETWEEN 1 AND 5)) AND
    (q_tools_stack_reassessment IS NULL OR (q_tools_stack_reassessment BETWEEN 1 AND 5)) AND
    
    -- Integration & Scaling
    (q_integration_workflow_embedding IS NULL OR (q_integration_workflow_embedding BETWEEN 1 AND 5)) AND
    (q_integration_production_deployment IS NULL OR (q_integration_production_deployment BETWEEN 1 AND 5)) AND
    (q_integration_error_handling IS NULL OR (q_integration_error_handling BETWEEN 1 AND 5)) AND
    (q_integration_versioning IS NULL OR (q_integration_versioning BETWEEN 1 AND 5)) AND
    (q_integration_dependency_management IS NULL OR (q_integration_dependency_management BETWEEN 1 AND 5)) AND
    
    -- Experimentation & Innovation
    (q_experiment_hypothesis_testing IS NULL OR (q_experiment_hypothesis_testing BETWEEN 1 AND 5)) AND
    (q_experiment_failure_analysis IS NULL OR (q_experiment_failure_analysis BETWEEN 1 AND 5)) AND
    (q_experiment_incremental_approach IS NULL OR (q_experiment_incremental_approach BETWEEN 1 AND 5)) AND
    (q_experiment_rollback_capability IS NULL OR (q_experiment_rollback_capability BETWEEN 1 AND 5)) AND
    (q_experiment_sharing_learnings IS NULL OR (q_experiment_sharing_learnings BETWEEN 1 AND 5)) AND
    
    -- Product & Processes
    (q_product_value_definition IS NULL OR (q_product_value_definition BETWEEN 1 AND 5)) AND
    (q_product_user_feedback IS NULL OR (q_product_user_feedback BETWEEN 1 AND 5)) AND
    (q_product_iteration_speed IS NULL OR (q_product_iteration_speed BETWEEN 1 AND 5)) AND
    (q_product_quality_standards IS NULL OR (q_product_quality_standards BETWEEN 1 AND 5)) AND
    (q_product_process_adaptation IS NULL OR (q_product_process_adaptation BETWEEN 1 AND 5)) AND
    
    -- Ethics & Governance
    (q_ethics_transparency IS NULL OR (q_ethics_transparency BETWEEN 1 AND 5)) AND
    (q_ethics_bias_monitoring IS NULL OR (q_ethics_bias_monitoring BETWEEN 1 AND 5)) AND
    (q_ethics_responsibility_ownership IS NULL OR (q_ethics_responsibility_ownership BETWEEN 1 AND 5)) AND
    (q_ethics_external_compliance IS NULL OR (q_ethics_external_compliance BETWEEN 1 AND 5)) AND
    (q_ethics_regular_review IS NULL OR (q_ethics_regular_review BETWEEN 1 AND 5)) AND
    
    -- Impact Measurement
    (q_impact_success_metrics IS NULL OR (q_impact_success_metrics BETWEEN 1 AND 5)) AND
    (q_impact_tracking_collection IS NULL OR (q_impact_tracking_collection BETWEEN 1 AND 5)) AND
    (q_impact_performance_comparison IS NULL OR (q_impact_performance_comparison BETWEEN 1 AND 5)) AND
    (q_impact_roi_assessment IS NULL OR (q_impact_roi_assessment BETWEEN 1 AND 5)) AND
    (q_impact_adjustment_based_on_data IS NULL OR (q_impact_adjustment_based_on_data BETWEEN 1 AND 5))
  );

-- Step 3: Create indexes on commonly queried questions (optional)
CREATE INDEX idx_strategy_leadership ON assessment_submissions(q_strategy_leadership_communication);
CREATE INDEX idx_tools_regular_usage ON assessment_submissions(q_tools_regular_usage);
CREATE INDEX idx_impact_metrics ON assessment_submissions(q_impact_success_metrics);

-- Step 4: Keep the old 'responses' column for backward compatibility
-- (Don't drop it - we can migrate old data later if needed)
-- ALTER TABLE assessment_submissions DROP COLUMN responses; -- Don't run this yet!
```

## Column Naming Convention

Format: `q_{category}_{topic}`

Examples:
- `q_strategy_leadership_communication` = Strategy & Culture, Question 1
- `q_skills_training_opportunities` = Skills & Learning, Question 1
- `q_tools_regular_usage` = Tools & Automation, Question 1

## Question Mapping

| Category | Column Prefix | Questions |
|----------|--------------|-----------|
| Strategy & Culture | `q_strategy_` | leadership_communication, role_alignment, psychological_safety, usage_guidance, learning_from_failure |
| Skills & Learning | `q_skills_` | training_opportunities, knowledge_sharing, learning_time, experimentation_support, prompt_engineering |
| Data & Infrastructure | `q_data_` | identified_sources, quality_readiness, privacy_rules, api_integrations, infrastructure_constraints |
| Tools & Automation | `q_tools_` | regular_usage, output_review, assistants_vs_agents, time_savings, stack_reassessment |
| Integration & Scaling | `q_integration_` | workflow_embedding, production_deployment, error_handling, versioning, dependency_management |
| Experimentation & Innovation | `q_experiment_` | hypothesis_testing, failure_analysis, incremental_approach, rollback_capability, sharing_learnings |
| Product & Processes | `q_product_` | value_definition, user_feedback, iteration_speed, quality_standards, process_adaptation |
| Ethics & Governance | `q_ethics_` | transparency, bias_monitoring, responsibility_ownership, external_compliance, regular_review |
| Impact Measurement | `q_impact_` | success_metrics, tracking_collection, performance_comparison, roi_assessment, adjustment_based_on_data |

## Example Queries After Migration

```sql
-- Get all responses where strategy leadership communication is low
SELECT email, q_strategy_leadership_communication, created_at
FROM assessment_submissions
WHERE q_strategy_leadership_communication <= 2;

-- Average score per question
SELECT 
  AVG(q_strategy_leadership_communication) as avg_leadership,
  AVG(q_tools_regular_usage) as avg_tool_usage,
  AVG(q_impact_success_metrics) as avg_metrics
FROM assessment_submissions;

-- Find teams with high tool usage but low impact measurement
SELECT email, 
  q_tools_regular_usage,
  q_impact_success_metrics,
  created_at
FROM assessment_submissions
WHERE q_tools_regular_usage >= 4 
  AND q_impact_success_metrics <= 2;
```

## Migration Steps

1. **Backup your data** (Supabase does this automatically, but good to check)
2. Run the migration SQL in Supabase SQL Editor
3. Update application code to save to new columns
4. Test with new submissions
5. (Optional) Migrate old JSONB data to new columns
6. (Future) Drop old `responses` column when fully migrated
