# Development Checklist

Use this checklist before committing code or considering a feature complete.

## General Requirements

### Language
- [ ] All user-facing text is in **English only**
- [ ] No Russian, Ukrainian, or other languages in UI
- [ ] Code comments are in English
- [ ] Variable/function names are in English

### Dependencies
- [ ] No external JavaScript libraries added
- [ ] No CSS frameworks used
- [ ] No build tools required
- [ ] Project runs by opening HTML files directly in browser

## HTML Checklist

- [ ] Uses semantic HTML5 elements
- [ ] No inline styles (all styles in CSS files)
- [ ] No inline event handlers (use addEventListener in JS)
- [ ] Proper heading hierarchy (h1, h2, h3...)
- [ ] All images have `alt` attributes
- [ ] Forms have proper labels and validation
- [ ] Links have descriptive text
- [ ] Proper ARIA attributes where needed
- [ ] Valid HTML (no syntax errors)

## CSS Checklist

- [ ] No CSS frameworks (Bootstrap, Tailwind, etc.)
- [ ] Uses CSS custom properties for theme values
- [ ] Mobile-first responsive design
- [ ] Uses modern layout methods (Grid, Flexbox)
- [ ] No inline styles in HTML
- [ ] Consistent naming convention (BEM or similar)
- [ ] Proper use of `rem`/`em` units
- [ ] Organized file structure (variables, reset, layout, components)
- [ ] No `!important` unless absolutely necessary
- [ ] Cross-browser tested

## JavaScript Checklist

- [ ] No jQuery or other libraries
- [ ] Uses modern ES6+ syntax (const/let, arrow functions, etc.)
- [ ] No eval() or unsafe practices
- [ ] Uses native DOM APIs only
- [ ] Proper error handling (try/catch)
- [ ] Async/await for asynchronous code
- [ ] No global variables pollution
- [ ] Functions are small and focused
- [ ] Code is modular and organized
- [ ] No console.log statements in production code

## Performance Checklist

- [ ] Images are optimized
- [ ] Lazy loading used where appropriate
- [ ] Minimal DOM manipulation
- [ ] No unnecessary HTTP requests
- [ ] CSS and JS files are reasonably sized
- [ ] No blocking scripts (use defer/async if needed)

## Accessibility Checklist

- [ ] Can be navigated with keyboard only
- [ ] Proper focus indicators
- [ ] Color contrast meets WCAG standards
- [ ] Screen reader friendly
- [ ] Forms have proper labels
- [ ] Interactive elements are accessible

## Browser Compatibility

- [ ] Tested in Chrome
- [ ] Tested in Firefox
- [ ] Tested in Safari
- [ ] Tested in Edge
- [ ] Responsive on mobile devices
- [ ] Works on tablets
- [ ] Graceful degradation for older features

## Security Checklist

- [ ] User inputs are sanitized
- [ ] Proper form validation (client and server-side if applicable)
- [ ] No inline event handlers
- [ ] No eval() or dangerous functions
- [ ] XSS prevention measures in place

## Code Quality

- [ ] Code follows project style guide
- [ ] Consistent indentation (2 spaces)
- [ ] Meaningful variable and function names
- [ ] Comments explain "why", not "what"
- [ ] DRY principle followed
- [ ] No dead/unused code
- [ ] No TODO comments left in code

## File Organization

- [ ] Files are in correct directories (css/, js/, assets/)
- [ ] File names are lowercase and kebab-case
- [ ] Related code is grouped together
- [ ] No duplicate files

## Documentation

- [ ] README is up to date
- [ ] Code has necessary comments
- [ ] Complex algorithms are documented
- [ ] API endpoints documented (if applicable)

## Testing

- [ ] All features work as expected
- [ ] No console errors
- [ ] Forms submit correctly
- [ ] Links navigate properly
- [ ] Responsive design works on all breakpoints
- [ ] Edge cases handled

## Pre-Commit Final Check

- [ ] Reviewed all changes
- [ ] Removed debugging code
- [ ] All checklist items above passed
- [ ] Ready for review/deployment

