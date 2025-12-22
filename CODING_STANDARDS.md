# Coding Standards

This document defines the coding standards for the AI Readiness project.

## Architecture Overview

The project uses a simple client-server architecture:
- **Server**: Express.js serves static files from `/public` directory
- **Client**: Vanilla HTML/CSS/JavaScript with all logic running client-side
- **No API**: Server only serves static assets, no backend API endpoints

## General Principles

1. **Simplicity over cleverness** - Write clear, understandable code
2. **Standards over shortcuts** - Use web standards, not hacks
3. **Minimal dependencies** - Backend: Express only. Frontend: Zero dependencies
4. **English only** - All text, comments, names in English
5. **Separation of concerns** - Server serves static files, logic runs client-side

## HTML Standards

### Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Page Title - AI Readiness</title>
  <link rel="stylesheet" href="css/main.css">
</head>
<body>
  <header>
    <nav><!-- Navigation --></nav>
  </header>
  
  <main>
    <section><!-- Content --></section>
  </main>
  
  <footer><!-- Footer content --></footer>
  
  <script src="js/main.js" defer></script>
</body>
</html>
```

### Naming Conventions

- **Classes**: kebab-case (e.g., `user-profile`, `nav-menu`)
- **IDs**: kebab-case (e.g., `main-header`, `contact-form`)
- **Data attributes**: kebab-case (e.g., `data-user-id`)

### Best Practices

- Always use semantic HTML5 elements
- One `<h1>` per page
- Use `<button>` for actions, `<a>` for navigation
- Always include `alt` text for images
- Keep nesting shallow (max 5-6 levels)

```html
<!-- ✅ GOOD -->
<article class="blog-post">
  <header>
    <h2>Article Title</h2>
    <time datetime="2025-12-16">December 16, 2025</time>
  </header>
  <p>Article content...</p>
</article>

<!-- ❌ BAD -->
<div class="blog-post">
  <div>
    <div>Article Title</div>
    <div>December 16, 2025</div>
  </div>
  <div>Article content...</div>
</div>
```

## CSS Standards

### File Organization

```css
/* 1. Custom Properties */
:root {
  --color-primary: #007bff;
  --spacing-unit: 1rem;
}

/* 2. Reset/Base Styles */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* 3. Typography */
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  line-height: 1.6;
}

/* 4. Layout */
.container {
  max-width: 1200px;
  margin: 0 auto;
}

/* 5. Components */
.button {
  /* Button styles */
}

/* 6. Utilities */
.text-center {
  text-align: center;
}
```

### Naming with BEM

```css
/* Block */
.card {
  /* Card container */
}

/* Element */
.card__header {
  /* Card header */
}

.card__body {
  /* Card body */
}

/* Modifier */
.card--featured {
  /* Featured card variant */
}

.card__header--large {
  /* Large header variant */
}
```

### Best Practices

```css
/* ✅ GOOD - Use custom properties */
:root {
  --color-primary: #007bff;
  --color-secondary: #6c757d;
}

.button {
  background-color: var(--color-primary);
}

/* ✅ GOOD - Mobile-first */
.container {
  width: 100%;
  padding: 1rem;
}

@media (min-width: 768px) {
  .container {
    padding: 2rem;
  }
}

/* ✅ GOOD - Use modern layout */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

/* ❌ BAD - Avoid !important */
.button {
  color: red !important; /* Only use if absolutely necessary */
}

/* ❌ BAD - Avoid fixed pixel values for everything */
.text {
  font-size: 16px; /* Use rem instead */
}

/* ✅ GOOD */
.text {
  font-size: 1rem;
}
```

## Node.js/Express Standards

### Server Code (server.js)

```javascript
// ✅ GOOD - Minimal Express server
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// SPA fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

```javascript
// ❌ BAD - Don't add unnecessary middleware or features
app.use(bodyParser.json()); // Not needed for static file server
app.use(cors()); // Not needed unless you have API endpoints
```

### Package.json

```json
{
  "type": "module",
  "scripts": {
    "start": "node server.js",
    "dev": "node --watch server.js"
  }
}
```

## JavaScript Standards (Frontend)

### Variable Declarations

```javascript
// ✅ GOOD - Use const by default
const API_URL = 'https://api.example.com';
const userData = fetchUserData();

// ✅ GOOD - Use let when reassignment is needed
let counter = 0;
counter++;

// ❌ BAD - Don't use var
var oldStyle = 'avoid this';
```

### Function Declarations

```javascript
// ✅ GOOD - Arrow functions for callbacks
const numbers = [1, 2, 3];
const doubled = numbers.map(n => n * 2);

// ✅ GOOD - Regular functions for methods
function calculateTotal(items) {
  return items.reduce((sum, item) => sum + item.price, 0);
}

// ✅ GOOD - Async/await
async function fetchUserData(userId) {
  try {
    const response = await fetch(`/api/users/${userId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
}
```

### DOM Manipulation

```javascript
// ✅ GOOD - Use modern selectors
const button = document.querySelector('.submit-button');
const items = document.querySelectorAll('.list-item');

