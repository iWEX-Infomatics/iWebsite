# Quick Start Guide - iWEX Website

## Summary of Changes

### ✅ Completed Updates

1. **Contact Information Updated**
   - Email: `emails@iwex.in`
   - Phone: `+91 97447 83338`
   - Address: `S41, SBC2, Thapasya, Phase 1, Infopark Kochi, Kerala, India - 682042`

2. **GitHub Repository Configured**
   - Repository: `https://github.com/iWEX-Infomatics/iWebsite.git`
   - Type: Private Repository
   - Documentation: See `.git-config.md`

3. **ERPNext DocType Mapping Created**
   - Comprehensive mapping guide: `ERPNEXT_DOCTYPE_MAPPING.md`
   - Shows how to use existing ERPNext data
   - Includes API implementation examples

---

## Installation from GitHub

### Prerequisites
- ERPNext v15 installed
- GitHub access credentials (for private repo)
- Bench CLI access

### Step 1: Clone from GitHub

```bash
# Navigate to your bench directory
cd /path/to/frappe-bench

# Get the app from GitHub (you'll be prompted for credentials)
bench get-app https://github.com/iWEX-Infomatics/iWebsite.git

# Or use a specific branch
bench get-app https://github.com/iWEX-Infomatics/iWebsite.git --branch main
```

### Step 2: Install on Site

```bash
# Install the app
bench --site [your-site-name] install-app iwex_website

# Migrate database
bench --site [your-site-name] migrate
```

### Step 3: Build Assets

```bash
# Build frontend assets
bench build --app iwex_website

# Restart bench
bench restart
```

### Step 4: Configure Website

1. **Log in to ERPNext**
   - Go to your ERPNext site

2. **Navigate to iWEX Website Settings**
   - Search for "iWEX Website Settings" in Awesomebar
   - Or go to: `[your-site]/app/iwex-website-settings`

3. **Fill in Hero Section**
   - Hero Title: Your main headline
   - Hero Subtitle: Supporting text
   - CTA Buttons: Call-to-action text and links
   - Hero Image: Upload your hero image

4. **Fill in About Section**
   - About Title: "About iWEX Infomatics"
   - About Description: Your company story
   - Mission Statement: Your mission
   - Vision Statement: Your vision
   - About Image: Upload about image

5. **Contact Information** (Pre-filled with defaults)
   - Email: emails@iwex.in ✅
   - Phone: +91 97447 83338 ✅
   - Address: S41, SBC2, Thapasya, Phase 1, Infopark Kochi, Kerala, India - 682042 ✅
   - Google Maps URL: (optional)

6. **Social Media Links**
   - Facebook, Twitter, LinkedIn, Instagram, YouTube, GitHub URLs

7. **SEO Settings**
   - Meta Title: Your site title
   - Meta Description: Site description
   - Meta Keywords: Relevant keywords
   - OG Image: Social sharing image
   - Google Analytics ID: (optional)

### Step 5: Add Content

#### Add Services

```
1. Go to: iWEX Website > iWEX Service > New
2. Fill in:
   - Service Name: e.g., "Web Development"
   - Icon Class: e.g., "code" (Lucide icon name)
   - Short Description: Brief overview
   - Full Description: Detailed information
   - Features: Add multiple features in child table
   - Display Order: 1, 2, 3, etc.
   - Check "Is Published"
3. Save
4. Repeat for all services
```

#### Add FAQs

```
1. Go to: iWEX Website > iWEX FAQ > New
2. Fill in:
   - Category: General/Services/Pricing/Technical/Support
   - Question: Your question
   - Answer: Detailed answer (supports HTML)
   - Display Order: 1, 2, 3, etc.
   - Check "Is Published"
3. Save
4. Repeat for 10-15 FAQs
```

#### Add Testimonials

```
1. Go to: iWEX Website > iWEX Testimonial > New
2. Fill in:
   - Client Name: Customer name
   - Company: Company name
   - Designation: Job title
   - Testimonial Text: Their feedback
   - Rating: 1-5 stars
   - Client Image: Upload photo (optional)
   - Display Order: 1, 2, 3, etc.
   - Check "Is Published"
3. Save
4. Repeat for 3-5 testimonials
```

### Step 6: Upload PWA Icons

Create and upload icons to: `iwex_website/public/images/`

Required sizes:
- icon-72x72.png
- icon-96x96.png
- icon-128x128.png
- icon-144x144.png
- icon-152x152.png
- icon-192x192.png
- icon-384x384.png
- icon-512x512.png

