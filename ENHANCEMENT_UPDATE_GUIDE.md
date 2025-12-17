# iWEX Website Enhancement Update Guide

## 🎉 New Features Added

### 1. Dark Mode Toggle
- Automatic theme detection based on system preferences
- Manual toggle button (top-right corner)
- Persists user preference in localStorage
- Smooth transitions between themes

### 2. Interactive Chatbot Widget
- WhatsApp integration (+919349125225)
- Telegram integration (@iWEXinfo_bot)
- Quick action buttons for common inquiries
- Founder profile image integration
- Configurable greeting message

### 3. Enhanced Settings
**New Sections in iWEX Website Settings:**
- **Founder Profile**: Name, Title, Image, Bio, Certifications
- **Chatbot Configuration**: WhatsApp numbers, Telegram bot, greeting message
- **Client Logos**: Integration with Customer DocType
- **Hero Statistics**: Clients count, years, industries, projects, team size

### 4. New API Endpoint
- `get_client_logos()` - Fetches client logos from Customer DocType with images

---

## 📦 Update Instructions

### For UAT Site (uat.iwexinfomatics.com)

```bash
# Step 1: Navigate to app directory
cd ~/frappe-bench/apps/iwex_website

# Step 2: Pull latest changes
git pull origin main

# Step 3: Reload the updated DocType
bench --site uat.iwexinfomatics.com console
```

In console:
```python
from frappe.modules.utils import reload_doc

# Reload updated DocType
reload_doc("iwex_website", "doctype", "iwex_website_settings", force=True)

# Commit changes
frappe.db.commit()

exit()
```

```bash
# Step 4: Clear cache and restart
bench --site uat.iwexinfomatics.com clear-cache
sudo supervisorctl restart frappe-bench-web:
sudo supervisorctl restart frappe-bench-workers:
```

### For Production Site (www.iwex.in)

**Same steps as above**, just replace `uat.iwexinfomatics.com` with `www.iwex.in`

---

## ⚙️ Configuration Steps

### 1. Update iWEX Website Settings

Go to: `https://uat.iwexinfomatics.com/app/iwex-website-settings`

#### Branding Section
- Upload Company Logo (Light)
- Upload Company Logo (Dark) - optional
- Upload Favicon

#### Founder Profile
- **Founder Name**: Ameer Babu
- **Founder Title**: Founder & Chief Consultant
- **Founder Image**: Upload from `/files/Ameer Babu.png` (already in your system)
- **Founder Bio**:
  ```
  Ameer Babu is the Founder and Chief Consultant at iWEX Infomatics, bringing over 9 years of ERPNext expertise. 
  As the world's first Frappe Certified Consultant in Manufacturing, HR & Payroll, she has successfully implemented 
  150+ ERP solutions across diverse industries in Kerala and beyond.
  ```
- **Certifications**: 
  ```
  World's First Frappe Certified Consultant (Manufacturing, HR & Payroll)
  ```

#### Chatbot Configuration
- ☑ **Enable Chatbot Widget**: Checked
- **WhatsApp Business Number**: `+919349125225`
- **WhatsApp API Number**: `+919744763336`
- **Telegram Bot Username**: `@iWEXinfo_bot`
- **Telegram Bot ID**: `iWEX-bot`
- **Chatbot Greeting Message**:
  ```
  Hello! 👋 Welcome to iWEX Infomatics.
  
  I'm here to help you with ERPNext Manufacturing, HR & Payroll solutions.
  ```

#### Client Logos (from Customer DocType)
- ☑ **Show Client Logos on Homepage**: Checked
- **Customer Filter**: Leave blank (will show all enabled customers with images)
- **Maximum Logos to Display**: `12`

#### Hero Statistics
- **Happy Clients**: `150`
- **Years Experience**: `9`
- **Industries Served**: `5`
- **Projects Completed**: `200`
- **Team Size**: `15`

**Save the settings**

---

### 2. Add Client Logos to Customer DocType

To display client logos on the homepage:

1. Go to **Customer** list
2. Open each client you want to showcase
3. Upload their logo in the **Image** field
4. Save

The website will automatically fetch and display these logos!

---

### 3. Download Images from Reference Website

You mentioned: `https://athira-351.github.io/iwex-infomatics-website/`

**To download images:**

#### Method 1: Browser DevTools
1. Open the reference website
2. Right-click on any image → "Open image in new tab"
3. Save the image
4. Upload to ERPNext File Manager

