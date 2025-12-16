// Scoring and Recommendation Logic

class ScoringEngine {
  constructor(responses) {
    this.responses = responses;
    this.categoryScores = {};
    this.aiNativenessIndex = 0;
    this.maturityLevel = '';
    this.signals = {};
  }

  // Calculate score for a specific category
  calculateCategoryScore(categoryId) {
    const categoryResponses = this.responses[categoryId];
    if (!categoryResponses || categoryResponses.length === 0) {
      return 0;
    }
    
    const sum = categoryResponses.reduce((acc, val) => acc + val, 0);
    return sum / categoryResponses.length;
  }

  // Calculate variance for a category
  calculateCategoryVariance(categoryId) {
    const categoryResponses = this.responses[categoryId];
    if (!categoryResponses || categoryResponses.length === 0) {
      return 0;
    }
    
    const mean = this.calculateCategoryScore(categoryId);
    const squaredDiffs = categoryResponses.map(val => Math.pow(val - mean, 2));
    const variance = squaredDiffs.reduce((acc, val) => acc + val, 0) / categoryResponses.length;
    return variance;
  }

  // Calculate all category scores
  calculateAllCategoryScores() {
    const categories = SURVEY_DATA.categories;
    
    categories.forEach(category => {
      const score = this.calculateCategoryScore(category.id);
      const variance = this.calculateCategoryVariance(category.id);
      this.categoryScores[category.id] = {
        name: category.name,
        score: score,
        variance: variance,
        isInconsistent: variance > 1.5 // High variance indicates inconsistent practices
      };
    });
    
    return this.categoryScores;
  }

  // Calculate overall AI Nativeness Index
  calculateAINativenessIndex() {
    const scores = Object.values(this.categoryScores).map(cat => cat.score);
    const sum = scores.reduce((acc, val) => acc + val, 0);
    this.aiNativenessIndex = sum / scores.length;
    return this.aiNativenessIndex;
  }

  // Convert index to percentage
  indexToPercentage(index) {
    return Math.round(((index - 1) / 4) * 100);
  }

  // Map index to maturity level
  getMaturityLevel(index) {
    if (index >= 1.0 && index <= 2.0) {
      return 'AI-Curious';
    } else if (index > 2.0 && index <= 3.0) {
      return 'AI-Enabled';
    } else if (index > 3.0 && index <= 4.0) {
      return 'AI-Driven';
    } else if (index > 4.0 && index <= 5.0) {
      return 'AI-Native';
    }
    return 'AI-Curious';
  }

  // Calculate derived signals for product recommendations
  calculateSignals() {
    const getScore = (categoryId) => this.categoryScores[categoryId]?.score || 0;

    // Alignment Signal
    this.signals.alignment = (
      getScore('strategy-culture') + 
      getScore('skills-learning')
    ) / 2;

    // Engineering Depth Signal
    this.signals.engineeringDepth = (
      getScore('data-infrastructure') + 
      getScore('integration-scaling') + 
      getScore('impact-measurement')
    ) / 3;

    // Workflow Acceleration Signal
    this.signals.workflowAcceleration = (
      getScore('tools-automation') + 
      getScore('integration-scaling')
    ) / 2;

    // Experimentation Signal
    this.signals.experimentation = (
      getScore('experimentation-innovation') + 
      getScore('product-processes')
    ) / 2;

    return this.signals;
  }

  // Determine product recommendation
  getProductRecommendation() {
    const getScore = (categoryId) => this.categoryScores[categoryId]?.score || 0;
    
    // Product 1 — AI foundations training
    // IF Alignment < 3.2
    if (this.signals.alignment < 3.2) {
      return {
        product: 'AI foundations training',
        reason: 'alignment-gap'
      };
    }

    // Product 2 — AI engineering training
    // IF Alignment ≥ 3.2 AND Experimentation ≥ 3.2 AND EngineeringDepth < 3.4
    if (this.signals.alignment >= 3.2 && 
        this.signals.experimentation >= 3.2 && 
        this.signals.engineeringDepth < 3.4) {
      return {
        product: 'AI engineering training',
        reason: 'engineering-depth-gap'
      };
    }

    // Product 3 — AI-driven software development workshops
    // IF Alignment ≥ 3.2 AND WorkflowAcceleration ≥ 3.4 AND EngineeringDepth ≥ 3.2
    if (this.signals.alignment >= 3.2 && 
        this.signals.workflowAcceleration >= 3.4 && 
        this.signals.engineeringDepth >= 3.2) {
      return {
        product: 'AI-driven software development workshops',
        reason: 'workflow-optimization'
      };
    }

    // Default fallback based on maturity level
    if (this.aiNativenessIndex < 2.5) {
      return {
        product: 'AI foundations training',
        reason: 'early-stage'
      };
    } else if (this.aiNativenessIndex < 3.5) {
      return {
        product: 'AI engineering training',
        reason: 'intermediate-stage'
      };
    } else {
      return {
        product: 'AI-driven software development workshops',
        reason: 'advanced-stage'
      };
    }
  }

