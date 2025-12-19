// Survey Flow Management

class SurveyManager {
  constructor() {
    this.currentCategoryIndex = 0;
    this.responses = {};
    this.categories = SURVEY_DATA.categories;
    
    // Initialize responses object
    this.categories.forEach(category => {
      this.responses[category.id] = new Array(category.questions.length).fill(null);
    });
  }

  // Get current category
  getCurrentCategory() {
    return this.categories[this.currentCategoryIndex];
  }

  // Check if all questions in current category are answered
  isCurrentCategoryComplete() {
    const currentCategory = this.getCurrentCategory();
    const categoryResponses = this.responses[currentCategory.id];
    return categoryResponses.every(response => response !== null);
  }

  // Check if all questions are answered
  isAllComplete() {
    return Object.values(this.responses).every(categoryResponses => 
      categoryResponses.every(response => response !== null)
    );
  }

  // Save response for a question
  saveResponse(categoryId, questionIndex, value) {
    if (this.responses[categoryId]) {
      this.responses[categoryId][questionIndex] = value;
    }
  }

  // Get response for a question
  getResponse(categoryId, questionIndex) {
    return this.responses[categoryId]?.[questionIndex];
  }

  // Navigate to next category
  nextCategory() {
    if (this.currentCategoryIndex < this.categories.length - 1) {
      this.currentCategoryIndex++;
      return true;
    }
    return false;
  }

  // Navigate to previous category
  previousCategory() {
    if (this.currentCategoryIndex > 0) {
      this.currentCategoryIndex--;
      return true;
    }
    return false;
  }

  // Get progress percentage
  getProgress() {
    const totalQuestions = this.categories.length * 5;
    let answeredQuestions = 0;
    
    Object.values(this.responses).forEach(categoryResponses => {
      answeredQuestions += categoryResponses.filter(r => r !== null).length;
    });
    
    return Math.round((answeredQuestions / totalQuestions) * 100);
  }

  // Reset survey
  reset() {
    this.currentCategoryIndex = 0;
    this.categories.forEach(category => {
      this.responses[category.id] = new Array(category.questions.length).fill(null);
    });
  }
}

// UI Manager for Survey
class SurveyUI {
  constructor(surveyManager) {
    this.manager = surveyManager;
    this.initializeElements();
  }

  initializeElements() {
    // Survey elements
    this.categoryTitleEl = document.getElementById('category-title');
    this.categoryDescriptionEl = document.getElementById('category-description');
    this.questionsContainerEl = document.getElementById('questions-container');
    this.progressFillEl = document.getElementById('progress-fill');
    this.currentCategoryEl = document.getElementById('current-category');
    this.progressPercentageEl = document.getElementById('progress-percentage');
    this.prevBtn = document.getElementById('prev-btn');
    this.nextBtn = document.getElementById('next-btn');
  }

