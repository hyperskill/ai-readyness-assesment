import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

let supabase = null;

// Check if Supabase is configured
export const isSupabaseConfigured = () => {
  return !!(supabaseUrl && supabaseServiceKey);
};

// Initialize Supabase client (only if configured)
if (isSupabaseConfigured()) {
  supabase = createClient(supabaseUrl, supabaseServiceKey);
  console.log('✓ Supabase client initialized');
} else {
  console.log('⚠ Supabase not configured - data will only be logged to console');
  console.log('  To enable database storage, set SUPABASE_URL and SUPABASE_SERVICE_KEY in .env');
}

/**
 * Map responses object to flat database columns
 */
function flattenResponses(responses) {
  const flattened = {};
  
  // Strategy & Culture
  if (responses['strategy-culture']) {
    flattened.q_strategy_leadership_communication = responses['strategy-culture'][0];
    flattened.q_strategy_role_alignment = responses['strategy-culture'][1];
    flattened.q_strategy_psychological_safety = responses['strategy-culture'][2];
    flattened.q_strategy_usage_guidance = responses['strategy-culture'][3];
    flattened.q_strategy_learning_from_failure = responses['strategy-culture'][4];
  }
  
  // Skills & Learning
  if (responses['skills-learning']) {
    flattened.q_skills_training_opportunities = responses['skills-learning'][0];
    flattened.q_skills_knowledge_sharing = responses['skills-learning'][1];
    flattened.q_skills_learning_time = responses['skills-learning'][2];
    flattened.q_skills_experimentation_support = responses['skills-learning'][3];
    flattened.q_skills_prompt_engineering = responses['skills-learning'][4];
  }
  
  // Data & Infrastructure
  if (responses['data-infrastructure']) {
    flattened.q_data_identified_sources = responses['data-infrastructure'][0];
    flattened.q_data_quality_readiness = responses['data-infrastructure'][1];
    flattened.q_data_privacy_rules = responses['data-infrastructure'][2];
    flattened.q_data_api_integrations = responses['data-infrastructure'][3];
    flattened.q_data_infrastructure_constraints = responses['data-infrastructure'][4];
  }
  
  // Tools & Automation
  if (responses['tools-automation']) {
    flattened.q_tools_regular_usage = responses['tools-automation'][0];
    flattened.q_tools_output_review = responses['tools-automation'][1];
    flattened.q_tools_assistants_vs_agents = responses['tools-automation'][2];
    flattened.q_tools_time_savings = responses['tools-automation'][3];
    flattened.q_tools_stack_reassessment = responses['tools-automation'][4];
  }
  
  // Integration & Scaling
  if (responses['integration-scaling']) {
    flattened.q_integration_workflow_embedding = responses['integration-scaling'][0];
    flattened.q_integration_production_deployment = responses['integration-scaling'][1];
    flattened.q_integration_error_handling = responses['integration-scaling'][2];
    flattened.q_integration_versioning = responses['integration-scaling'][3];
    flattened.q_integration_dependency_management = responses['integration-scaling'][4];
  }
  
  // Experimentation & Innovation
  if (responses['experimentation-innovation']) {
    flattened.q_experiment_hypothesis_testing = responses['experimentation-innovation'][0];
    flattened.q_experiment_failure_analysis = responses['experimentation-innovation'][1];
    flattened.q_experiment_incremental_approach = responses['experimentation-innovation'][2];
    flattened.q_experiment_rollback_capability = responses['experimentation-innovation'][3];
    flattened.q_experiment_sharing_learnings = responses['experimentation-innovation'][4];
  }
  
  // Product & Processes
  if (responses['product-processes']) {
    flattened.q_product_value_definition = responses['product-processes'][0];
    flattened.q_product_user_feedback = responses['product-processes'][1];
    flattened.q_product_iteration_speed = responses['product-processes'][2];
    flattened.q_product_quality_standards = responses['product-processes'][3];
    flattened.q_product_process_adaptation = responses['product-processes'][4];
  }
  
  // Security & Compliance (was ethics-governance in migration, but security-compliance in data.js)
  if (responses['security-compliance']) {
    flattened.q_ethics_transparency = responses['security-compliance'][0];
    flattened.q_ethics_bias_monitoring = responses['security-compliance'][1];
    flattened.q_ethics_responsibility_ownership = responses['security-compliance'][2];
    flattened.q_ethics_external_compliance = responses['security-compliance'][3];
    flattened.q_ethics_regular_review = responses['security-compliance'][4];
  }
  
  // Impact Measurement
  if (responses['impact-measurement']) {
    flattened.q_impact_success_metrics = responses['impact-measurement'][0];
    flattened.q_impact_tracking_collection = responses['impact-measurement'][1];
    flattened.q_impact_performance_comparison = responses['impact-measurement'][2];
    flattened.q_impact_roi_assessment = responses['impact-measurement'][3];
    flattened.q_impact_adjustment_based_on_data = responses['impact-measurement'][4];
  }
  
  return flattened;
}

