# Deployment Guide - iWEX Website

## Production Deployment Checklist

### Pre-Deployment

- [ ] Test all features in development/staging environment
- [ ] Verify all DocTypes are created and configured
- [ ] Check API endpoints are working
- [ ] Test PWA installation on mobile devices
- [ ] Optimize and compress all images
- [ ] Review and update SEO meta tags
- [ ] Test contact form submissions
- [ ] Verify email notifications are working
- [ ] Test on multiple browsers (Chrome, Firefox, Safari, Edge)
- [ ] Test on multiple devices (Desktop, Tablet, Mobile)
- [ ] Run Lighthouse audit (target score > 90)

### Deployment Steps

#### 1. Prepare Production Environment

```bash
# Switch to production branch
cd /path/to/frappe-bench
bench switch-to-branch version-15 frappe erpnext

# Update bench
bench update --patch
```

#### 2. Get the App

```bash
# From Git repository
bench get-app https://github.com/iWEX-Infomatics/iWebsite.git

# Or from local directory
bench get-app /path/to/iwex_website
```

#### 3. Install on Production Site

```bash
# Install app
bench --site production.site install-app iwex_website

# Migrate database
bench --site production.site migrate

# Build assets in production mode
bench build --app iwex_website --production

# Clear cache
bench --site production.site clear-cache
bench --site production.site clear-website-cache
```

#### 4. Configure Production Settings

Edit `sites/production.site/site_config.json`:

```json
{
    "enable_frappe_cache": 1,
    "cache_ttl": 3600,
    "http_timeout": 300,
    "socketio_port": 9000,
    "webserver_port": 8000,
    "developer_mode": 0,
    "maintenance_mode": 0
}
```

#### 5. Setup SSL Certificate

```bash
# Using Let's Encrypt
sudo bench setup lets-encrypt production.site

# Or manually configure SSL in nginx
```

#### 6. Configure Nginx

```bash
# Generate nginx config
bench setup nginx

# Reload nginx
sudo service nginx reload
```

#### 7. Setup Supervisor

```bash
# Generate supervisor config
bench setup supervisor

# Reload supervisor
sudo supervisorctl reread
sudo supervisorctl update
sudo supervisorctl restart all
```

#### 8. Restart Services

```bash
# Restart bench
bench restart

# Or restart individual services
sudo supervisorctl restart frappe-bench-web:
sudo supervisorctl restart frappe-bench-workers:
```

### Post-Deployment

#### 1. Configure Website Settings

1. Log in to ERPNext
2. Navigate to **iWEX Website Settings**
3. Fill in all sections:
   - Hero content
   - About information
   - Contact details
   - Social media links
   - SEO meta tags
   - Google Analytics ID

#### 2. Add Content

1. **Services**: Add at least 3-6 services
2. **FAQs**: Add 10-15 frequently asked questions
3. **Testimonials**: Add 3-5 client testimonials

#### 3. Upload Images

Upload the following images to `sites/assets/iwex_website/images/`:

**PWA Icons** (required for PWA):
- icon-72x72.png
- icon-96x96.png
- icon-128x128.png
- icon-144x144.png
- icon-152x152.png
- icon-192x192.png
- icon-384x384.png
- icon-512x512.png

**Website Images**:
- hero-illustration.svg (or .png)
- about-illustration.svg (or .png)
- favicon.ico

#### 4. Test Production Site

- [ ] Visit homepage: https://production.site/
- [ ] Test all navigation links
- [ ] Submit contact form
- [ ] Check email notifications
- [ ] Test PWA installation
- [ ] Test offline functionality
- [ ] Verify analytics tracking
- [ ] Test on mobile devices

#### 5. Performance Optimization

```bash
# Enable Redis cache
bench config redis_cache redis://localhost:6379

# Enable Redis queue
bench config redis_queue redis://localhost:6379

# Set worker processes
bench config -g workers 4
```

#### 6. Setup Backups

```bash
# Enable automatic backups
bench --site production.site enable-scheduler

# Configure backup settings in site_config.json
{
    "backup_limit": 3,
    "backup_path": "/path/to/backups"
}

# Manual backup
bench --site production.site backup --with-files
```

#### 7. Setup Monitoring

**Install monitoring tools**:
```bash
# Install Prometheus exporter (optional)
pip install prometheus-client

# Setup log rotation
sudo nano /etc/logrotate.d/frappe-bench
```

**Monitor logs**:
```bash
# Watch error logs
bench --site production.site logs

# Watch web logs
tail -f logs/web.log

# Watch worker logs
tail -f logs/worker.log
```

### Security Checklist

- [ ] SSL certificate installed and working
- [ ] HTTPS redirect enabled
- [ ] Security headers configured
- [ ] CORS properly configured
- [ ] API rate limiting enabled
- [ ] Strong passwords for admin accounts
- [ ] Two-factor authentication enabled
- [ ] Regular security updates applied
- [ ] Firewall configured
- [ ] Backup encryption enabled

### Performance Checklist

- [ ] Redis cache enabled
- [ ] Asset minification enabled
- [ ] Gzip compression enabled
- [ ] Image optimization done
- [ ] CDN configured (optional)
- [ ] Database indexes optimized
- [ ] Slow query log enabled
- [ ] Caching headers configured

### SEO Checklist

- [ ] Meta titles and descriptions set
- [ ] Open Graph tags configured
- [ ] Twitter Card tags configured
- [ ] Sitemap generated
- [ ] Robots.txt configured
- [ ] Google Analytics installed
- [ ] Google Search Console verified
- [ ] Schema.org markup added (optional)

## Updating the App

### Minor Updates

```bash
# Pull latest changes
cd apps/iwex_website
git pull origin main

# Build and restart
cd ../..
bench build --app iwex_website
bench restart
```

### Major Updates

```bash
# Backup first
bench --site production.site backup --with-files

# Pull changes
cd apps/iwex_website
git pull origin main

# Migrate
cd ../..
bench --site production.site migrate

# Build
bench build --app iwex_website --production

# Clear cache
bench --site production.site clear-cache

# Restart
bench restart
```

## Rollback Procedure

If something goes wrong:

```bash
# Restore from backup
bench --site production.site restore /path/to/backup.sql.gz --with-private-files /path/to/private-files.tar

# Or revert to previous version
cd apps/iwex_website
git checkout previous-commit-hash
cd ../..
bench build --app iwex_website
bench restart
```

## Monitoring & Maintenance

### Daily Tasks
- Check error logs
- Monitor server resources
- Verify backups completed

### Weekly Tasks
- Review analytics
- Check for updates
- Test critical functionality

### Monthly Tasks
- Security audit
- Performance review
- Update content
- Review and respond to contact form submissions

## Support & Resources

- **Documentation**: https://docs.erpnext.com
- **Frappe Forum**: https://discuss.erpnext.com
- **GitHub Issues**: https://github.com/your-org/iwex_website/issues

## Emergency Contacts

- System Administrator: admin@yourcompany.com
- Technical Support: support@yourcompany.com
- Emergency Hotline: +1 (555) 123-4567