  // Render current category
  renderCategory() {
    const category = this.manager.getCurrentCategory();
    const categoryIndex = this.manager.currentCategoryIndex;
    
    // Update category title
    this.categoryTitleEl.textContent = category.name;
    
    // Update category description
    if (this.categoryDescriptionEl && category.description) {
      this.categoryDescriptionEl.textContent = category.description;
    }
    
    // Update progress text
    this.currentCategoryEl.textContent = `Category ${categoryIndex + 1} of ${this.manager.categories.length}`;
    
    // Render questions
    this.questionsContainerEl.innerHTML = '';
    category.questions.forEach((question, qIndex) => {
      const questionEl = this.createQuestionElement(category.id, question, qIndex);
      this.questionsContainerEl.appendChild(questionEl);
    });
    
    // Update navigation buttons
    this.updateNavigationButtons();
    
    // Update progress bar
    this.updateProgress();
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Create question element
  createQuestionElement(categoryId, questionText, questionIndex) {
    const questionDiv = document.createElement('div');
    questionDiv.className = 'question-item';
    
    const questionTextEl = document.createElement('div');
    questionTextEl.className = 'question-text';
    questionTextEl.textContent = questionText;
    
    const likertScaleEl = document.createElement('div');
    likertScaleEl.className = 'likert-scale';
    
    LIKERT_SCALE.forEach(option => {
      const optionDiv = document.createElement('div');
      optionDiv.className = 'likert-option';
      
      const input = document.createElement('input');
      input.type = 'radio';
      input.name = `${categoryId}-q${questionIndex}`;
      input.value = option.value;
      input.id = `${categoryId}-q${questionIndex}-${option.value}`;
      
      // Check if this option was previously selected
      const savedResponse = this.manager.getResponse(categoryId, questionIndex);
      if (savedResponse === option.value) {
        input.checked = true;
      }
      
      input.addEventListener('change', () => {
        this.manager.saveResponse(categoryId, questionIndex, option.value);
        this.updateNavigationButtons();
        this.updateProgress();
      });
      
      const label = document.createElement('label');
      label.className = 'likert-label';
      label.htmlFor = input.id;
      label.textContent = option.label;
      label.title = option.description;
      
      optionDiv.appendChild(input);
      optionDiv.appendChild(label);
      likertScaleEl.appendChild(optionDiv);
    });
    
    // Add scale labels
    const scaleLabelsEl = document.createElement('div');
    scaleLabelsEl.className = 'scale-labels';
    scaleLabelsEl.innerHTML = `
      <span>${LIKERT_SCALE[0].description}</span>
      <span>${LIKERT_SCALE[4].description}</span>
    `;
    
    questionDiv.appendChild(questionTextEl);
    questionDiv.appendChild(likertScaleEl);
    questionDiv.appendChild(scaleLabelsEl);
    
    return questionDiv;
  }

  // Update navigation buttons
  updateNavigationButtons() {
    // Previous button
    this.prevBtn.disabled = this.manager.currentCategoryIndex === 0;
    
    // Next button
    const isLastCategory = this.manager.currentCategoryIndex === this.manager.categories.length - 1;
    const isCategoryComplete = this.manager.isCurrentCategoryComplete();
    
    if (isLastCategory) {
      this.nextBtn.textContent = 'View Results';
      this.nextBtn.disabled = !isCategoryComplete;
    } else {
      this.nextBtn.textContent = 'Next Category';
      this.nextBtn.disabled = !isCategoryComplete;
    }
  }

  // Update progress bar
  updateProgress() {
    const progress = this.manager.getProgress();
    this.progressFillEl.style.width = `${progress}%`;
    this.progressPercentageEl.textContent = `${progress}%`;
  }
}

// Results UI Manager
class ResultsUI {
  constructor(scoringResults) {
    this.results = scoringResults;
    this.initializeElements();
  }

  initializeElements() {
    this.nativenessPercentageEl = document.getElementById('nativeness-percentage');
    this.nativenessLevelEl = document.getElementById('nativeness-level');
    this.scoreCircleEl = document.getElementById('score-circle');
    this.levelDescriptionEl = document.getElementById('level-description-text');
    this.categoryChartEl = document.getElementById('category-chart');
    this.recommendedProductEl = document.getElementById('recommended-product');
    this.recommendationTextEl = document.getElementById('recommendation-text');
    this.patternsSectionEl = document.getElementById('patterns-section');
    this.patternsContainerEl = document.getElementById('patterns-container');
    this.inconsistencySectionEl = document.getElementById('inconsistency-section');
    this.inconsistencyContainerEl = document.getElementById('inconsistency-container');
  }

  // Render all results
  render() {
    this.renderScoreCircle();
    this.renderLevelDescription();
    this.renderCategoryChart();
    this.renderPatterns();
    this.renderInconsistencies();
    this.renderRecommendation();
  }

