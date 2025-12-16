# AI Agent Rules - Quick Reference

**This is a quick reference guide for AI assistants working on this project.**

## 🚫 ABSOLUTE PROHIBITIONS

### NO External Dependencies
- ❌ React, Vue, Angular, Svelte - **FORBIDDEN**
- ❌ jQuery, Lodash, Moment.js - **FORBIDDEN**
- ❌ Bootstrap, Tailwind, Bulma - **FORBIDDEN**
- ❌ Sass, Less, PostCSS - **FORBIDDEN**
- ❌ Webpack, Vite, Parcel - **FORBIDDEN**
- ❌ TypeScript - **FORBIDDEN** (use vanilla JS)
- ❌ Node modules - **FORBIDDEN** (unless critical and approved)

### Language Requirement
- ❌ **NEVER** use Russian, Ukrainian, or any non-English text in UI
- ✅ **ALWAYS** use English for all user-facing text
- ✅ **ALWAYS** use English for comments and documentation
- ✅ **ALWAYS** use English for variable/function names

## ✅ WHAT TO USE

### HTML
- ✅ Pure HTML5
- ✅ Semantic elements: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`
- ✅ Accessibility attributes (ARIA when needed)
- ✅ Forms with proper labels
- ✅ kebab-case for classes/ids

### CSS
- ✅ Pure CSS3 only
- ✅ CSS Grid and Flexbox for layouts
- ✅ CSS Custom Properties (variables)
- ✅ Mobile-first responsive design
- ✅ Modern features: `clamp()`, `calc()`, `:has()`, etc.
- ✅ BEM methodology for naming

### JavaScript
- ✅ Vanilla JavaScript ES6+
- ✅ `const` and `let` (no `var`)
- ✅ Arrow functions
- ✅ Template literals
- ✅ Async/await
- ✅ Native DOM APIs: `querySelector`, `addEventListener`
- ✅ Modules with `import`/`export`

## 📋 BEFORE WRITING ANY CODE

### Ask Yourself:
1. Is this pure HTML/CSS/JS? → If no, **STOP**
2. Is all text in English? → If no, **TRANSLATE**
3. Am I using any library? → If yes, **REMOVE IT**
4. Can I open this in a browser without build tools? → If no, **SIMPLIFY**

## 🎯 CODE GENERATION RULES

### When Creating HTML:
```html
<!-- ✅ ALWAYS DO THIS -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Page Title</title>
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>
  <main>
    <!-- Semantic HTML content -->
  </main>
  <script src="js/main.js" defer></script>
</body>
</html>
```

### When Creating CSS:
```css
/* ✅ ALWAYS DO THIS */
:root {
  --color-primary: #007bff;
  --spacing-unit: 1rem;
}

/* Mobile-first approach */
.container {
  width: 100%;
  padding: var(--spacing-unit);
}

@media (min-width: 768px) {
  .container {
    max-width: 1200px;
    margin: 0 auto;
  }
}
```

### When Creating JavaScript:
```javascript
// ✅ ALWAYS DO THIS
// Use const by default
const element = document.querySelector('.my-element');

// Event listeners (not inline handlers)
element.addEventListener('click', handleClick);

