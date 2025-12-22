# API Documentation

## Overview

The server provides a simple API endpoint for receiving assessment submissions.

## Endpoints

### POST `/api/submit-assessment`

Receives completed assessment data and logs it to the server console.

#### Request

**Method:** `POST`

**Content-Type:** `application/json`

**Body:**
```json
{
  "email": "user@example.com",
  "responses": {
    "strategy-culture": [4, 3, 5, 4, 3],
    "skills-learning": [3, 4, 3, 4, 5],
    "data-infrastructure": [4, 4, 3, 5, 4],
    "tools-automation": [5, 4, 4, 3, 4],
    "integration-scaling": [3, 3, 4, 4, 3],
    "experimentation-innovation": [4, 5, 4, 3, 4],
    "product-processes": [3, 4, 4, 5, 3],
    "ethics-governance": [4, 3, 4, 4, 5],
    "impact-measurement": [3, 4, 3, 4, 4]
  },
  "results": {
    "overallScore": 3.8,
    "maturityLevel": "AI-Driven",
    "categoryScores": {
      "strategy-culture": 3.8,
      "skills-learning": 3.8,
      "data-infrastructure": 4.0,
      "tools-automation": 4.0,
      "integration-scaling": 3.4,
      "experimentation-innovation": 4.0,
      "product-processes": 3.8,
      "ethics-governance": 4.0,
      "impact-measurement": 3.6
    },
    "recommendations": [
      {
        "title": "AI Engineering Training",
        "description": "..."
      }
    ]
  }
}
```

#### Response

**Success (200):**
```json
{
  "success": true,
  "message": "Assessment submitted successfully"
}
```

**Error (400/500):**
```json
{
  "success": false,
  "error": "Error message"
}
```

## Server Console Output

When an assessment is submitted, the server logs detailed information to the console:

```
========== NEW ASSESSMENT SUBMISSION ==========
Email: user@example.com

Timestamp: 2025-12-22T15:30:00.000Z

--- RESPONSES BY CATEGORY ---

strategy-culture:
  Question 1: 4
  Question 2: 3
  Question 3: 5
  Question 4: 4
  Question 5: 3

skills-learning:
  Question 1: 3
  Question 2: 4
  Question 3: 3
  Question 4: 4
  Question 5: 5

... (all categories)

--- RESULTS ---
AI Nativeness Index: 3.80
Maturity Level: AI-Driven

Category Scores:
  strategy-culture: 3.80
  skills-learning: 3.80
  ... (all categories)

Recommended Products:
  - AI Engineering Training
  - ...

================================================
```

## Frontend Integration

The assessment data is automatically sent to the server when a user completes the assessment. This happens in `public/js/main.js`:

```javascript
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
    // UI is not blocked if server submission fails
  }
}
```

## Testing the API

You can test the API endpoint using curl:

```bash
curl -X POST http://localhost:3000/api/submit-assessment \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "responses": {
      "strategy-culture": [4, 3, 5, 4, 3],
      "skills-learning": [3, 4, 3, 4, 5]
    },
    "results": {
      "overallScore": 3.8,
      "maturityLevel": "AI-Driven",
      "categoryScores": {
        "strategy-culture": 3.8,
        "skills-learning": 3.8
      },
      "recommendations": [
        {"title": "AI Engineering Training"}
      ]
    }
  }'
```

## Notes

- The API currently only logs data to the server console
- No data is persisted to a database
- The frontend will continue to work even if the server submission fails
- Email is optional but will be logged if provided
