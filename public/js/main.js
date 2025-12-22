// Main Application
let surveyManager;
let surveyUI;
let userEmail = null;

// Initialize application
document.addEventListener('DOMContentLoaded', () => {
  initializeApp();
});

function initializeApp() {
  // Get section elements
  const introSection = document.getElementById('intro-section');
  const surveySection = document.getElementById('survey-section');
  const resultsSection = document.getElementById('results-section');
  const emailGateModal = document.getElementById('email-gate-modal');
  
  // Get button elements
  const startBtn = document.getElementById('start-btn');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const restartBtn = document.getElementById('restart-btn');
  const submitEmailBtn = document.getElementById('submit-email-btn');
  
  // Get email inputs
  const introEmailInput = document.getElementById('intro-email');
  const gateEmailInput = document.getElementById('gate-email');
  
  // Initialize survey manager
  surveyManager = new SurveyManager();
  surveyUI = new SurveyUI(surveyManager);
  
  // Start button handler
  startBtn.addEventListener('click', () => {
    // Capture email if provided
    const email = introEmailInput.value.trim();
    if (email && isValidEmail(email)) {
      userEmail = email;
      console.log('Email captured from intro:', userEmail);
    }
    
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
      // Check if email was provided
      if (userEmail) {
        // Email already captured, show results directly
        showResults(resultsSection);
      } else {
        // Show email gate modal
        showEmailGate(emailGateModal);
      }
    } else {
      // Go to next category
      if (surveyManager.nextCategory()) {
        surveyUI.renderCategory();
      }
    }
  });
  
  // Submit email from gate modal
  submitEmailBtn.addEventListener('click', () => {
    const email = gateEmailInput.value.trim();
    const errorEl = document.getElementById('email-error');
    
    // Clear previous errors
    gateEmailInput.classList.remove('error');
    errorEl.classList.remove('show');
    errorEl.textContent = '';
    
    if (!email) {
      showEmailError(gateEmailInput, errorEl, 'Please enter your email address');
      return;
    }
    
    if (!isValidEmail(email)) {
      showEmailError(gateEmailInput, errorEl, 'Please enter a valid email address');
      return;
    }
    
    userEmail = email;
    console.log('Email captured from gate:', userEmail);
    
    // Hide modal and show results
    hideEmailGate(emailGateModal);
    showResults(resultsSection);
  });
  
  // Allow Enter key to submit email in modal
  gateEmailInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      submitEmailBtn.click();
    }
  });
  
  // Clear error on input
  gateEmailInput.addEventListener('input', () => {
    const errorEl = document.getElementById('email-error');
    gateEmailInput.classList.remove('error');
    errorEl.classList.remove('show');
  });
  
  // Restart button handler
  restartBtn.addEventListener('click', () => {
    surveyManager.reset();
    userEmail = null;
    introEmailInput.value = '';
    gateEmailInput.value = '';
    
    // Clear email errors
    const errorEl = document.getElementById('email-error');
    gateEmailInput.classList.remove('error');
    if (errorEl) {
      errorEl.classList.remove('show');
      errorEl.textContent = '';
    }
    
    showSection(introSection);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Email validation
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Show email error
function showEmailError(inputEl, errorEl, message) {
  inputEl.classList.add('error');
  errorEl.textContent = message;
  errorEl.classList.add('show');
  inputEl.focus();
}

// Show email gate modal
function showEmailGate(modal) {
  modal.classList.add('active');
  const emailInput = document.getElementById('gate-email');
  const errorEl = document.getElementById('email-error');
  
  // Clear any previous errors
  emailInput.classList.remove('error');
  if (errorEl) {
    errorEl.classList.remove('show');
    errorEl.textContent = '';
  }
  
  // Focus on input after a short delay to ensure modal is visible
  setTimeout(() => {
    emailInput.focus();
  }, 100);
}

// Hide email gate modal
function hideEmailGate(modal) {
  modal.classList.remove('active');
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
async function showResults(resultsSection) {
  // Calculate scores
  const scoringEngine = new ScoringEngine(surveyManager.responses);
  const results = scoringEngine.calculate();
  
  // Log results for debugging
  console.log('Assessment Results:', results);
  
  // Send assessment data to server
  await submitAssessmentToServer(userEmail, surveyManager.responses, results);
  
  // Show results section
  showSection(resultsSection);
  
  // Render results
  const resultsUI = new ResultsUI(results);
  resultsUI.render();
}

// Submit assessment data to server
async function submitAssessmentToServer(email, responses, results) {
  try {
    const response = await fetch('/api/submit-assessment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        responses: responses,
        results: {
          overallScore: results.overallScore,
          maturityLevel: results.maturityLevel,
          categoryScores: results.categoryScores,
          recommendations: results.recommendations
        }
      })
    });
    
    const data = await response.json();
    console.log('Server response:', data);
  } catch (error) {
    console.error('Error submitting assessment to server:', error);
    // Don't block the UI if server submission fails
  }
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
