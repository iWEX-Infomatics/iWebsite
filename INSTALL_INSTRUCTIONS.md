# ✅ Final Installation Instructions

## Problem Solved!

The build error has been **permanently fixed**. The issue was that the app was trying to use Frappe's build system when it doesn't need it (since we're using CDN resources for Vue, Tailwind, etc.).

**Solution**: Removed build.json and configured the app to serve assets directly without bundling.

---

## Installation Steps (Working Now!)

### Step 1: Clean Up Previous Attempts

```bash
cd ~/frappe-bench

# Remove any previous failed installations
rm -rf apps/iWebsite
rm -rf apps/iwex_website
```

### Step 2: Get the App (Fixed Version)

```bash
# Get the app - THIS WILL NOW WORK!
bench get-app https://github.com/iWEX-Infomatics/iWebsite.git --skip-assets
```

**Note**: We use `--skip-assets` flag because this app doesn't need the build process.

### Step 3: Install on Your Site

```bash
# Install the app on your site
bench --site [your-site-name] install-app iwex_website

# Migrate database
bench --site [your-site-name] migrate

# Clear cache
bench --site [your-site-name] clear-cache

# Restart
bench restart
```

---

## Why This Works Now

### What Changed:

1. **Removed `build.json`** - Not needed for CDN-based apps
2. **Updated `hooks.py`** - Direct asset paths instead of bundled paths
3. **Removed bundle placeholders** - Cleaned up unnecessary files

### Asset Loading:

The app now loads assets directly:
- ✅ `/assets/iwex_website/css/styles.css` (custom styles)
- ✅ `/assets/iwex_website/js/main.js` (main JavaScript)
- ✅ CDN resources (Vue 3, Tailwind CSS, Lucide Icons, AOS)

No build/bundling needed! 🎉

---

## Verification

After installation, verify everything works:

### 1. Check Installation

```bash
# List installed apps
bench --site [your-site] list-apps

# You should see: iwex_website
```

### 2. Access the Website

```bash
# Visit your site
http://your-site/

# You should see the iWEX website homepage
```

### 3. Check Assets

```bash
# Verify assets are accessible
ls -la ~/frappe-bench/sites/assets/iwex_website/

# You should see:
# - css/styles.css
# - js/main.js
# - manifest.json
# - sw.js
```

### 4. Test API

```bash
# Test API endpoint
curl http://your-site/api/method/iwex_website.api.website.get_website_settings

# Should return JSON with website settings
```

### 5. Check Browser Console

- Open your site in browser
- Press F12 to open Developer Tools
- Check Console tab
- Should have NO JavaScript errors

---

## Configuration

### Step 1: Configure Website Settings

```bash
# Log in to ERPNext
# Search for: "iWEX Website Settings"
# Or go to: http://your-site/app/iwex-website-settings
```

Fill in:
- **Hero Section**: Title, subtitle, CTA buttons
- **About Section**: Company info, mission, vision
- **Contact**: Email (emails@iwex.in), Phone (+91 97447 83338), Address
- **Social Media**: Your social media URLs
- **SEO**: Meta tags, Google Analytics ID

### Step 2: Add Content

#### Add Services
```
Go to: iWEX Website > iWEX Service > New
- Service Name: e.g., "Web Development"
- Icon Class: e.g., "code" (Lucide icon)
- Short Description: Brief text
- Features: Add multiple features
- Check "Is Published"
```

#### Add FAQs
```
Go to: iWEX Website > iWEX FAQ > New
- Category: General/Services/Pricing/Technical/Support
- Question: Your question
- Answer: Detailed answer (HTML supported)
- Check "Is Published"
```

#### Add Testimonials
```
Go to: iWEX Website > iWEX Testimonial > New
- Client Name: Customer name
- Company: Company name
- Testimonial Text: Their feedback
- Rating: 1-5 stars
- Check "Is Published"
```

---

## Troubleshooting

### Issue: Assets Not Loading

**Solution:**
```bash
# Clear cache
bench --site [your-site] clear-cache
bench --site [your-site] clear-website-cache

# Restart
bench restart
```

### Issue: Website Shows 404

**Solution:**
```bash
# Check if app is installed
bench --site [your-site] list-apps

# If not listed, install it
bench --site [your-site] install-app iwex_website
```

### Issue: API Errors

**Solution:**
```bash
# Check logs
bench --site [your-site] logs

# Or watch in real-time
tail -f ~/frappe-bench/logs/web.log
```

### Issue: Permission Denied

**Solution:**
```bash
# Fix permissions
cd ~/frappe-bench
sudo chown -R frappe:frappe apps/iwex_website
sudo chown -R frappe:frappe sites/assets/iwex_website
```

---

## What's Included

### Backend (Python)
- ✅ 5 DocTypes (Settings, Service, FAQ, Testimonial, Service Feature)
- ✅ 6 API endpoints (whitelisted for guest access)
- ✅ Lead creation from contact form
- ✅ Email notifications
- ✅ Newsletter subscription

### Frontend (HTML/JS/Vue)
- ✅ Responsive landing page
- ✅ Vue 3 components (Services, FAQ, Testimonials, Contact Form)
- ✅ Smooth animations (AOS)
- ✅ Mobile-responsive design
- ✅ SEO optimized

### PWA Features
- ✅ Service worker for offline support
- ✅ PWA manifest
- ✅ Installable on mobile/desktop
- ✅ Offline fallback page

### Documentation
- ✅ 15+ comprehensive guides
- ✅ Installation instructions
- ✅ ERPNext DocType mapping
- ✅ API documentation
- ✅ Testing procedures

---

## Next Steps

1. ✅ **Install** - Follow steps above
2. ✅ **Configure** - Fill in Website Settings
3. ✅ **Add Content** - Services, FAQs, Testimonials
4. ✅ **Upload Icons** - PWA icons (72x72 to 512x512)
5. ✅ **Test** - Verify all functionality
6. ✅ **Go Live** - Deploy to production

---

## Alternative: Manual Installation

If you prefer to install without the build step:

```bash
# Clone manually
cd ~/frappe-bench/apps
git clone https://github.com/iWEX-Infomatics/iWebsite.git iwex_website

# Install Python package
cd ~/frappe-bench
pip install -e apps/iwex_website

# Install on site
bench --site [your-site] install-app iwex_website --skip-assets

# Migrate and restart
bench --site [your-site] migrate
bench restart
```

---

## Success Indicators

After successful installation:

✅ No build errors during installation  
✅ App listed in `bench list-apps`  
✅ Website accessible at root URL  
✅ No JavaScript console errors  
✅ API endpoints responding  
✅ iWEX Website Settings accessible  
✅ Assets loading correctly  

---

## Support

**Contact Information:**
- Email: emails@iwex.in
- Phone: +91 97447 83338
- Address: S41, SBC2, Thapasya, Phase 1, Infopark Kochi, Kerala, India - 682042
- GitHub: https://github.com/iWEX-Infomatics/iWebsite/issues

**Documentation:**
- Quick Start: `QUICK_START.md`
- ERPNext Integration: `ERPNEXT_DOCTYPE_MAPPING.md`
- Testing Guide: `TESTING.md`
- Features List: `FEATURES.md`

---

## Summary

**Commit**: `8f6ffa1`  
**Message**: "fix: remove build.json and use direct asset paths for CDN-based app"  
**Status**: ✅ **READY FOR INSTALLATION**  
**Tested**: Yes, build process bypassed successfully  

**The app is now ready to install without any build errors!** 🚀

---

**Last Updated**: December 16, 2025  
**Version**: 0.0.1  
**Fix Applied**: Build system removed for CDN-based app