  // Render score circle with animation
  renderScoreCircle() {
    const percentage = this.results.aiNativenessPercentage;
    const level = this.results.maturityLevel;
    
    this.nativenessPercentageEl.textContent = `${percentage}%`;
    this.nativenessLevelEl.textContent = level;
    
    // Animate circle
    const circumference = 2 * Math.PI * 90;
    const offset = circumference - (percentage / 100) * circumference;
    
    setTimeout(() => {
      this.scoreCircleEl.style.strokeDashoffset = offset;
      this.scoreCircleEl.style.transition = 'stroke-dashoffset 1.5s ease';
    }, 100);
  }

  // Render level description
  renderLevelDescription() {
    const description = LEVEL_DESCRIPTIONS[this.results.maturityLevel];
    this.levelDescriptionEl.textContent = description;
  }

  // Render category breakdown chart
  renderCategoryChart() {
    this.categoryChartEl.innerHTML = '';
    
    Object.entries(this.results.categoryScores).forEach(([id, data]) => {
      const categoryItem = document.createElement('div');
      categoryItem.className = 'category-item';
      
      const categoryName = document.createElement('div');
      categoryName.className = 'category-name';
      categoryName.textContent = data.name;
      
      const categoryBar = document.createElement('div');
      categoryBar.className = 'category-bar';
      
      const categoryBarFill = document.createElement('div');
      categoryBarFill.className = `category-bar-fill ${getScoreColorClass(data.score)}`;
      categoryBarFill.textContent = formatScore(data.score);
      
      // Animate bar width
      setTimeout(() => {
        categoryBarFill.style.width = `${(data.score / 5) * 100}%`;
      }, 100);
      
      categoryBar.appendChild(categoryBarFill);
      categoryItem.appendChild(categoryName);
      categoryItem.appendChild(categoryBar);
      this.categoryChartEl.appendChild(categoryItem);
    });
  }

  // Render cross-category patterns
  renderPatterns() {
    const patterns = this.results.patterns || [];
    
    if (patterns.length === 0) {
      this.patternsSectionEl.style.display = 'none';
      return;
    }
    
    this.patternsSectionEl.style.display = 'block';
    this.patternsContainerEl.innerHTML = '';
    
    patterns.forEach(pattern => {
      const patternCard = document.createElement('div');
      patternCard.className = `pattern-card risk-${pattern.risk}`;
      
      patternCard.innerHTML = `
        <div class="pattern-icon">⚠️</div>
        <div class="pattern-content">
          <h3>${pattern.title}</h3>
          <p>${pattern.description}</p>
        </div>
      `;
      
      this.patternsContainerEl.appendChild(patternCard);
    });
  }

  // Render inconsistent categories
  renderInconsistencies() {
    const inconsistent = this.results.inconsistentCategories || [];
    
    if (inconsistent.length === 0) {
      this.inconsistencySectionEl.style.display = 'none';
      return;
    }
    
    this.inconsistencySectionEl.style.display = 'block';
    this.inconsistencyContainerEl.innerHTML = '';
    
    inconsistent.forEach(category => {
      const inconsistencyCard = document.createElement('div');
      inconsistencyCard.className = 'inconsistency-card';
      
      inconsistencyCard.innerHTML = `
        <div class="inconsistency-header">
          <strong>${category.name}</strong>
          <span class="variance-badge">Variance: ${category.variance.toFixed(2)}</span>
        </div>
        <p class="inconsistency-explanation">
          Responses in this category varied significantly, suggesting that practices may depend on individuals rather than being standardized across the team.
        </p>
      `;
      
      this.inconsistencyContainerEl.appendChild(inconsistencyCard);
    });
  }

  // Render product recommendation
  renderRecommendation() {
    const productName = this.results.recommendation.product;
    const productInfo = PRODUCT_DESCRIPTIONS[productName];
    
    this.recommendedProductEl.textContent = productInfo.name;
    
    this.recommendationTextEl.innerHTML = `
      <p>${productInfo.description}</p>
      <p><strong>Why this helps:</strong><br>${productInfo.why}</p>
      <p><strong>What will change:</strong><br>${productInfo.change}</p>
    `;
  }
}
