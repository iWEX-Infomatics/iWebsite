# iWEX Website - Features Documentation

## Overview

The iWEX Website is a modern, responsive web application built for ERPNext v15 that provides a complete business website solution with dynamic content management and PWA capabilities.

## Core Features

### 1. Dynamic Content Management

#### Website Settings (Single DocType)
- **Hero Section Configuration**
  - Customizable title and subtitle
  - Primary and secondary CTA buttons
  - Hero image upload
  - Video URL support
  
- **About Section**
  - Company description with HTML editor
  - Mission statement
  - Vision statement
  - About image upload

- **Contact Information**
  - Email address
  - Phone number
  - Physical address
  - Google Maps embed URL

- **Social Media Integration**
  - Facebook, Twitter, LinkedIn
  - Instagram, YouTube, GitHub
  - Customizable links

- **SEO Configuration**
  - Meta title and description
  - Meta keywords
  - Open Graph image
  - Google Analytics integration

#### Services Management
- **Service DocType Features**
  - Service name and description
  - Icon image or icon class support
  - Short and full descriptions
  - Display order control
  - Publish/unpublish toggle
  - Service-specific images

- **Service Features (Child Table)**
  - Multiple features per service
  - Feature title and description
  - Ordered list display

#### FAQ System
- **FAQ DocType Features**
  - Categorized questions
  - HTML-formatted answers
  - Display order control
  - Publish/unpublish toggle
  - Search functionality
  - Category filtering

- **Categories**
  - General
  - Services
  - Pricing
  - Technical
  - Support

#### Testimonials
- **Testimonial DocType Features**
  - Client name and company
  - Designation
  - Testimonial text
  - 5-star rating system
  - Client image upload
  - Display order control
  - Publish/unpublish toggle

### 2. Frontend Features

#### Responsive Design
- **Mobile-First Approach**
  - Optimized for all screen sizes
  - Touch-friendly UI elements
  - Responsive navigation
  - Adaptive layouts

- **Breakpoints**
  - Mobile: < 768px
  - Tablet: 768px - 1024px
  - Desktop: > 1024px

#### Navigation
- **Fixed Navigation Bar**
  - Sticky header on scroll
  - Smooth scrolling to sections
  - Active link highlighting
  - Mobile hamburger menu

- **Scroll Effects**
  - Scroll-to-top button
  - Parallax effects
  - Fade-in animations

#### Animations
- **AOS (Animate On Scroll)**
  - Fade-in effects
  - Slide-in effects
  - Stagger animations
  - Customizable duration

- **Custom Animations**
  - Floating hero image
  - Card hover effects
  - Button transitions
  - Loading skeletons

#### Interactive Components
- **Services Grid**
  - Card-based layout
  - Hover effects
  - Icon integration
  - Feature lists

- **FAQ Accordion**
  - Expand/collapse functionality
  - Search capability
  - Category filtering
  - Smooth transitions

- **Testimonial Carousel**
  - Auto-rotating slides
  - Manual navigation
  - Dot indicators
  - Star ratings

- **Contact Form**
  - Real-time validation
  - Error messaging
  - Success feedback
  - Loading states

### 3. Vue 3 Integration

#### Component Architecture
- **Services Component**
  - Fetches data from API
  - Displays in grid layout
  - Loading skeletons
  - Error handling

- **FAQ Component**
  - Search functionality
  - Category filtering
  - Accordion behavior
  - Dynamic rendering

- **Testimonials Component**
  - Carousel functionality
  - Auto-play feature
  - Navigation controls
  - Rating display

- **Contact Form Component**
  - Form validation
  - API integration
  - Error handling
  - Success states

### 4. API Integration

#### RESTful API Endpoints
- **GET /api/method/iwex_website.api.website.get_website_settings**
  - Returns all website configuration
  - Cached for performance
  - Guest access allowed

- **GET /api/method/iwex_website.api.website.get_services**
  - Returns published services with features
  - Ordered by display_order
  - Guest access allowed

- **GET /api/method/iwex_website.api.website.get_faqs**
  - Returns published FAQs
  - Optional category filter
  - Grouped by category
  - Guest access allowed

- **GET /api/method/iwex_website.api.website.get_testimonials**
  - Returns published testimonials
  - Ordered by display_order
  - Guest access allowed

- **POST /api/method/iwex_website.api.website.submit_contact_form**
  - Creates Lead in ERPNext
  - Sends email notification
  - Validation included
  - Guest access allowed

- **POST /api/method/iwex_website.api.website.subscribe_newsletter**
  - Adds to Email Group
  - Duplicate prevention
  - Guest access allowed

### 5. Progressive Web App (PWA)

