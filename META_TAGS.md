# Meta Tags Documentation

## Overview

The application includes comprehensive meta tags for SEO optimization and social media sharing.

## Primary Meta Tags

### Basic Information
```html
<title>AI Nativeness Assessment - How AI-Ready is Your Team?</title>
<meta name="description" content="Assess your team's AI maturity across 9 key dimensions...">
<meta name="keywords" content="AI assessment, AI readiness, AI maturity, team assessment...">
<meta name="author" content="Hyperskill Training">
```

**Purpose:**
- SEO optimization for search engines
- Clear description of the application purpose
- Proper attribution

### Technical Meta Tags
```html
<meta name="robots" content="index, follow">
<meta name="language" content="English">
<meta name="theme-color" content="#0a0e27">
```

**Purpose:**
- `robots`: Allows search engines to index and follow links
- `language`: Specifies content language
- `theme-color`: Browser UI color on mobile devices

## Open Graph Tags (Facebook, LinkedIn)

### Core OG Tags
```html
<meta property="og:type" content="website">
<meta property="og:url" content="https://ai-readiness.hyperskill.org/">
<meta property="og:title" content="AI Nativeness Assessment - How AI-Ready is Your Team?">
<meta property="og:description" content="Take a 10-minute assessment to discover your team's AI maturity level...">
<meta property="og:site_name" content="Hyperskill Training">
<meta property="og:locale" content="en_US">
```

**Purpose:**
- Controls how the page appears when shared on Facebook, LinkedIn, WhatsApp
- `og:type`: Indicates this is a website
- `og:url`: Canonical URL for the page
- `og:title`: Title shown in social share
- `og:description`: Description shown in social share

### OG Image Tags
```html
<meta property="og:image" content="https://ai-readiness.hyperskill.org/assets/og.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="AI Nativeness Assessment - Measure your team's AI readiness">
```

**Purpose:**
- `og:image`: Social media preview image
- Image dimensions: 1200x630px (Facebook/LinkedIn recommended size)
- `og:image:alt`: Alt text for accessibility

## Twitter Card Tags

```html
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:url" content="https://ai-readiness.hyperskill.org/">
<meta name="twitter:title" content="AI Nativeness Assessment - How AI-Ready is Your Team?">
<meta name="twitter:description" content="Take a 10-minute assessment to discover your team's AI maturity level...">
<meta name="twitter:image" content="https://ai-readiness.hyperskill.org/assets/og.png">
<meta name="twitter:image:alt" content="AI Nativeness Assessment - Measure your team's AI readiness">
<meta name="twitter:creator" content="@hyperskill">
```

**Purpose:**
- Controls how the page appears when shared on Twitter/X
- `twitter:card`: Type of card (summary_large_image = large preview image)
- `twitter:creator`: Twitter handle for attribution

## Social Media Preview Image

**File:** `public/assets/og.png`

**Specifications:**
- Dimensions: 1200x630px (recommended for both Facebook and Twitter)
- Format: PNG
- Purpose: Preview image when sharing on social media

**Best Practices:**
- Include key branding elements
- Add clear, readable text
- Avoid small details (may not be visible in thumbnails)
- Test on multiple platforms

## Testing Social Shares

### Facebook/LinkedIn Debugger
1. Go to: https://developers.facebook.com/tools/debug/
2. Enter URL: https://ai-readiness.hyperskill.org/
3. Click "Debug" to see how it appears
4. Use "Scrape Again" if you've updated tags

### Twitter Card Validator
1. Go to: https://cards-dev.twitter.com/validator
2. Enter URL: https://ai-readiness.hyperskill.org/
3. Preview how the card will appear

### LinkedIn Post Inspector
1. Go to: https://www.linkedin.com/post-inspector/
2. Enter URL to preview

## Dynamic Meta Tags (Future Enhancement)

For personalized results sharing, you could add dynamic OG tags:

```javascript
// Example: Generate unique preview for each assessment result
function generateResultMeta(results) {
  return {
    title: `I scored ${results.percentage}% on the AI Nativeness Assessment`,
    description: `My team is ${results.maturityLevel}. Take the assessment!`,
    image: `https://api.example.com/generate-og-image?score=${results.percentage}`
  };
}
```

## SEO Keywords

Current keywords focus on:
- AI assessment and readiness
- Team evaluation
- AI maturity and adoption
- AI strategy and transformation
- Machine learning

These align with:
- User search intent
- Business decision-makers looking for AI guidance
- Team leads assessing AI capabilities

## Updating Meta Tags

### Change URL
Update all instances of `https://ai-readiness.hyperskill.org/` to your actual domain:

```bash
# Find and replace in index.html
og:url
twitter:url
og:image
twitter:image
```

### Change Twitter Handle
Update `@hyperskill` to your actual Twitter handle:

```html
<meta name="twitter:creator" content="@yourhandle">
```

### Update Author
```html
<meta name="author" content="Your Company Name">
<meta property="og:site_name" content="Your Company Name">
```

## Validation Checklist

- [ ] Title is under 60 characters
- [ ] Description is 150-160 characters
- [ ] OG image is exactly 1200x630px
- [ ] All URLs use HTTPS
- [ ] Image URLs are absolute (not relative)
- [ ] Tested on Facebook Debugger
- [ ] Tested on Twitter Card Validator
- [ ] Meta tags are in `<head>` section
- [ ] No duplicate tags
- [ ] Theme color matches brand

## Browser Support

All meta tags are supported by:
- ✅ Modern browsers (Chrome, Firefox, Safari, Edge)
- ✅ Social media platforms (Facebook, LinkedIn, Twitter)
- ✅ Search engines (Google, Bing)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Additional Resources

- [Open Graph Protocol](https://ogp.me/)
- [Twitter Cards Documentation](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards)
- [Facebook Sharing Best Practices](https://developers.facebook.com/docs/sharing/webmasters)
- [Google SEO Starter Guide](https://developers.google.com/search/docs/beginner/seo-starter-guide)