#### Method 2: Inspect Element
1. Right-click on image → "Inspect"
2. Find the `<img src="...">` tag
3. Copy the image URL
4. Open in browser and save

#### Method 3: Use wget (on server)
```bash
# Download specific image
wget https://athira-351.github.io/iwex-infomatics-website/assets/image-name.png -O /tmp/image-name.png

# Then upload via ERPNext File Manager
```

---

## 🎨 How It Works

### Dark Mode
- Toggle button appears at top-right (below navbar)
- Clicking switches between light/dark themes
- Preference saved in browser localStorage
- Respects system dark mode preference by default

### Chatbot Widget
- Chat bubble appears at bottom-right corner
- Click to open chat window
- Select from quick action buttons:
  - 🏭 Manufacturing ERP Solutions
  - 👥 HR & Payroll Management
  - 💰 Pricing & Packages
  - 📅 Schedule a Demo
- After selecting, choose to continue on:
  - **WhatsApp** (opens with pre-filled message)
  - **Telegram** (opens bot conversation)

### Client Logos
- Automatically fetched from Customer DocType
- Only shows customers with images uploaded
- Displays in a scrolling carousel (if more than 6)
- Grayscale by default, color on hover

---

## 🧪 Testing Checklist

After updating, test these features:

### Dark Mode
- [ ] Toggle button visible and clickable
- [ ] Theme switches correctly
- [ ] All text remains readable in dark mode
- [ ] Images and logos display properly
- [ ] Preference persists after page refresh

### Chatbot
- [ ] Chat button appears at bottom-right
- [ ] Click opens chat window
- [ ] Founder image displays (Ameer Babu photo)
- [ ] Quick actions work
- [ ] WhatsApp link opens with correct number (+919349125225)
- [ ] Telegram link opens correct bot (@iWEXinfo_bot)
- [ ] Messages display correctly
- [ ] Close button works

### Settings
- [ ] All new fields visible in Settings page
- [ ] Can upload images successfully
- [ ] Statistics display on homepage
- [ ] Founder profile visible (if you add a section in HTML)

### Client Logos
- [ ] API endpoint works: `/api/method/iwex_website.api.website.get_client_logos`
- [ ] Returns customer images correctly
- [ ] Logos display on homepage (needs frontend implementation)

---

## 🔧 Troubleshooting

### Dark Mode Not Working
```bash
# Clear browser cache
Ctrl+Shift+R (hard refresh)

# Check browser console for errors
F12 → Console tab
```

### Chatbot Not Appearing
```bash
# Verify settings
bench --site uat.iwexinfomatics.com console
```
```python
settings = frappe.get_doc("iWEX Website Settings", "iWEX Website Settings")
print(settings.enable_chatbot)  # Should be 1
print(settings.whatsapp_business_number)  # Should be +919349125225
exit()
```

### WhatsApp Link Not Working
- Verify number format: `+919349125225` (no spaces, hyphens, or brackets)
- Test manually: `https://wa.me/919349125225`

### Images Not Displaying
```bash
# Check file permissions
ls -la ~/frappe-bench/sites/uat.iwexinfomatics.com/public/files/

# Verify image path in database
bench --site uat.iwexinfomatics.com console
```
```python
settings = frappe.get_doc("iWEX Website Settings", "iWEX Website Settings")
print(settings.founder_image)  # Should show /files/Ameer Babu.png or similar
exit()
```

---

## 📱 Mobile Testing

Test on real devices:
1. iPhone Safari
2. Android Chrome
3. Tablet (iPad/Android)

Check:
- Dark mode toggle accessible
- Chatbot button doesn't overlap content
- WhatsApp/Telegram links open native apps
- Touch targets are large enough (min 48x48px)

---

## 🚀 Next Steps

1. **Update and test on UAT** first
2. **Fill in all settings** with real data
3. **Upload client logos** to Customer DocType
4. **Upload Ameer Babu's photo** (already done: /files/Ameer Babu.png)
5. **Test all features** thoroughly
6. **Deploy to production** (www.iwex.in)

---

## 📞 Support

If you encounter any issues:
1. Check browser console (F12 → Console)
2. Check ERPNext error logs (Settings → Error Log)
3. Verify all settings are saved correctly

---

**Commit**: `9032bf2`  
**Date**: December 17, 2025  
**Repository**: https://github.com/iWEX-Infomatics/iWebsite.git

---

Happy launching! 🎉

