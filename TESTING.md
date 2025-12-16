# Testing Guide - iWEX Website

## Testing Checklist

### Functional Testing

#### Navigation
- [ ] Logo links to homepage
- [ ] All navigation links work correctly
- [ ] Mobile menu opens and closes properly
- [ ] Smooth scrolling to sections works
- [ ] Active nav link highlights on scroll
- [ ] Scroll to top button appears after scrolling
- [ ] Scroll to top button works correctly

#### Hero Section
- [ ] Hero title displays correctly
- [ ] Hero subtitle displays correctly
- [ ] Primary CTA button works
- [ ] Secondary CTA button works
- [ ] Hero image loads properly
- [ ] Animations work on page load

#### Services Section
- [ ] Services load from API
- [ ] Service cards display correctly
- [ ] Service icons render properly
- [ ] Service features list displays
- [ ] Loading skeleton shows while fetching
- [ ] Hover effects work on cards

#### About Section
- [ ] About title displays
- [ ] About description renders (HTML content)
- [ ] Mission statement displays
- [ ] Vision statement displays
- [ ] About image loads

#### Testimonials Section
- [ ] Testimonials load from API
- [ ] Testimonial carousel works
- [ ] Star ratings display correctly
- [ ] Client images load or initials show
- [ ] Navigation arrows work
- [ ] Dot indicators work
- [ ] Auto-play works (5 second interval)
- [ ] Hover stops auto-play

#### FAQ Section
- [ ] FAQs load from API
- [ ] Search functionality works
- [ ] Category filter works
- [ ] Accordion expand/collapse works
- [ ] Only one FAQ open at a time
- [ ] "No results" message shows when appropriate
- [ ] HTML content in answers renders correctly

#### Contact Section
- [ ] Contact email displays
- [ ] Contact phone displays
- [ ] Contact address displays
- [ ] Social media links display
- [ ] Social media icons render
- [ ] Contact form displays

#### Contact Form
- [ ] Name field validation works
- [ ] Email field validation works
- [ ] Email format validation works
- [ ] Phone field accepts input
- [ ] Subject field accepts input
- [ ] Message field validation works
- [ ] Required field errors show
- [ ] Form submits successfully
- [ ] Success message displays
- [ ] Form clears after submission
- [ ] Error message displays on failure
- [ ] Loading state shows during submission
- [ ] Submit button disables during submission

#### Footer
- [ ] Footer links work
- [ ] Newsletter subscription form works
- [ ] Social media links work
- [ ] Copyright year is current

### API Testing

Test all API endpoints:

```bash
# Get Website Settings
curl http://localhost:8000/api/method/iwex_website.api.website.get_website_settings

# Get Services
curl http://localhost:8000/api/method/iwex_website.api.website.get_services

# Get FAQs
curl http://localhost:8000/api/method/iwex_website.api.website.get_faqs

# Get FAQs by Category
curl http://localhost:8000/api/method/iwex_website.api.website.get_faqs?category=General

# Get Testimonials
curl http://localhost:8000/api/method/iwex_website.api.website.get_testimonials

# Submit Contact Form
curl -X POST http://localhost:8000/api/method/iwex_website.api.website.submit_contact_form \
  -H "Content-Type: application/json" \
  -d '{"full_name":"Test User","email":"test@example.com","message":"Test message"}'

# Subscribe to Newsletter
curl -X POST http://localhost:8000/api/method/iwex_website.api.website.subscribe_newsletter \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

Expected responses:
- All endpoints should return `{"success": true, "data": {...}}`
- Error cases should return `{"success": false, "message": "..."}`

### PWA Testing

#### Installation
- [ ] Install prompt appears (after 5 seconds)
- [ ] Install prompt can be dismissed
- [ ] Install prompt doesn't show again after dismissal
- [ ] App installs successfully on desktop
- [ ] App installs successfully on mobile
- [ ] App icon appears in app drawer/home screen
- [ ] App opens in standalone mode

#### Offline Functionality
- [ ] Service worker registers successfully
- [ ] Static assets cached on first visit
- [ ] Site works offline after first visit
- [ ] API responses cached
- [ ] Offline page shows when appropriate
- [ ] Site updates when back online

#### Manifest
- [ ] Manifest.json is accessible
- [ ] App name displays correctly
- [ ] Theme color applies
- [ ] Icons load correctly
- [ ] Shortcuts work (if supported)

### Browser Compatibility

Test on the following browsers:

#### Desktop
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Opera (latest)

#### Mobile
- [ ] Chrome Mobile (Android)
- [ ] Safari (iOS)
- [ ] Samsung Internet
- [ ] Firefox Mobile

### Device Testing

Test on the following devices:

#### Desktop
- [ ] 1920x1080 (Full HD)
- [ ] 1366x768 (Laptop)
- [ ] 2560x1440 (2K)

#### Tablet
- [ ] iPad (768x1024)
- [ ] iPad Pro (1024x1366)
- [ ] Android Tablet (800x1280)

#### Mobile
- [ ] iPhone SE (375x667)
- [ ] iPhone 12/13 (390x844)
- [ ] iPhone 14 Pro Max (430x932)
- [ ] Samsung Galaxy S21 (360x800)
- [ ] Google Pixel 6 (412x915)

### Responsive Design

- [ ] Layout adapts to all screen sizes
- [ ] Images scale properly
- [ ] Text is readable on all devices
- [ ] Buttons are touch-friendly (min 44x44px)
- [ ] No horizontal scrolling
- [ ] Navigation works on mobile
- [ ] Forms are usable on mobile

### Performance Testing

Use Google Lighthouse to test:

#### Metrics to Achieve
- [ ] Performance: > 90
- [ ] Accessibility: > 90
- [ ] Best Practices: > 90
- [ ] SEO: > 90
- [ ] PWA: Installable

#### Core Web Vitals
- [ ] LCP (Largest Contentful Paint): < 2.5s
- [ ] FID (First Input Delay): < 100ms
- [ ] CLS (Cumulative Layout Shift): < 0.1

#### Load Times
- [ ] First Contentful Paint: < 1.8s
- [ ] Time to Interactive: < 3.8s
- [ ] Speed Index: < 3.4s
- [ ] Total Blocking Time: < 200ms

### Accessibility Testing

- [ ] All images have alt text
- [ ] Form labels are properly associated
- [ ] Keyboard navigation works
- [ ] Focus indicators are visible
- [ ] Color contrast meets WCAA AA standards
- [ ] Screen reader compatible
- [ ] ARIA labels used where appropriate
- [ ] Semantic HTML used correctly

### SEO Testing

- [ ] Title tag is present and descriptive
- [ ] Meta description is present
- [ ] Meta keywords are relevant
- [ ] Open Graph tags are present
- [ ] Twitter Card tags are present
- [ ] Heading hierarchy is correct (H1 > H2 > H3)
- [ ] URLs are descriptive
- [ ] Images have alt text
- [ ] Internal links work
- [ ] No broken links
- [ ] Sitemap is accessible
- [ ] Robots.txt is configured

### Security Testing

- [ ] HTTPS is enforced
- [ ] No mixed content warnings
- [ ] CORS is properly configured
- [ ] API endpoints validate input
- [ ] XSS protection in place
- [ ] CSRF protection in place
- [ ] SQL injection prevention
- [ ] Rate limiting on API endpoints
- [ ] Email validation works
- [ ] No sensitive data in client-side code

### Load Testing

Use tools like Apache Bench or Artillery:

```bash
# Test with 100 concurrent users
ab -n 1000 -c 100 http://localhost:8000/