// Async/await for async operations
async function fetchData() {
  try {
    const response = await fetch('/api/data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}
```

## 🔍 REVIEW CHECKLIST

Before presenting code, verify:

- [ ] Zero external dependencies
- [ ] All text is in English
- [ ] Pure HTML/CSS/JS only
- [ ] No inline styles or scripts
- [ ] Mobile-responsive
- [ ] Semantic HTML used
- [ ] Accessible (ARIA, alt text, labels)
- [ ] Works without build tools
- [ ] Modern browser compatible
- [ ] No console errors

## 🚨 WHEN USER ASKS FOR FORBIDDEN THINGS

If user requests React, Bootstrap, or other prohibited technologies:

**Response template:**
```
According to the project rules (.cursorrules), this project uses pure HTML, CSS, 
and JavaScript without frameworks or libraries. 

I can implement [feature] using vanilla JavaScript instead. This approach will:
- Keep the project dependency-free
- Be lighter and faster
- Give you full control over the code

Would you like me to proceed with a pure JavaScript implementation?
```

## 💡 COMMON PATTERNS

### Form Validation
```javascript
// ✅ Native validation
const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (form.checkValidity()) {
    // Process form
  }
});
```

### Modal/Dialog
```html
<!-- ✅ Native dialog element -->
<dialog id="my-dialog">
  <p>Dialog content</p>
  <button onclick="this.closest('dialog').close()">Close</button>
</dialog>

<script>
  document.querySelector('#show-dialog').addEventListener('click', () => {
    document.querySelector('#my-dialog').showModal();
  });
</script>
```

### Responsive Images
```html
<!-- ✅ Native responsive images -->
<picture>
  <source media="(min-width: 768px)" srcset="large.jpg">
  <source media="(min-width: 480px)" srcset="medium.jpg">
  <img src="small.jpg" alt="Description" loading="lazy">
</picture>
```

### API Calls
```javascript
// ✅ Native fetch API
async function getData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}
```

### Local Storage
```javascript
// ✅ Native localStorage
// Save
localStorage.setItem('user', JSON.stringify(userData));

// Load
const userData = JSON.parse(localStorage.getItem('user'));

// Remove
localStorage.removeItem('user');
```

### Animation
```css
/* ✅ CSS animations */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.element {
  animation: fadeIn 0.3s ease-in;
}
```

```javascript
// ✅ Web Animations API
element.animate(
  [
    { opacity: 0, transform: 'translateY(-20px)' },
    { opacity: 1, transform: 'translateY(0)' }
  ],
  {
    duration: 300,
    easing: 'ease-in-out'
  }
);
```

## 📁 FILE STRUCTURE

When creating new files, use this structure:
```
project/
├── index.html
├── css/
│   ├── variables.css    (CSS custom properties)
│   ├── reset.css        (CSS reset)
│   ├── layout.css       (Grid, flexbox, containers)
│   ├── components.css   (Buttons, cards, etc.)
│   └── utilities.css    (Helper classes)
├── js/
│   ├── main.js          (Entry point)
│   ├── utils.js         (Helper functions)
│   └── [feature].js     (Feature-specific code)
└── assets/
    ├── images/
    └── icons/
```

## 🎨 UI/UX PRINCIPLES

- Mobile-first design
- Touch-friendly targets (min 44x44px)
- Clear visual hierarchy
- Consistent spacing
- Readable typography (min 16px base)
- High contrast for accessibility
- Loading states for async operations
- Error messages for failed operations

## 📱 RESPONSIVE BREAKPOINTS

```css
/* Mobile: default (< 768px) */
/* Tablet */
@media (min-width: 768px) { }
/* Desktop */
@media (min-width: 1024px) { }
/* Large Desktop */
@media (min-width: 1280px) { }
```

## 🔐 SECURITY REMINDERS

- Never use `innerHTML` with user input (use `textContent`)
- Always validate and sanitize inputs
- Use `addEventListener`, not inline handlers
- Implement CSP headers
- Never use `eval()`
- Validate email/URL formats with regex

## ⚡ PERFORMANCE TIPS

- Lazy load images: `<img loading="lazy">`
- Defer scripts: `<script defer>`
- Minimize DOM queries (cache selectors)
- Use event delegation
- Debounce scroll/resize handlers
- Optimize images before adding

## 🎯 REMEMBER

1. **Simplicity is key** - If it feels complex, it probably is
2. **Standards over hacks** - Use modern web standards
3. **English only** - No exceptions
4. **Zero dependencies** - Everything must work standalone
5. **Test in browser** - Must work by opening HTML file directly

---

**When in doubt, ask yourself: "Would this work if I just opened the HTML file in a browser?"**

**If the answer is no, you're doing it wrong.**

