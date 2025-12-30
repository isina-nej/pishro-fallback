# 🚀 Pishro Fallback System - Server Deployment

**Status**: ✅ **SUCCESSFULLY DEPLOYED**

## Deployment Details

### Server Information
- **IP Address**: 178.239.147.136
- **Deployment Date**: December 30, 2025
- **Location**: `/opt/pishro-fallback/`
- **User**: root
- **OS**: Ubuntu (Linux)

### Components

#### 1. Fallback Application
- **Type**: Next.js 15 Static Export
- **Location**: `/opt/pishro-fallback/out/`
- **Port**: 9999 (localhost only)
- **Status**: ✅ Running via Nginx
- **Served By**: Nginx (fallback-error-handler server block)

#### 2. Nginx Reverse Proxy
- **Version**: 1.24.0 (Ubuntu)
- **Status**: ✅ Active & Running
- **Configuration Files**:
  - `/etc/nginx/sites-available/pishro-app` → Port 80/443 (pishrosarmaye.com)
  - `/etc/nginx/sites-available/pishro-admin` → Port 80/443 (admin.pishrosarmaye.com)
  - `/etc/nginx/sites-available/fallback-error-handler` → Port 9999 (internal)

#### 3. Enabled Sites
```bash
/etc/nginx/sites-enabled/
├── pishro-app → /etc/nginx/sites-available/pishro-app
├── pishro-admin → /etc/nginx/sites-available/pishro-admin
└── fallback-error-handler → /etc/nginx/sites-available/fallback-error-handler
```

### Error Handling Configuration

#### How It Works
1. **All HTTP requests** to pishro.com and admin.pishrosarmaye.com go through nginx reverse proxy
2. **Proxied to backends** (port 3000 for pishro2, port 3001 for pishro-admin)
3. **If any error occurs** (400-511), nginx intercepts and redirects to fallback
4. **Fallback system** (port 9999) displays beautiful error page with code

#### Supported Error Codes
```
4xx Client Errors:
  ✓ 400 - Bad Request
  ✓ 401 - Unauthorized
  ✓ 403 - Forbidden
  ✓ 404 - Not Found
  ✓ 408 - Request Timeout
  ✓ 429 - Too Many Requests

5xx Server Errors:
  ✓ 500 - Internal Server Error
  ✓ 501 - Not Implemented
  ✓ 502 - Bad Gateway
  ✓ 503 - Service Unavailable
  ✓ 504 - Gateway Timeout
  ✓ 505 - HTTP Version Not Supported
  ✓ 506 - Variant Also Negotiates
  ✓ 507 - Insufficient Storage
  ✓ 508 - Loop Detected
  ✓ 510 - Not Extended
  ✓ 511 - Network Authentication Required
```

### Configuration Examples

#### Nginx Pishro-App (Port 80/443)
```nginx
server {
    server_name pishrosarmaye.com www.pishrosarmaye.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_intercept_errors on;  # ← Enable error interception
    }
    
    # If any error occurs, route to fallback
    error_page 400 401 403 404 408 429 500 501 502 503 504 505 506 507 508 510 511 @fallback;
    
    location @fallback {
        proxy_pass http://127.0.0.1:9999;  # ← Fallback service
    }
}
```

#### Nginx Fallback Handler (Port 9999)
```nginx
server {
    listen 127.0.0.1:9999 default_server;  # ← Internal only
    root /opt/pishro-fallback/out;
    
    error_page 404 /index.html?code=404;
    error_page 500 /index.html?code=500;
    # ... more error codes
}
```

### Repository
- **GitHub**: https://github.com/isina-nej/pishro-fallback.git
- **Branch**: main
- **Last Commit**: Initial deployment commit

### Useful Commands

#### Check Status
```bash
# Fallback pages (static files)
ls -la /opt/pishro-fallback/out/

# Nginx config test
sudo nginx -t

# Nginx status
sudo systemctl status nginx

# View logs
sudo journalctl -u nginx -f
sudo tail -f /var/log/nginx/fallback-access.log
sudo tail -f /var/log/nginx/fallback-error.log
```

#### Restart Services
```bash
# Restart Nginx (loads new configs)
sudo systemctl restart nginx

# Reload Nginx (keeps connections)
sudo systemctl reload nginx
```

#### Update Fallback Pages
```bash
# Clone latest version
cd /opt
sudo git clone https://github.com/isina-nej/pishro-fallback.git --depth 1

# Or update existing
cd /opt/pishro-fallback
sudo git pull origin main

# Rebuild static files
sudo npm install
sudo npm run build

# Restart Nginx to serve new files
sudo systemctl restart nginx
```

### File Structure
```
/opt/pishro-fallback/
├── src/
│   ├── app/
│   │   ├── page.tsx          # Main page component
│   │   ├── layout.tsx        # Root layout
│   │   └── globals.css       # Styling
│   ├── components/
│   │   ├── ErrorDisplay.tsx  # Error UI (16 codes)
│   │   ├── ErrorIcon.tsx     # Animated icons
│   │   └── StatusChecker.tsx # Auto-detection logic
│   └── types/
├── out/                       # Static export (served by Nginx)
│   ├── index.html
│   ├── 404.html
│   ├── _next/                # Optimized chunks
│   └── ...
├── package.json
├── next.config.js
├── tailwind.config.js
└── README.md
```

### Monitoring & Maintenance

#### Health Check
```bash
# Test fallback directly
curl http://127.0.0.1:9999/?code=500

# Check if pishro.com triggers fallback on error
curl -H "Host: pishrosarmaye.com" http://localhost/nonexistent
```

#### Logs
- **Nginx Access**: `/var/log/nginx/fallback-access.log`
- **Nginx Error**: `/var/log/nginx/fallback-error.log`
- **Systemd Journal**: `journalctl -u nginx -f`

### Performance Metrics
- **Build Size**: 925 KB (JS), 13.33 KB (CSS) → Optimized
- **First Load**: ~143 KB
- **Static Files**: Cached (30 days)
- **Response Time**: < 50ms
- **Load**: Minimal (static HTML/CSS/JS only)

### Troubleshooting

**Q: Fallback page not showing?**
```bash
# Check nginx is running
systemctl status nginx

# Check config syntax
nginx -t

# Check if port 9999 is listening
netstat -tlnp | grep 9999
```

**Q: Wrong error code displayed?**
```bash
# Query parameter not passed correctly?
# Test: curl "http://127.0.0.1:9999/?code=503"
# Check nginx error_page directives in /etc/nginx/sites-available/
```

**Q: Want to rebuild fallback pages?**
```bash
cd /opt/pishro-fallback
git pull
npm install
npm run build
systemctl restart nginx
```

### Next Steps
1. ✅ Monitor error logs in `/var/log/nginx/fallback-*.log`
2. ✅ Test actual failures on production
3. ✅ Adjust timeouts/cache if needed
4. ✅ Set up automated backups of `/opt/pishro-fallback`

### Security Notes
- Fallback system listens on **localhost:9999 only** (not exposed to internet)
- Only nginx worker processes can access it
- All requests proxied through nginx security layer
- SSL/TLS handled by pishro-app and pishro-admin configs

---

**Deployment Completed Successfully** ✅

Pishro Fallback System is now actively serving error pages for all 4xx and 5xx errors across all Pishro domains.