# Test API endpoint
ab -n 500 -c 50 http://localhost:8000/api/method/iwex_website.api.website.get_services
```

Expected results:
- [ ] Server handles 100+ concurrent users
- [ ] Response time < 200ms for static pages
- [ ] Response time < 500ms for API calls
- [ ] No errors under load
- [ ] Memory usage remains stable

### Error Handling

- [ ] 404 page displays for invalid URLs
- [ ] API errors show user-friendly messages
- [ ] Network errors handled gracefully
- [ ] Form validation errors are clear
- [ ] Console has no JavaScript errors
- [ ] No broken images
- [ ] Fallback content for missing data

### Email Testing

- [ ] Contact form submission creates Lead
- [ ] Email notification sent to admin
- [ ] Email contains all form data
- [ ] Email formatting is correct
- [ ] Newsletter subscription works
- [ ] Duplicate subscription prevented

### Data Validation

- [ ] Services with is_published=0 don't show
- [ ] FAQs with is_published=0 don't show
- [ ] Testimonials with is_published=0 don't show
- [ ] Display order is respected
- [ ] Empty states handled gracefully
- [ ] HTML content sanitized

## Testing Tools

### Recommended Tools

1. **Browser DevTools**
   - Chrome DevTools
   - Firefox Developer Tools
   - Safari Web Inspector

2. **Performance**
   - Google Lighthouse
   - WebPageTest
   - GTmetrix

3. **Accessibility**
   - WAVE
   - axe DevTools
   - Lighthouse Accessibility Audit

4. **SEO**
   - Google Search Console
   - Screaming Frog
   - Lighthouse SEO Audit

5. **Mobile Testing**
   - BrowserStack
   - LambdaTest
   - Chrome DevTools Device Mode

6. **Load Testing**
   - Apache Bench
   - Artillery
   - k6

7. **API Testing**
   - Postman
   - Insomnia
   - curl

## Bug Reporting

When reporting bugs, include:

1. **Description**: Clear description of the issue
2. **Steps to Reproduce**: Detailed steps
3. **Expected Result**: What should happen
4. **Actual Result**: What actually happens
5. **Environment**: Browser, OS, device
6. **Screenshots**: Visual evidence
7. **Console Errors**: Any JavaScript errors
8. **Network Tab**: Failed requests

## Test Automation

Consider implementing automated tests:

```python
# Example: Frappe Test Case
import frappe
import unittest

class TestIWEXWebsite(unittest.TestCase):
    def test_get_services(self):
        from iwex_website.api.website import get_services
        result = get_services()
        self.assertTrue(result.get('success'))
        self.assertIsInstance(result.get('data'), list)
    
    def test_submit_contact_form(self):
        from iwex_website.api.website import submit_contact_form
        result = submit_contact_form(
            full_name="Test User",
            email="test@example.com",
            message="Test message"
        )
        self.assertTrue(result.get('success'))
```

## Continuous Testing

Set up continuous testing:

1. **Pre-commit hooks**: Run linting and basic tests
2. **CI/CD pipeline**: Run full test suite on push
3. **Scheduled tests**: Daily smoke tests in production
4. **Monitoring**: Track errors and performance

## Sign-off

After completing all tests:

- [ ] All critical bugs fixed
- [ ] All tests passed
- [ ] Performance benchmarks met
- [ ] Accessibility standards met
- [ ] SEO optimized
- [ ] Security reviewed
- [ ] Documentation updated
- [ ] Stakeholders approved

**Tested by**: _______________  
**Date**: _______________  
**Approved by**: _______________  
**Date**: _______________

