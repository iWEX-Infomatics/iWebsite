# iWEX Website

A custom Frappe app for ERPNext v15 that provides a modern, responsive website with PWA capabilities.

## Features

- Dynamic content management through ERPNext DocTypes
- Vue 3 components for interactive sections
- Progressive Web App (PWA) support
- Mobile-responsive design
- Services/Products showcase
- FAQ section with search
- Contact form integration
- Testimonials carousel

## Installation

1. Get the app:
```bash
bench get-app https://github.com/iWEX-Infomatics/iWebsite.git
```

2. Install on your site:
```bash
bench --site [site-name] install-app iwex_website
```

3. Build assets:
```bash
bench build --app iwex_website
```

## Configuration

After installation, configure the website through:
- **iWEX Website Settings** - Hero section, about, contact info
- **iWEX Service** - Add your services/products
- **iWEX FAQ** - Manage frequently asked questions
- **iWEX Testimonial** - Add customer testimonials

## License

MIT