// ✅ GOOD - Event delegation
document.querySelector('.list').addEventListener('click', (e) => {
  if (e.target.classList.contains('list-item')) {
    handleItemClick(e.target);
  }
});

// ❌ BAD - Don't query selectors repeatedly in loops
for (let i = 0; i < 100; i++) {
  document.querySelector('.container').innerHTML += '<div>Item</div>';
}

// ✅ GOOD - Build string first, update DOM once
let html = '';
for (let i = 0; i < 100; i++) {
  html += '<div>Item</div>';
}
document.querySelector('.container').innerHTML = html;
```

### Naming Conventions

```javascript
// Constants: UPPER_SNAKE_CASE
const MAX_RETRY_ATTEMPTS = 3;
const API_BASE_URL = 'https://api.example.com';

// Variables and functions: camelCase
const userName = 'John';
let itemCount = 0;

function calculateTotalPrice(items) {
  // Function body
}

// Classes: PascalCase (if used)
class UserProfile {
  constructor(name) {
    this.name = name;
  }
}

// Private methods: prefix with underscore
function _privateHelper() {
  // Internal helper function
}
```

### Best Practices

```javascript
// ✅ GOOD - Use template literals
const greeting = `Hello, ${userName}! You have ${itemCount} items.`;

// ❌ BAD - String concatenation
const greeting = 'Hello, ' + userName + '! You have ' + itemCount + ' items.';

// ✅ GOOD - Destructuring
const { name, age, email } = userData;

// ✅ GOOD - Default parameters
function greetUser(name = 'Guest') {
  return `Welcome, ${name}!`;
}

// ✅ GOOD - Array methods
const activeUsers = users.filter(user => user.active);
const userNames = users.map(user => user.name);

// ✅ GOOD - Object shorthand
const name = 'John';
const age = 30;
const user = { name, age }; // Instead of { name: name, age: age }

// ✅ GOOD - Null checking
const userName = user?.profile?.name ?? 'Anonymous';
```

### Error Handling

```javascript
// ✅ GOOD - Always handle errors
async function loadData() {
  try {
    const response = await fetch('/api/data');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to load data:', error);
    // Show user-friendly error message
    showErrorMessage('Failed to load data. Please try again.');
    return null;
  }
}
```

### Module Pattern

```javascript
// ✅ GOOD - Modular code structure
// js/utils.js
export function formatDate(date) {
  return new Intl.DateTimeFormat('en-US').format(date);
}

export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// js/main.js
import { formatDate, debounce } from './utils.js';
```

## Comments

### When to Comment

```javascript
// ✅ GOOD - Explain "why", not "what"
// Using setTimeout to ensure DOM is fully loaded before initializing
setTimeout(initializeApp, 0);

// ✅ GOOD - Complex algorithm explanation
// Binary search algorithm: O(log n) time complexity
// Divides search interval in half repeatedly
function binarySearch(arr, target) {
  // Implementation
}

// ❌ BAD - Obvious comments
// Increment counter by 1
counter++;

// ❌ BAD - Commented out code (remove instead)
// const oldFunction = () => {
//   return 'old implementation';
// };
```

## Formatting

### Indentation
- Use **2 spaces** for indentation
- No tabs

### Line Length
- Aim for max 80-100 characters per line
- Break long lines logically

### Spacing

```javascript
// ✅ GOOD
function example(param1, param2) {
  const result = param1 + param2;
  
  if (result > 10) {
    return true;
  }
  
  return false;
}

// ❌ BAD
function example(param1,param2){
  const result=param1+param2;
  if(result>10){
    return true;
  }
  return false;
}
```

## File Naming

- All lowercase
- Use kebab-case: `user-profile.js`, `header-nav.css`
- Descriptive names: `form-validation.js` not `fv.js`

## Security Guidelines

```javascript
// ✅ GOOD - Sanitize user input
function sanitizeInput(input) {
  const div = document.createElement('div');
  div.textContent = input;
  return div.innerHTML;
}

// ❌ BAD - Direct innerHTML with user input
element.innerHTML = userInput; // XSS vulnerability

// ✅ GOOD - Use textContent for user data
element.textContent = userInput;

// ✅ GOOD - Validate before processing
function processEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error('Invalid email format');
  }
  // Process email
}
```

## Performance Tips

```javascript
// ✅ GOOD - Cache DOM queries
const container = document.querySelector('.container');
const items = container.querySelectorAll('.item');

// ❌ BAD - Repeated queries
for (let i = 0; i < 100; i++) {
  document.querySelector('.container').classList.add('active');
}

// ✅ GOOD - Debounce expensive operations
const handleResize = debounce(() => {
  // Expensive operation
  recalculateLayout();
}, 250);

window.addEventListener('resize', handleResize);
```

## Summary

- **Keep it simple**: Write readable, maintainable code
- **Use standards**: Modern web APIs and standards
- **No dependencies**: Pure HTML, CSS, JavaScript
- **English only**: All text and identifiers
- **Be consistent**: Follow these standards throughout the project

