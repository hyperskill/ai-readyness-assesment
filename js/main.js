// Main Application
let surveyManager;
let surveyUI;

// Initialize application
document.addEventListener('DOMContentLoaded', () => {
  initializeApp();
});

function initializeApp() {
  // Get section elements
  const introSection = document.getElementById('intro-section');
  const surveySection = document.getElementById('survey-section');
  const resultsSection = document.getElementById('results-section');
  
  // Get button elements
  const startBtn = document.getElementById('start-btn');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const restartBtn = document.getElementById('restart-btn');
  
  // Initialize survey manager
  surveyManager = new SurveyManager();
  surveyUI = new SurveyUI(surveyManager);
  
  // Start button handler
  startBtn.addEventListener('click', () => {
    showSection(surveySection);
    surveyUI.renderCategory();
  });
  
  // Previous button handler
  prevBtn.addEventListener('click', () => {
    if (surveyManager.previousCategory()) {
      surveyUI.renderCategory();
    }
  });
  
  // Next button handler
  nextBtn.addEventListener('click', () => {
    const isLastCategory = surveyManager.currentCategoryIndex === surveyManager.categories.length - 1;
    
    if (isLastCategory) {
      // Show results
      showResults(resultsSection);
    } else {
      // Go to next category
      if (surveyManager.nextCategory()) {
        surveyUI.renderCategory();
      }
    }
  });
  
  // Restart button handler
  restartBtn.addEventListener('click', () => {
    surveyManager.reset();
    showSection(introSection);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Show specific section
function showSection(sectionToShow) {
  const sections = document.querySelectorAll('.section');
  sections.forEach(section => {
    section.classList.remove('active');
  });
  sectionToShow.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Calculate and show results
function showResults(resultsSection) {
  // Calculate scores
  const scoringEngine = new ScoringEngine(surveyManager.responses);
  const results = scoringEngine.calculate();
  
  // Log results for debugging
  console.log('Assessment Results:', results);
  
  // Show results section
  showSection(resultsSection);
  
  // Render results
  const resultsUI = new ResultsUI(results);
  resultsUI.render();
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  const surveySection = document.getElementById('survey-section');
  
  if (!surveySection.classList.contains('active')) {
    return;
  }
  
  if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
    const prevBtn = document.getElementById('prev-btn');
    if (!prevBtn.disabled) {
      prevBtn.click();
    }
  } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
    const nextBtn = document.getElementById('next-btn');
    if (!nextBtn.disabled) {
      nextBtn.click();
    }
  }
});

// Prevent accidental page navigation
window.addEventListener('beforeunload', (e) => {
  const surveySection = document.getElementById('survey-section');
  
  if (surveySection.classList.contains('active') && surveyManager.getProgress() > 0) {
    e.preventDefault();
    e.returnValue = '';
  }
});
