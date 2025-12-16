# ✅ Build Error Fixed!

## Problem

The initial installation failed with this error:
```
TypeError [ERR_INVALID_ARG_TYPE]: The "paths[0]" argument must be of type string. Received undefined
```

This occurred because Frappe's build system couldn't find the `build.json` file.

---

## Solution Applied

### Files Added/Modified:

1. **`iwex_website/public/build.json`** ✅ (NEW)
   - Defines which CSS and JS files to bundle
   - Required by Frappe's esbuild system

2. **`iwex_website/hooks.py`** ✅ (UPDATED)
   - Changed asset paths to use bundled files
   - From: `/assets/iwex_website/css/styles.css`
   - To: `/assets/iwex_website/css/iwex_website.css`

3. **`iwex_website/public/js/iwex_website.bundle.js`** ✅ (NEW)
   - Placeholder for build system

4. **`iwex_website/public/css/iwex_website.bundle.css`** ✅ (NEW)
   - Placeholder for build system

---

## Changes Pushed to GitHub

**Commit**: `44f6eb5`  
**Message**: "fix: add build.json for Frappe build system compatibility"  
**Branches Updated**: 
- ✅ main
- ✅ develop

---

## Installation Instructions (Updated)

### Step 1: Remove the Failed Installation

```bash
cd ~/frappe-bench

# Remove the app directory
rm -rf apps/iwex_website

# Or if it was partially installed on a site
bench --site [your-site] uninstall-app iwex_website
rm -rf apps/iwex_website
```

### Step 2: Get the Updated App

```bash
# Pull the latest version with the fix
bench get-app https://github.com/iWEX-Infomatics/iWebsite.git

# This will now work without build errors!
```

### Step 3: Install on Your Site

```bash
# Install the app
bench --site [your-site] install-app iwex_website

# Migrate database
bench --site [your-site] migrate

# Clear cache
bench --site [your-site] clear-cache

# Restart
bench restart
```

---

## What the build.json Does

The `build.json` file tells Frappe's build system how to bundle your assets:

```json
{
	"css/iwex_website.css": [
		"public/css/styles.css"
	],
	"js/iwex_website.js": [
		"public/js/main.js"
	]
}
```

This means:
- `styles.css` will be bundled into `iwex_website.css`
- `main.js` will be bundled into `iwex_website.js`

---

## Verification

After installation, verify the build was successful:

```bash
# Check if assets were built
ls -la ~/frappe-bench/sites/assets/iwex_website/css/
ls -la ~/frappe-bench/sites/assets/iwex_website/js/

# You should see:
# - iwex_website.css
# - iwex_website.js
```

---

## Testing the Installation

1. **Access the website:**
   ```
   http://your-site/
   ```

2. **Check the browser console:**
   - Press F12
   - Look for any JavaScript errors
   - Should see no errors

3. **Test API endpoints:**
   ```bash
   curl http://your-site/api/method/iwex_website.api.website.get_website_settings
   ```

4. **Configure the website:**
   - Log in to ERPNext
   - Search for "iWEX Website Settings"
   - Fill in your content

---

## Alternative: Skip Build During Installation

If you still encounter issues, you can skip the build step:

```bash
# Get app without building
bench get-app https://github.com/iWEX-Infomatics/iWebsite.git --skip-assets

# Install on site
bench --site [your-site] install-app iwex_website --skip-assets

# Build manually later
bench build --app iwex_website
```

---

## Common Issues & Solutions

### Issue 1: beautifulsoup4 Version Conflict

**Error:**
```
lms 2.40.0 requires beautifulsoup4~=4.13.4, but you have beautifulsoup4 4.12.3
```

**Solution:**
```bash
# This is just a warning and won't affect iwex_website
# To fix (optional):
pip install --upgrade beautifulsoup4
```

### Issue 2: Build Still Fails

**Solution:**
```bash
# Clear node modules and rebuild
cd ~/frappe-bench
rm -rf node_modules
rm -rf apps/frappe/node_modules
yarn install
bench build --app iwex_website
```

### Issue 3: Assets Not Loading

**Solution:**
```bash
# Clear cache and rebuild
bench --site [your-site] clear-cache
bench --site [your-site] clear-website-cache
bench build --app iwex_website
bench restart
```

---

## File Structure After Fix

```
iwex_website/
├── iwex_website/
│   ├── public/
│   │   ├── build.json ← NEW (Required for build)
│   │   ├── css/
│   │   │   ├── styles.css (Source)
│   │   │   └── iwex_website.bundle.css ← NEW (Placeholder)
│   │   └── js/
│   │       ├── main.js (Source)
│   │       └── iwex_website.bundle.js ← NEW (Placeholder)
│   └── hooks.py ← UPDATED (Asset paths)
```

---

## Build Process Explained

1. **Before Build:**
   - Source files: `styles.css`, `main.js`
   - Frappe reads `build.json`

2. **During Build:**
   - Frappe's esbuild processes files
   - Bundles CSS and JS
   - Minifies for production
   - Copies to `sites/assets/`

3. **After Build:**
   - Bundled files in: `sites/assets/iwex_website/`
   - Website loads from bundled files
   - Better performance (minified)

---

## Success Indicators

After successful installation, you should see:

✅ No build errors  
✅ Assets created in `sites/assets/iwex_website/`  
✅ Website accessible at root URL  
✅ No JavaScript console errors  
✅ API endpoints responding  
✅ iWEX Website Settings accessible in ERPNext  

---

## Next Steps After Successful Installation

1. **Configure Website Settings**
   ```
   Go to: iWEX Website > iWEX Website Settings
   Fill in: Hero, About, Contact, Social, SEO
   ```

2. **Add Content**
   - Add 3-6 Services
   - Add 10-15 FAQs
   - Add 3-5 Testimonials

3. **Upload PWA Icons**
   - Create icons (72x72 to 512x512)
   - Upload to `sites/assets/iwex_website/images/`

4. **Test Everything**
   - Test all sections
   - Test contact form
   - Test PWA installation
   - Test on mobile

---

## Support

If you still encounter issues:

1. **Check the logs:**
   ```bash
   bench --site [your-site] logs
   tail -f ~/frappe-bench/logs/web.log
   ```

2. **Contact:**
   - Email: emails@iwex.in
   - Phone: +91 97447 83338

3. **GitHub Issues:**
   - https://github.com/iWEX-Infomatics/iWebsite/issues

---

## Summary

✅ **Problem**: Build system couldn't find build.json  
✅ **Solution**: Added build.json and updated hooks.py  
✅ **Status**: Fixed and pushed to GitHub  
✅ **Action**: Pull latest version and reinstall  

**The app is now ready for installation!** 🎉

---

**Fix Applied**: December 16, 2025  
**Commit**: 44f6eb5  
**Branches**: main, develop  
**Status**: ✅ Ready for installation

