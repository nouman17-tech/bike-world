# Bike World - XAMPP Setup Guide

This guide will help you run the Bike World e-commerce website on XAMPP (Apache local server).

## Prerequisites

- **XAMPP** installed on your computer ([Download XAMPP](https://www.apachefriends.org/))
- **Git** installed (to clone the repository)
- A text editor (VS Code, Sublime Text, etc.)
- Basic knowledge of file paths and command line

## Step 1: Install XAMPP

1. Download XAMPP from [apachefriends.org](https://www.apachefriends.org/)
2. Install it to the default location:
   - **Windows:** `C:\xampp\`
   - **Mac:** `/Applications/XAMPP/`
   - **Linux:** `/opt/lampp/`

## Step 2: Clone the Repository

1. Open your terminal/command prompt
2. Navigate to the XAMPP `htdocs` folder:
   ```bash
   # Windows
   cd C:\xampp\htdocs

   # Mac/Linux
   cd /Applications/XAMPP/htdocs
   ```

3. Clone the Bike World repository:
   ```bash
   git clone https://github.com/nouman17-tech/bike-world.git bike-world
   cd bike-world
   ```

## Step 3: Directory Structure

Your folder structure should look like this:
```
C:\xampp\htdocs\bike-world\
├── index.html
├── products.html
├── cart.html
├── about.html
├── contact.html
├── styles.css
├── script.js
├── server.js
├── package.json
├── assets/
│   ├── images/
│   ├── logos/
│   └── ...
├── public/
└── README.md
```

## Step 4: Start XAMPP

### Windows:
1. Open **XAMPP Control Panel** (from Start Menu)
2. Click **Start** next to "Apache"
3. You should see "Apache" running in green

### Mac:
1. Open **XAMPP Manager** (from Applications → XAMPP)
2. Click **Start** next to Apache
3. Wait for Apache to start (green status)

### Linux:
Open terminal and run:
```bash
sudo /opt/lampp/xampp start
```

## Step 5: Access the Website

1. Open your web browser
2. Go to: **http://localhost/bike-world/**
3. You should see the Bike World homepage

### Accessing Individual Pages:
- **Home:** http://localhost/bike-world/
- **Products:** http://localhost/bike-world/products.html
- **Cart:** http://localhost/bike-world/cart.html
- **About:** http://localhost/bike-world/about.html
- **Contact:** http://localhost/bike-world/contact.html

## Step 6: Verify All Pages Work

Navigate through all pages using the top navigation menu to ensure:
- ✓ Logo loads correctly
- ✓ Navigation links work
- ✓ All styling appears correct
- ✓ JavaScript functionality works (cart, forms, etc.)
- ✓ Images load properly

## Troubleshooting

### Apache Won't Start
- **Problem:** Apache shows red/offline
- **Solution:** 
  - Check if port 80 is already in use
  - Try stopping other web servers (IIS, etc.)
  - Restart XAMPP

### Pages Show 404 Error
- **Problem:** "Not Found" error when accessing pages
- **Solution:**
  - Verify folder is in `htdocs` with correct name (`bike-world`)
  - Check that file names match exactly (case-sensitive on Mac/Linux)
  - Restart Apache

### Styles/Images Not Loading
- **Problem:** CSS or images appear broken
- **Solution:**
  - Open browser DevTools (F12) → Console
  - Check for error messages showing file paths
  - Verify all CSS/JS files are in the root directory
  - Clear browser cache (Ctrl+Shift+Delete or Cmd+Shift+Delete)

### 403 Forbidden Error
- **Problem:** Access denied to folder
- **Solution:**
  - Right-click folder → Properties → Security
  - Make sure you have read/execute permissions
  - On Mac/Linux, check folder ownership

## Common File Paths (DO NOT EDIT)

All files use relative paths for maximum compatibility:

```html
<!-- Correct (relative paths - works on XAMPP) -->
<link rel="stylesheet" href="styles.css">
<script src="script.js"></script>

<!-- Wrong (absolute paths - won't work on XAMPP) -->
<link rel="stylesheet" href="/styles.css">
<script src="http://localhost/bike-world/script.js"></script>
```

## Optional: Enable Directory Listings

To see a file browser at http://localhost/bike-world/ instead of the index page:

1. Open `C:\xampp\apache\conf\httpd.conf`
2. Find the line with `DirectoryIndex index.html index.php`
3. Add `index.php` if not already there
4. Restart Apache

## File Size & Performance Tips

- Clear browser cache before testing changes: **Ctrl+Shift+Delete**
- Disable browser cache during development:
  - Open DevTools (F12)
  - Settings → Gear icon → Check "Disable cache"

## Next Steps

1. **Add Database (MySQL):**
   - Bike World currently uses JavaScript for data
   - To add MySQL, create a `config.php` file in the root

2. **Add PHP Backend:**
   - Create `api/` folder for PHP API routes
   - Update JavaScript to fetch from PHP endpoints

3. **Security:**
   - Don't expose sensitive data in JavaScript
   - Implement server-side validation

## Support

For more information:
- [XAMPP Documentation](https://www.apachefriends.org/faq.html)
- [Apache Web Server Guide](https://httpd.apache.org/docs/)
- Check the main [README.md](README.md)

---

**Version:** 1.0  
**Last Updated:** 2026-10-01  
**Tested on:** XAMPP 7.4+ (Windows, Mac, Linux)
