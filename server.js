import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// API route for assessment submission
app.post('/api/submit-assessment', (req, res) => {
  try {
    const { email, responses, results } = req.body;
    
    // Validate required data
    if (!responses || !results) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing required data' 
      });
    }
    
    console.log('\n========== NEW ASSESSMENT SUBMISSION ==========');
    console.log('Email:', email || 'Not provided');
    console.log('\nTimestamp:', new Date().toISOString());
    
    // Log responses
    if (responses && typeof responses === 'object') {
      console.log('\n--- RESPONSES BY CATEGORY ---');
      Object.entries(responses).forEach(([categoryId, answers]) => {
        console.log(`\n${categoryId}:`);
        if (Array.isArray(answers)) {
          answers.forEach((answer, index) => {
            console.log(`  Question ${index + 1}: ${answer}`);
          });
        }
      });
    }
    
    // Log results
    if (results && typeof results === 'object') {
      console.log('\n--- RESULTS ---');
      
      if (results.overallScore !== undefined) {
        console.log('AI Nativeness Index:', 
          typeof results.overallScore === 'number' 
            ? results.overallScore.toFixed(2) 
            : results.overallScore
        );
      }
      
      if (results.maturityLevel) {
        console.log('Maturity Level:', results.maturityLevel);
      }
      
      // Log category scores
      if (results.categoryScores && typeof results.categoryScores === 'object') {
        console.log('\nCategory Scores:');
        Object.entries(results.categoryScores).forEach(([categoryId, score]) => {
          const scoreValue = typeof score === 'number' ? score.toFixed(2) : score;
          console.log(`  ${categoryId}: ${scoreValue}`);
        });
      }
      
      // Log recommendations
      if (results.recommendations && Array.isArray(results.recommendations) && results.recommendations.length > 0) {
        console.log('\nRecommended Products:');
        results.recommendations.forEach(rec => {
          if (rec && rec.title) {
            console.log(`  - ${rec.title}`);
          }
        });
      }
    }
    
    console.log('================================================\n');
    
    // Send success response
    res.json({ 
      success: true, 
      message: 'Assessment submitted successfully' 
    });
    
  } catch (error) {
    console.error('Error processing assessment submission:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Server error processing submission' 
    });
  }
});

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Handle SPA routing - send index.html for all routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Press Ctrl+C to stop the server`);
});