/**
 * Save assessment to Supabase
 * Creates both result and submission records
 */
export async function saveAssessment(email, responses, results, metadata = {}) {
  if (!supabase) {
    throw new Error('Supabase client not initialized');
  }

  try {
    // 1. First, insert the results with all insights
    const { data: resultData, error: resultError } = await supabase
      .from('assessment_results')
      .insert({
        overall_score: results.overallScore,
        maturity_level: results.maturityLevel,
        category_scores: results.categoryScores,
        recommendations: results.recommendations || [],
        maturity_description: results.maturityDescription || null,
        recommendations_text: results.recommendationsText || null,
        // NEW: Add insights columns
        diffusion_segment: results.diffusionSegment?.segment || null,
        diffusion_description: results.diffusionSegment?.description || null,
        market_position: results.diffusionSegment?.marketPosition || null,
        overall_pattern_title: results.overallPattern?.title || null,
        overall_pattern_description: results.overallPattern?.description || null,
        strengths: results.strengths || [],
        constraints: results.constraints || [],
        patterns: results.patterns || [],
        category_insights: results.insights || {},
        inconsistent_categories: results.inconsistentCategories || []
      })
      .select()
      .single();

    if (resultError) {
      throw new Error(`Failed to insert result: ${resultError.message}`);
    }

    console.log('✓ Result saved with ID:', resultData.id);

    // 2. Flatten responses to individual columns
    const flattenedResponses = flattenResponses(responses);

    // 3. Then, insert the submission with result_id reference and flat responses
    const { data: submissionData, error: submissionError } = await supabase
      .from('assessment_submissions')
      .insert({
        email: email || null,
        responses: responses, // Keep JSON for backward compatibility
        ...flattenedResponses, // Spread flat responses into individual columns
        result_id: resultData.id,
        user_agent: metadata.userAgent || null,
        ip_address: metadata.ipAddress || null
      })
      .select()
      .single();

    if (submissionError) {
      throw new Error(`Failed to insert submission: ${submissionError.message}`);
    }

    console.log('✓ Submission saved with ID:', submissionData.id);

    return {
      success: true,
      resultId: resultData.id,
      submissionId: submissionData.id
    };

  } catch (error) {
    console.error('Error saving to Supabase:', error);
    throw error;
  }
}

/**
 * Get all submissions (optional - for future analytics)
 */
export async function getSubmissions(limit = 100) {
  if (!supabase) {
    throw new Error('Supabase client not initialized');
  }

  const { data, error } = await supabase
    .from('assessment_submissions')
    .select(`
      *,
      assessment_results (
        overall_score,
        maturity_level,
        category_scores,
        recommendations
      )
    `)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    throw new Error(`Failed to fetch submissions: ${error.message}`);
  }

  return data;
}

/**
 * Get submissions by email (optional - for future user history)
 */
export async function getSubmissionsByEmail(email) {
  if (!supabase) {
    throw new Error('Supabase client not initialized');
  }

  const { data, error } = await supabase
    .from('assessment_submissions')
    .select(`
      *,
      assessment_results (
        overall_score,
        maturity_level,
        category_scores,
        recommendations
      )
    `)
    .eq('email', email)
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch submissions: ${error.message}`);
  }

  return data;
}

export default supabase;
