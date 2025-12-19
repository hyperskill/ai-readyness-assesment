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

  // Get diffusion curve segment based on percentage score
  getDiffusionSegment(percentage) {
    if (percentage < 15) {
      return {
        segment: 'Laggards',
        percentile: 85,
        description: 'Just beginning to explore AI possibilities',
        marketPosition: 'bottom 15%'
      };
    } else if (percentage < 35) {
      return {
        segment: 'Late Majority',
        percentile: 65,
        description: 'Adopting AI cautiously, following proven patterns',
        marketPosition: 'bottom 35%'
      };
    } else if (percentage < 65) {
      return {
        segment: 'Early Majority',
        percentile: 50,
        description: 'Systematically building AI capabilities',
        marketPosition: 'middle 50%'
      };
    } else if (percentage < 85) {
      return {
        segment: 'Early Adopters',
        percentile: 20,
        description: 'Leading AI adoption in your industry',
        marketPosition: 'top 25%'
      };
    } else {
      return {
        segment: 'Innovators',
        percentile: 5,
        description: 'Pioneering new AI practices and approaches',
        marketPosition: 'top 10%'
      };
    }
  }

  // Get qualitative strengths (top 3 categories with context)
  getQualitativeStrengths() {
    const sortedCategories = Object.entries(this.categoryScores)
      .map(([id, data]) => ({
        id,
        name: data.name,
        score: data.score
      }))
      .sort((a, b) => b.score - a.score);

    const strengths = sortedCategories.slice(0, 3)
      .filter(cat => cat.score >= 3.0)
      .map(cat => ({
        name: cat.name,
        score: cat.score,
        interpretation: this.getStrengthInterpretation(cat.id, cat.score),
        impact: this.getStrengthImpact(cat.id)
      }));

    return strengths;
  }

  // Get qualitative constraints (bottom 3 categories with context)
  getQualitativeConstraints() {
    const sortedCategories = Object.entries(this.categoryScores)
      .map(([id, data]) => ({
        id,
        name: data.name,
        score: data.score
      }))
      .sort((a, b) => a.score - b.score);

    const constraints = sortedCategories.slice(0, 3)
      .filter(cat => cat.score < 3.5)
      .map(cat => ({
        name: cat.name,
        score: cat.score,
        interpretation: this.getConstraintInterpretation(cat.id, cat.score),
        impact: this.getConstraintImpact(cat.id),
        cost: this.getConstraintCost(cat.id)
      }));

    return constraints;
  }

  // Get strength interpretation for a category
  getStrengthInterpretation(categoryId, score) {
    const interpretations = {
      'strategy-culture': 'Your team has clear direction and leadership support for AI initiatives',
      'data-infrastructure': 'You have reliable data foundation that AI can depend on',
      'tools-automation': 'Your team actively uses AI in daily work and workflows',
      'skills-learning': 'Team members are developing AI skills and knowledge',
      'product-processes': 'AI is being integrated into your products and processes',
      'security-compliance': 'You\'re thinking about AI risks and governance early',
      'experimentation-innovation': 'Your team actively tries new AI approaches and learns from them',
      'integration-scaling': 'You\'re successfully scaling AI solutions beyond prototypes',
      'impact-measurement': 'You track and measure the impact of AI initiatives'
    };

    return interpretations[categoryId] || 'This area is working well';
  }

  // Get strength impact for a category
  getStrengthImpact(categoryId) {
    const impacts = {
      'strategy-culture': 'This creates momentum and clear priorities',
      'data-infrastructure': 'This enables reliable AI solutions',
      'tools-automation': 'This builds practical experience and confidence',
      'skills-learning': 'This creates capacity and capability',
      'product-processes': 'This delivers real business value',
      'security-compliance': 'This prevents costly problems later',
      'experimentation-innovation': 'This drives learning and innovation',
      'integration-scaling': 'This multiplies AI benefits across the organization',
      'impact-measurement': 'This enables data-driven decisions and proves value'
    };

    return impacts[categoryId] || 'This creates positive outcomes';
  }

  // Get constraint interpretation for a category
  getConstraintInterpretation(categoryId, score) {
    const interpretations = {
      'strategy-culture': 'Experiments don\'t scale; teams move in different directions',
      'data-infrastructure': 'AI works in demos but breaks in production',
      'tools-automation': 'Limited practical experience with AI tools',
      'skills-learning': 'Knowledge gaps limit what the team can accomplish',
      'product-processes': 'AI remains separate from core work',
      'security-compliance': 'AI usage creates unmanaged risks',
      'experimentation-innovation': 'Limited learning from AI experiments',
      'integration-scaling': 'AI solutions stay isolated and small-scale',
      'impact-measurement': 'Hard to know what\'s working; difficult to justify investment'
    };

    return interpretations[categoryId] || 'This area needs attention';
  }

  // Get constraint impact for a category
  getConstraintImpact(categoryId) {
    const impacts = {
      'strategy-culture': 'Individual teams are experimenting, but there\'s no shared direction',
      'data-infrastructure': 'AI solutions are fragile and hard to maintain',
      'tools-automation': 'Team works manually where AI could help',
      'skills-learning': 'Dependency on a few individuals; uneven capabilities',
      'product-processes': 'Missing opportunities to improve products with AI',
      'security-compliance': 'Risk of incidents, compliance issues, or data leaks',
      'experimentation-innovation': 'Team doesn\'t learn fast enough from AI experiments',
      'integration-scaling': 'AI value stays limited; hard to scale successes',
      'impact-measurement': 'Can\'t prioritize; hard to get stakeholder buy-in'
    };

    return impacts[categoryId] || 'This limits your AI progress';
  }

  // Get constraint cost for a category
  getConstraintCost(categoryId) {
    const costs = {
      'strategy-culture': 'Duplicated effort, inconsistent quality, slow decisions',
      'data-infrastructure': 'Re-work, fragile systems, limited trust in AI',
      'tools-automation': 'Lower productivity, manual work, slower delivery',
      'skills-learning': 'Can\'t tackle complex problems, dependent on vendors',
      'product-processes': 'Competitive disadvantage, missed revenue opportunities',
      'security-compliance': 'Potential incidents, regulatory penalties, reputation damage',
      'experimentation-innovation': 'Slow progress, repeat mistakes, wasted effort',
      'integration-scaling': 'Limited ROI, AI stays in pilot purgatory',
      'impact-measurement': 'Can\'t defend budget, hard to improve, unclear priorities'
    };

    return costs[categoryId] || 'This creates hidden costs';
  }

  // Identify overall pattern in team profile
  getOverallPattern() {
    const avgStrengthScore = this.getQualitativeStrengths()
      .reduce((sum, s) => sum + s.score, 0) / 3 || 0;
    const avgConstraintScore = this.getQualitativeConstraints()
      .reduce((sum, c) => sum + c.score, 0) / 3 || 0;
    
    const getScore = (categoryId) => this.categoryScores[categoryId]?.score || 0;
    const strategyScore = getScore('strategy-culture');
    const skillsScore = getScore('skills-learning');
    const toolsScore = getScore('tools-automation');

    if (skillsScore > 3.5 && strategyScore < 2.8) {
      return {
        title: 'High individual energy + Low organizational structure = Fragile progress',
        description: 'This is common for teams at your stage. The good news is that you have the raw ingredients (skills, interest). The opportunity is to add structure around them.'
      };
    } else if (toolsScore > 3.5 && getScore('data-infrastructure') < 2.8) {
      return {
        title: 'Active tool usage + Weak foundation = Technical debt risk',
        description: 'Your team is using AI actively, but the underlying infrastructure isn\'t keeping up. This creates risk of brittle solutions that are hard to maintain.'
      };
    } else if (avgConstraintScore < 2.5) {
      return {
        title: 'Early exploration phase',
        description: 'You\'re at the beginning of the AI journey. The key now is to build foundations: alignment, skills, and basic practices before scaling up.'
      };
    } else if (avgStrengthScore > 3.8) {
      return {
        title: 'Strong foundation in place',
        description: 'You have solid capabilities across multiple areas. The opportunity is to scale what\'s working and address remaining gaps systematically.'
      };
    } else {
      return {
        title: 'Building AI capabilities systematically',
        description: 'You\'re making progress across multiple dimensions. The key is to maintain momentum while addressing the specific gaps that hold you back.'
      };
    }
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
    const percentage = this.indexToPercentage(this.aiNativenessIndex);
    
    // Get inconsistent categories
    const inconsistentCategories = Object.entries(this.categoryScores)
      .filter(([id, data]) => data.isInconsistent)
      .map(([id, data]) => ({
        id: id,
        name: data.name,
        score: data.score,
        variance: data.variance
      }));
    
    // NEW: Get contextual insights
    const diffusionSegment = this.getDiffusionSegment(percentage);
    const strengths = this.getQualitativeStrengths();
    const constraints = this.getQualitativeConstraints();
    const overallPattern = this.getOverallPattern();
    
    return {
      aiNativenessIndex: this.aiNativenessIndex,
      aiNativenessPercentage: percentage,
      maturityLevel: this.maturityLevel,
      categoryScores: this.categoryScores,
      recommendation: recommendation,
      insights: insights,
      signals: this.signals,
      patterns: patterns,
      inconsistentCategories: inconsistentCategories,
      // NEW: Contextual data
      diffusionSegment: diffusionSegment,
      strengths: strengths,
      constraints: constraints,
      overallPattern: overallPattern
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
