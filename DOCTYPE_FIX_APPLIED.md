# DocType Structure Fix Applied

## Problem Identified
The DocTypes were structured incorrectly. They were placed in individual module folders like:
```
iwex_website/iwex_website/iwex_website_settings/doctype/iwex_website_settings/
iwex_website/iwex_website/iwex_service/doctype/iwex_service/
```

This caused the error: `Module  not found` (empty module name) when trying to reload DocTypes.

## Solution Applied
Restructured the app to follow Frappe's standard directory structure:

### Changes Made:
1. **Moved all DocTypes** to `iwex_website/iwex_website/doctype/`:
   - `iwex_website_settings`
   - `iwex_service`
   - `iwex_service_feature`
   - `iwex_faq`
   - `iwex_testimonial`

2. **Created `modules.txt`** to register the "iWEX Website" module

3. **Created module folder** `iwex_website/iwex_website/iwex_website/` for the module

4. **Removed old module folders** that were incorrectly structured

### New Directory Structure:
```
iwex_website/
├── iwex_website/
│   ├── doctype/
│   │   ├── __init__.py
│   │   ├── iwex_website_settings/
│   │   │   ├── __init__.py
│   │   │   ├── iwex_website_settings.json
│   │   │   └── iwex_website_settings.py
│   │   ├── iwex_service/
│   │   ├── iwex_service_feature/
│   │   ├── iwex_faq/
│   │   └── iwex_testimonial/
│   ├── iwex_website/          # Module folder
│   │   └── __init__.py
│   ├── modules.txt             # Module registration
│   ├── api/
│   ├── config/
│   ├── public/
│   ├── templates/
│   ├── www/
│   └── hooks.py
├── setup.py
└── ...
```

## Installation Instructions for User

### Step 1: Remove the old app
```bash
cd ~/frappe-bench
bench remove-app iwex_website
rm -rf apps/iwex_website
```

### Step 2: Get the updated app
```bash
bench get-app https://github.com/iWEX-Infomatics/iWebsite.git --skip-assets
```

### Step 3: Install on site
```bash
bench --site www.iwex.in install-app iwex_website
```

### Step 4: Verify DocTypes
```bash
bench --site www.iwex.in console
```

Then in the console:
```python
# Check if DocTypes exist
frappe.get_all("DocType", filters={"module": "iWEX Website"}, fields=["name"])

# Should return:
# [
#   {'name': 'iWEX Website Settings'},
#   {'name': 'iWEX Service'},
#   {'name': 'iWEX Service Feature'},
#   {'name': 'iWEX FAQ'},
#   {'name': 'iWEX Testimonial'}
# ]

exit()
```

### Step 5: Access the website
- Navigate to: `http://www.iwex.in/index.html` or your configured domain
- Access settings: Go to ERPNext > Search for "iWEX Website Settings"

## What This Fixes
✅ DocTypes will now appear in the DocType list
✅ "iWEX Website Settings" page will be accessible
✅ Module will be properly registered in Frappe
✅ Migration and reload commands will work correctly

## Commit Details
- **Commit**: 8db7e04
- **Message**: "fix: Restructure DocTypes to correct Frappe directory structure"
- **Branch**: main
- **Pushed to**: https://github.com/iWEX-Infomatics/iWebsite.git