  // Get strongest and weakest categories
  getCategoryInsights() {
    const sortedCategories = Object.entries(this.categoryScores)
      .map(([id, data]) => ({
        id,
        name: data.name,
        score: data.score
      }))
      .sort((a, b) => b.score - a.score);

    return {
      strongest: sortedCategories.slice(0, 3),
      weakest: sortedCategories.slice(-3).reverse()
    };
  }

  // Get category interpretation
  getCategoryInterpretation(score) {
    if (score >= 1.0 && score <= 2.0) {
      return { level: 'low', text: 'Critical gap. The area is largely unaddressed.' };
    } else if (score > 2.0 && score <= 3.0) {
      return { level: 'medium', text: 'Early stage. Awareness exists, but practices are inconsistent.' };
    } else if (score > 3.0 && score <= 4.0) {
      return { level: 'high', text: 'Operational. Practices are used, but not yet fully mature.' };
    } else if (score > 4.0 && score <= 5.0) {
      return { level: 'high', text: 'Mature. The area is embedded in team processes.' };
    }
    return { level: 'low', text: 'Area needs attention.' };
  }

  // Detect cross-category patterns
  detectCrossPatterns() {
    const getScore = (categoryId) => this.categoryScores[categoryId]?.score || 0;
    const patterns = [];

    // Pattern 1: High Tools & Low Data
    // AI is used, but without a reliable data foundation
    if (getScore('tools-automation') > 3.5 && getScore('data-infrastructure') < 3.0) {
      patterns.push({
        type: 'high-tools-low-data',
        title: 'Tools without foundation',
        description: 'AI is used actively, but without a reliable data foundation. This creates risk of unstable results and technical debt.',
        risk: 'high'
      });
    }

    // Pattern 2: High Skills & Low Strategy
    // Strong individuals without leadership alignment
    if (getScore('skills-learning') > 3.5 && getScore('strategy-culture') < 3.0) {
      patterns.push({
        type: 'high-skills-low-strategy',
        title: 'Skills without alignment',
        description: 'Individual competence exists, but without clear strategic direction. Efforts may fragment.',
        risk: 'medium'
      });
    }

    // Pattern 3: High Experimentation & Low Measurement
    // Innovation activity without proven business impact
    if (getScore('experimentation-innovation') > 3.5 && getScore('impact-measurement') < 3.0) {
      patterns.push({
        type: 'high-experiment-low-measure',
        title: 'Experiments without validation',
        description: 'Active experimentation without clear measurement. Hard to know what works and scale successes.',
        risk: 'medium'
      });
    }

    // Pattern 4: High Integration & Low Security
    // Scaling without governance
    if (getScore('integration-scaling') > 3.5 && getScore('security-compliance') < 3.0) {
      patterns.push({
        type: 'high-integration-low-security',
        title: 'Scaling without governance',
        description: 'AI solutions are being scaled, but security and compliance practices lag behind.',
        risk: 'high'
      });
    }

    return patterns;
  }

  // Main calculation method
  calculate() {
    this.calculateAllCategoryScores();
    this.calculateAINativenessIndex();
    this.maturityLevel = this.getMaturityLevel(this.aiNativenessIndex);
    this.calculateSignals();
    
    const recommendation = this.getProductRecommendation();
    const insights = this.getCategoryInsights();
    const patterns = this.detectCrossPatterns();
    
    // Get inconsistent categories
    const inconsistentCategories = Object.entries(this.categoryScores)
      .filter(([id, data]) => data.isInconsistent)
      .map(([id, data]) => ({
        id: id,
        name: data.name,
        score: data.score,
        variance: data.variance
      }));
    
    return {
      aiNativenessIndex: this.aiNativenessIndex,
      aiNativenessPercentage: this.indexToPercentage(this.aiNativenessIndex),
      maturityLevel: this.maturityLevel,
      categoryScores: this.categoryScores,
      recommendation: recommendation,
      insights: insights,
      signals: this.signals,
      patterns: patterns,
      inconsistentCategories: inconsistentCategories
    };
  }
}

// Helper function to format score
function formatScore(score) {
  return score.toFixed(1);
}

// Helper function to get score color class
function getScoreColorClass(score) {
  if (score <= 2.0) return 'low';
  if (score <= 3.0) return 'medium';
  return 'high';
}
