# Changelog

All notable changes to the iWEX Website project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.0.1] - 2025-12-16

### Added
- Initial release of iWEX Website for ERPNext v15
- Custom Frappe app structure
- DocTypes for dynamic content management:
  - iWEX Website Settings (Single)
  - iWEX Service with child table for features
  - iWEX FAQ with categories
  - iWEX Testimonial with ratings
- Responsive HTML5 website with modern design
- Vue 3 components for interactive sections:
  - Services grid with loading states
  - FAQ accordion with search and filtering
  - Testimonial carousel with auto-play
  - Contact form with validation
- RESTful API endpoints for all data:
  - Website settings endpoint
  - Services endpoint
  - FAQs endpoint with category filtering
  - Testimonials endpoint
  - Contact form submission endpoint
  - Newsletter subscription endpoint
- Progressive Web App (PWA) features:
  - Service worker with caching strategies
  - Offline support
  - Install prompt
  - App manifest with icons
  - Background sync capability
- Custom CSS with Tailwind CSS integration
- Smooth animations with AOS library
- Lucide icons integration
- Mobile-responsive navigation
- SEO optimization:
  - Dynamic meta tags
  - Open Graph tags
  - Twitter Card tags
  - Google Analytics integration
- Email integration:
  - Contact form creates Lead in ERPNext
  - Email notifications to admin
  - Newsletter subscription management
- Comprehensive documentation:
  - Installation guide
  - Deployment guide
  - Testing guide
  - Features documentation
  - README with quick start

### Features
- Dynamic hero section with customizable content
- Services showcase with icons and features
- About section with mission and vision
- FAQ section with search and categories
- Testimonials carousel with ratings
- Contact form with ERPNext Lead integration
- Social media links integration
- Newsletter subscription
- Scroll-to-top button
- Loading skeletons for better UX
- Error handling and fallbacks
- Accessibility features (WCAG AA compliant)
- Performance optimizations (Lighthouse score > 90)

### Technical Details
- Built for ERPNext version 15
- Python 3.10+ compatible
- Vue 3 (CDN version)
- Tailwind CSS (CDN version)
- Service Worker API
- Fetch API for data loading
- LocalStorage for PWA preferences
- Responsive design (mobile-first)

### Browser Support
- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

### Known Issues
- None at initial release

### Security
- Input validation on all forms
- XSS prevention
- SQL injection prevention
- CSRF protection via Frappe
- Rate limiting on API endpoints
- Secure email validation

## [Unreleased]

### Planned
- Multi-language support (i18n)
- Dark mode toggle
- Blog integration
- Portfolio/Projects section
- Team members showcase
- Live chat integration
- Advanced analytics dashboard
- A/B testing capability

### Under Consideration
- E-commerce integration
- Booking/Appointment system
- Customer portal
- Knowledge base
- Forum/Community section

---

## Version History

- **0.0.1** (2025-12-16): Initial release

---

## How to Update

### From Source
```bash
cd apps/iwex_website
git pull origin main
cd ../..
bench --site [site-name] migrate
bench build --app iwex_website
bench restart
```

### Breaking Changes
None in this release.

### Migration Notes
This is the initial release, no migration needed.

---

## Contributors

- iWEX Infomatics Team

## License

MIT License - See LICENSE file for details