#### PWA Features
- **Installability**
  - Add to home screen
  - Standalone mode
  - Custom install prompt
  - App icons (8 sizes)

- **Offline Support**
  - Service worker caching
  - Offline page
  - Cache-first strategy
  - Background sync

- **Performance**
  - Asset caching
  - API response caching
  - Lazy loading
  - Code splitting

#### Service Worker
- **Caching Strategies**
  - Cache-first for static assets
  - Network-first for API calls
  - Stale-while-revalidate for images

- **Background Features**
  - Background sync for forms
  - Periodic content updates
  - Push notifications support

#### Manifest Configuration
- **App Identity**
  - Name and short name
  - Description
  - Theme colors
  - Icons

- **Display Options**
  - Standalone mode
  - Portrait orientation
  - Start URL
  - Scope

- **Shortcuts**
  - Quick access to Services
  - Quick access to Contact

### 6. SEO Optimization

#### On-Page SEO
- **Meta Tags**
  - Dynamic title tags
  - Meta descriptions
  - Meta keywords
  - Canonical URLs

- **Open Graph**
  - OG title and description
  - OG images
  - OG type
  - Twitter Cards

- **Structured Data**
  - Schema.org markup ready
  - JSON-LD support
  - Rich snippets ready

#### Technical SEO
- **Performance**
  - Fast loading times
  - Optimized images
  - Minified assets
  - Gzip compression

- **Accessibility**
  - Semantic HTML
  - ARIA labels
  - Alt text for images
  - Keyboard navigation

### 7. Email Integration

#### Contact Form
- **Lead Creation**
  - Automatic Lead creation
  - Data mapping to ERPNext
  - Source tracking

- **Email Notifications**
  - Admin notification
  - Form data included
  - Link to Lead record
  - Customizable template

#### Newsletter
- **Subscription Management**
  - Email Group integration
  - Duplicate prevention
  - Unsubscribe support

### 8. Performance Features

#### Optimization
- **Asset Optimization**
  - CSS minification
  - JavaScript minification
  - Image lazy loading
  - Font optimization

- **Caching**
  - Browser caching
  - Service worker caching
  - API response caching
  - Static asset caching

#### Loading
- **Progressive Loading**
  - Skeleton screens
  - Lazy loading images
  - Deferred JavaScript
  - Critical CSS inline

### 9. Accessibility Features

#### WCAG Compliance
- **Level AA Standards**
  - Color contrast ratios
  - Focus indicators
  - Keyboard navigation
  - Screen reader support

- **Semantic HTML**
  - Proper heading hierarchy
  - Landmark regions
  - Form labels
  - Alt text

### 10. Security Features

#### Data Protection
- **Input Validation**
  - Email validation
  - XSS prevention
  - SQL injection prevention
  - CSRF protection

- **API Security**
  - Rate limiting
  - Permission checks
  - Error handling
  - Secure headers

## Technology Stack

### Frontend
- **HTML5**: Semantic markup
- **CSS3**: Modern styling with Tailwind CSS
- **JavaScript (ES6+)**: Modern JavaScript
- **Vue 3**: Progressive framework
- **Lucide Icons**: Icon library
- **AOS**: Animation library

### Backend
- **Python**: Server-side logic
- **Frappe Framework**: ERPNext foundation
- **ERPNext v15**: Business logic

### Infrastructure
- **Service Worker**: PWA functionality
- **Manifest.json**: PWA configuration
- **Nginx**: Web server
- **Redis**: Caching
- **MariaDB**: Database

## Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile browsers: iOS Safari, Chrome Mobile

## Performance Benchmarks

- **Lighthouse Score**: > 90
- **First Contentful Paint**: < 1.8s
- **Time to Interactive**: < 3.8s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

## Future Enhancements

### Planned Features
- [ ] Multi-language support
- [ ] Dark mode toggle
- [ ] Blog integration
- [ ] Portfolio/Projects section
- [ ] Team members showcase
- [ ] Live chat integration
- [ ] Advanced analytics dashboard
- [ ] A/B testing capability
- [ ] Email campaign integration
- [ ] Social media feed integration

### Under Consideration
- [ ] E-commerce integration
- [ ] Booking/Appointment system
- [ ] Customer portal
- [ ] Knowledge base
- [ ] Forum/Community
- [ ] Video gallery
- [ ] Podcast integration
- [ ] Event management

## Support & Documentation

- **Installation Guide**: README_INSTALLATION.md
- **Deployment Guide**: DEPLOYMENT.md
- **Testing Guide**: TESTING.md
- **API Documentation**: API.md (to be created)
- **User Manual**: USER_MANUAL.md (to be created)

