# AI Nativeness Assessment - Project Overview

## Description
A modern, interactive web application for team leads to assess their team's AI nativeness across 9 key dimensions. The assessment provides a detailed maturity profile and personalized product recommendations.

## Features

### 1. **Multi-Step Survey Flow**
- 9 categories with 5 questions each (45 total questions)
- Likert scale (1-5) for consistent responses
- Real-time progress tracking
- Category-by-category navigation

### 2. **Intelligent Scoring**
- Category-level scores
- Overall AI Nativeness Index
- Maturity level classification (AI-Curious, AI-Enabled, AI-Driven, AI-Native)
- Visual score representation with animated progress circle

### 3. **Smart Product Recommendations**
- Rule-based recommendation engine
- Three products: AI foundations training, AI engineering training, AI-Driven Software Development Workshops
- Recommendations based on derived signals: Alignment, Engineering Depth, Workflow Acceleration, Experimentation

### 4. **Rich Results Visualization**
- Animated score circle
- Category breakdown with color-coded bars
- Detailed maturity level descriptions
- Personalized next-step recommendations

### 5. **Modern UI/UX**
- Dark theme with cyan accents
- Responsive design (mobile-first)
- Smooth animations and transitions
- Keyboard navigation support
- Accidental navigation prevention

## Technology Stack

### Backend
- **Node.js** (v18+) - Runtime environment
- **Express.js** - Minimal web server for static file serving

### Frontend (Pure Vanilla Stack)
- **HTML5** - Semantic markup
- **CSS3** - Custom properties, Grid, Flexbox
- **JavaScript ES6+** - Modules, classes, native APIs only

## Architecture

The application uses a simple client-server architecture:
- **Express Server** serves static files from the `public` directory
- **Frontend** is completely framework-free vanilla JavaScript
- No API endpoints - all logic runs client-side
- Server only handles HTTP requests for static assets

## File Structure

```
ai-readiness/
├── server.js               # Express server entry point
├── package.json            # Node.js dependencies and scripts
├── public/                 # Static files served by Express
│   ├── index.html          # Main entry point
│   ├── css/
│   │   └── styles.css      # All styles and responsive design
│   ├── js/
│   │   ├── data.js         # Survey questions and content data
│   │   ├── scoring.js      # Scoring algorithm and recommendation logic
│   │   ├── survey.js       # Survey flow and UI management
│   │   └── main.js         # Application initialization
│   ├── assets/
│   │   └── logo.svg        # Images and assets
│   └── docs/               # Documentation (reference materials)
├── .cursorrules            # Development rules
└── PROJECT_OVERVIEW.md     # This file
```

## Key Components

### Data Layer (`data.js`)
- Survey questions organized by category
- Likert scale definitions
- Maturity level descriptions
- Product recommendation descriptions

### Scoring Engine (`scoring.js`)
- Category score calculation
- AI Readiness Index calculation
- Derived signal calculations
- Product recommendation logic
- Score interpretation

### Survey Management (`survey.js`)
- `SurveyManager`: State management and navigation
- `SurveyUI`: Dynamic question rendering
- `ResultsUI`: Results visualization

### Application Core (`main.js`)
- Event handlers
- Section navigation
- Application initialization
- Keyboard shortcuts

## Scoring Algorithm

### Category Score
```
Category Score = (Q1 + Q2 + Q3 + Q4 + Q5) / 5
Range: 1.0 - 5.0
```

### AI Nativeness Index
```
AI Nativeness Index = (Sum of all Category Scores) / 9
Range: 1.0 - 5.0
```

### Maturity Levels
- **1.0 - 2.0**: AI-Curious
- **2.1 - 3.0**: AI-Enabled
- **3.1 - 4.0**: AI-Driven
- **4.1 - 5.0**: AI-Native

### Derived Signals for Recommendations

1. **Alignment** = avg(Strategy & Culture, Skills & Learning)
2. **Engineering Depth** = avg(Data & Infrastructure, Integration & Scaling, Impact Measurement)
3. **Workflow Acceleration** = avg(Tools & Automation, Integration & Scaling)
4. **Experimentation** = avg(Experimentation & Innovation, Product & Processes)

## Product Recommendation Logic

### AI foundations training
- **Trigger**: Alignment < 3.2
- **Target**: Teams needing alignment and shared understanding

### AI engineering training
- **Trigger**: Alignment ≥ 3.2 AND Experimentation ≥ 3.2 AND Engineering Depth < 3.4
- **Target**: Teams experimenting but lacking production engineering depth

### AI-Driven Software Development Workshops
- **Trigger**: Alignment ≥ 3.2 AND Workflow Acceleration ≥ 3.4 AND Engineering Depth ≥ 3.2
- **Target**: Mature teams ready for workflow optimization

## Usage

### Running the Application

1. Install dependencies: `npm install`
2. Start the server: `npm start`
3. Open browser at `http://localhost:3000`

### Using the Assessment

1. Read the introduction and click "Start Assessment"
2. Answer all 5 questions in each category (9 categories total)
3. Navigate between categories using Previous/Next buttons
4. View comprehensive results with recommendations

## Browser Compatibility

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)

## Development Principles

### Backend
- Minimal server - only static file serving
- No database required (client-side only)
- No API endpoints (unless future features require it)
- Express.js as the only server dependency

### Frontend
- Zero frontend framework dependencies
- Mobile-first responsive design
- Semantic HTML5
- Accessible UI (ARIA attributes where needed)
- Clean, maintainable vanilla JavaScript
- Performance optimized

## Future Enhancement Ideas

- Data export (PDF/JSON)
- Comparison with industry benchmarks
- Team collaboration features
- Historical progress tracking
- Multi-language support

## Credits

Built for Hyperskill Training - AI Nativeness Assessment Platform