You can use tools like:
- https://realfavicongenerator.net/
- https://www.favicon-generator.org/

### Step 7: Access Your Website

```
http://your-site-name/
or
https://your-domain.com/
```

---

## Using ERPNext Data (Advanced)

Instead of manually entering data, you can use existing ERPNext data. See `ERPNEXT_DOCTYPE_MAPPING.md` for detailed instructions.

### Quick Examples:

#### Use Items as Services

```python
# Add to iwex_website/api/website.py

@frappe.whitelist(allow_guest=True)
def get_items_as_services():
    """Use ERPNext Items as Services"""
    items = frappe.get_all(
        "Item",
        filters={
            "show_in_website": 1,
            "is_sales_item": 1,
            "disabled": 0
        },
        fields=[
            "item_name as service_name",
            "description as short_description",
            "web_long_description as full_description",
            "website_image as service_image"
        ]
    )
    return {"success": True, "data": items}
```

#### Use Customers as Testimonials

```python
# Add custom fields to Customer DocType first
# Then add this API:

@frappe.whitelist(allow_guest=True)
def get_customer_testimonials():
    """Use Customer feedback as Testimonials"""
    customers = frappe.get_all(
        "Customer",
        filters={
            "custom_show_testimonial": 1
        },
        fields=[
            "customer_name as client_name",
            "custom_testimonial_text as testimonial_text",
            "custom_testimonial_rating as rating",
            "image as client_image"
        ]
    )
    return {"success": True, "data": customers}
```

---

## GitHub Workflow

### Making Changes

```bash
# 1. Navigate to app directory
cd apps/iwex_website

# 2. Create a new branch
git checkout -b feature/your-feature-name

# 3. Make your changes
# Edit files...

# 4. Commit changes
git add .
git commit -m "feat: description of your changes"

# 5. Push to GitHub
git push origin feature/your-feature-name

# 6. Create Pull Request on GitHub
```

### Updating from GitHub

```bash
# Pull latest changes
cd apps/iwex_website
git pull origin main

# Update the site
cd ../..
bench --site [site-name] migrate
bench build --app iwex_website
bench restart
```

---

## Testing Checklist

- [ ] Website loads at root URL
- [ ] All sections display correctly
- [ ] Services load from API
- [ ] FAQs load and search works
- [ ] Testimonials carousel works
- [ ] Contact form submits successfully
- [ ] Email notifications received
- [ ] PWA installs on mobile
- [ ] Offline mode works
- [ ] All links work
- [ ] Images load correctly
- [ ] Responsive on mobile
- [ ] No console errors

---

## Troubleshooting

### Website Not Loading

```bash
# Clear cache
bench --site [site-name] clear-cache
bench --site [site-name] clear-website-cache

# Rebuild
bench build --app iwex_website

# Restart
bench restart
```

### API Errors

```bash
# Check logs
bench --site [site-name] logs

# Or watch in real-time
tail -f logs/web.log
```

### GitHub Authentication Issues

```bash
# Use Personal Access Token
git clone https://YOUR_TOKEN@github.com/iWEX-Infomatics/iWebsite.git

# Or configure SSH key (recommended)
# See .git-config.md for details
```

---

## Support & Resources

### Documentation Files

1. **README.md** - Overview and quick start
2. **README_INSTALLATION.md** - Detailed installation
3. **DEPLOYMENT.md** - Production deployment
4. **ERPNEXT_DOCTYPE_MAPPING.md** - ERPNext data integration
5. **.git-config.md** - GitHub repository setup
6. **TESTING.md** - Testing procedures
7. **FEATURES.md** - Complete feature list

### Contact

- **Email**: emails@iwex.in
- **Phone**: +91 97447 83338
- **Address**: S41, SBC2, Thapasya, Phase 1, Infopark Kochi, Kerala, India - 682042
- **GitHub**: https://github.com/iWEX-Infomatics/iWebsite

### Useful Links

- ERPNext Docs: https://docs.erpnext.com
- Frappe Docs: https://frappeframework.com/docs
- Frappe Forum: https://discuss.erpnext.com

---

## Next Steps

1. ✅ Install from GitHub
2. ✅ Configure website settings
3. ✅ Add services, FAQs, testimonials
4. ✅ Upload PWA icons
5. ✅ Test all functionality
6. 📋 Review ERPNext DocType mapping
7. 🚀 Deploy to production

**Ready to go live!** 🎉

