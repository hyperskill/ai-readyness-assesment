# AI Readiness

A modern web application for assessing team AI nativeness, built with pure HTML, CSS, and JavaScript frontend served by an Express.js server.

## Project Philosophy

This project follows a **minimal-dependency** approach:
- Pure HTML5 for structure
- Pure CSS3 for styling
- Vanilla JavaScript for interactivity (no frontend frameworks)
- Express.js server for static file serving
- No build tools required for frontend

## Technology Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web server for serving static files and API endpoints

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with Grid, Flexbox, Custom Properties
- **JavaScript ES6+** - Native browser APIs only, no frameworks

## Features

- **Interactive Assessment**: 45 questions across 9 categories
- **Real-time Scoring**: AI Nativeness Index calculation
- **Product Recommendations**: Personalized suggestions based on results
- **Server Logging**: Assessment submissions are logged to server console
- **API Integration**: RESTful API for data submission

## Getting Started

### Prerequisites
- Node.js 18.0.0 or higher

### Installation

1. Clone or download this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```
4. Open your browser and navigate to `http://localhost:3000`

### Development Mode

For development with auto-restart on file changes:
```bash
npm run dev
```

## Project Structure

```
ai-readiness/
├── server.js            # Express server
├── package.json         # Node.js dependencies
├── public/              # Static frontend files
│   ├── index.html       # Main entry point
│   ├── css/             # Stylesheets
│   │   └── styles.css   # All CSS styles
│   ├── js/              # JavaScript modules
│   │   ├── main.js      # Application initialization
│   │   ├── data.js      # Survey questions and content
│   │   ├── scoring.js   # Scoring and recommendations
│   │   └── survey.js    # Survey flow management
│   ├── assets/          # Static assets
│   │   └── logo.svg     # Logo and images
│   └── docs/            # Documentation
├── .cursorrules         # Development rules
└── README.md            # This file
```

## Development Guidelines

### HTML
- Use semantic elements
- Keep markup clean and minimal
- Follow accessibility best practices
- Use kebab-case for class names

### CSS
- Mobile-first responsive design
- Use CSS Grid and Flexbox for layouts
- Utilize CSS custom properties for theming
- Organize styles logically
- Use `rem`/`em` units for scalability

### JavaScript
- ES6+ modern syntax
- Modular code structure
- Native DOM APIs only
- Async/await for asynchronous operations
- Proper error handling

## Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)

## API

The server provides an API endpoint for assessment submissions:

**POST** `/api/submit-assessment`

See [API.md](API.md) for detailed documentation.

### What Gets Logged

When a user completes an assessment, the following data is logged to the server console:
- User email (if provided)
- All question responses by category
- Overall AI Nativeness Index score
- Maturity level
- Category scores
- Product recommendations

This allows you to track assessments and analyze results.

## Environment Variables

The server uses the following environment variables:
- `PORT` - Server port (default: 3000)

Create a `.env` file in the root directory if you need to customize:
```
PORT=8080
```

## Contributing

When contributing to this project:
1. Follow the rules in `.cursorrules`
2. Maintain minimal-dependency philosophy (frontend should remain vanilla)
3. Write clean, readable code
4. Test in multiple browsers
5. All text must be in **English only**
6. Keep API endpoints minimal and purposeful

## License

[Add your license here]



