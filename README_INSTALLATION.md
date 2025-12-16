# iWEX Website - Installation & Setup Guide

## Prerequisites

- ERPNext v15 installed and running
- Bench CLI access
- Basic knowledge of Frappe/ERPNext

## Installation Steps

### 1. Get the App

If you have the app in a Git repository:
```bash
cd /path/to/frappe-bench
bench get-app https://github.com/iWEX-Infomatics/iWebsite.git
```

Or if you have the app locally:
```bash
cd /path/to/frappe-bench
bench get-app /path/to/iwex_website
```

### 2. Install on Your Site

```bash
bench --site [your-site-name] install-app iwex_website
```

### 3. Run Migrations

```bash
bench --site [your-site-name] migrate
```

### 4. Build Assets

```bash
bench build --app iwex_website
```

### 5. Restart Bench

```bash
bench restart
```

## Initial Configuration

### 1. Configure Website Settings

1. Log in to your ERPNext site
2. Go to: **iWEX Website > iWEX Website Settings**
3. Fill in the following sections:
   - **Hero Section**: Title, subtitle, CTA buttons, images
   - **About Section**: Company information, mission, vision
   - **Contact Information**: Email, phone, address
   - **Social Media**: Links to your social profiles
   - **SEO Settings**: Meta tags, Open Graph image, Google Analytics ID

### 2. Add Services

1. Go to: **iWEX Website > iWEX Service > New**
2. Fill in:
   - Service Name
   - Icon (upload image or use icon class like "code" for Lucide icons)
   - Short Description
   - Full Description
   - Features (add multiple features in the child table)
   - Display Order (lower numbers appear first)
   - Check "Is Published"
3. Save

### 3. Add FAQs

1. Go to: **iWEX Website > iWEX FAQ > New**
2. Fill in:
   - Category (General, Services, Pricing, Technical, Support)
   - Question
   - Answer (supports HTML formatting)
   - Display Order
   - Check "Is Published"
3. Save

### 4. Add Testimonials (Optional)

1. Go to: **iWEX Website > iWEX Testimonial > New**
2. Fill in:
   - Client Name
   - Company
   - Designation
   - Testimonial Text
   - Rating (1-5 stars)
   - Client Image (optional)
   - Display Order
   - Check "Is Published"
3. Save

## Accessing the Website

After installation and configuration, your website will be accessible at:
```
https://your-site-name/
```

Or if using a custom domain:
```
https://your-domain.com/
```

## PWA Features

### Testing PWA Installation

1. Open your website in Chrome/Edge
2. Look for the install icon in the address bar
3. Click to install the app
4. The app will be available on your home screen/app drawer

### PWA Icons

You'll need to create and upload PWA icons in the following sizes:
- 72x72, 96x96, 128x128, 144x144, 152x152, 192x192, 384x384, 512x512

Place them in: `iwex_website/public/images/`

Name them as: `icon-72x72.png`, `icon-96x96.png`, etc.

## Customization

### Modifying Styles

Edit: `iwex_website/public/css/styles.css`

After changes:
```bash
bench build --app iwex_website
bench restart
```

### Modifying JavaScript

Edit: `iwex_website/public/js/main.js`

After changes:
```bash
bench build --app iwex_website
bench restart
```

### Adding Custom API Endpoints

Edit: `iwex_website/api/website.py`

Add your custom whitelisted functions:
```python
@frappe.whitelist(allow_guest=True)
def my_custom_endpoint():
    return {"success": True, "data": "Hello World"}
```

## Troubleshooting

### Website Not Loading

1. Check if app is installed:
   ```bash
   bench --site [site-name] list-apps
   ```

2. Clear cache:
   ```bash
   bench --site [site-name] clear-cache
   ```

3. Rebuild assets:
   ```bash
   bench build --app iwex_website
   ```

### API Errors

1. Check error logs:
   ```bash
   bench --site [site-name] logs
   ```

2. Verify permissions in DocTypes

3. Check if data exists in DocTypes

### PWA Not Installing

1. Ensure site is served over HTTPS
2. Check service worker registration in browser console
3. Verify manifest.json is accessible
4. Check PWA icons are in correct location

## Performance Optimization

### Enable Caching

In your site's `site_config.json`:
```json
{
    "enable_frappe_cache": 1,
    "cache_ttl": 3600
}
```

### Enable Compression

```bash
bench config http_timeout 300
```

### Optimize Images

- Use WebP format for images
- Compress images before uploading
- Use appropriate image sizes

## Support

For issues and questions:
- Email: info@iwexinfomatics.com
- GitHub: https://github.com/your-org/iwex_website/issues

## License

MIT License - See LICENSE file for details

