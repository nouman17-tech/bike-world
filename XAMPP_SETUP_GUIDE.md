# 🚀 XAMPP Setup Guide for Bike World

## Complete Step-by-Step Instructions

### Step 1: Install XAMPP

1. Download XAMPP from https://www.apachefriends.org/download.html
2. Choose your OS:
   - **Windows**: Download the .exe installer
   - **Mac**: Download the .dmg file
   - **Linux**: Download the appropriate package
3. Run the installer and follow prompts
4. Choose installation location (default is fine)
5. Complete installation

### Step 2: Copy Project to XAMPP

**Windows:**
```
C:\xampp\htdocs\bike-world\
```

**Mac:**
```
/Applications/XAMPP/xamppfiles/htdocs/bike-world/
```

**Linux:**
```
/opt/lampp/htdocs/bike-world/
```

Make sure the entire project folder is copied here.

### Step 3: Start XAMPP Services

1. Open XAMPP Control Panel
2. Click **Start** next to:
   - Apache
   - MySQL
3. Both should show green status

### Step 4: Create MySQL Database

1. Open browser: http://localhost/phpmyadmin
2. Click **Databases** tab
3. Create database:
   - **Name**: bike_world
   - **Collation**: utf8mb4_unicode_ci
   - Click **Create**

### Step 5: Run Setup Script

1. Open browser:
   ```
   http://localhost/bike-world/api/setup.php
   ```

2. You should see:
   ```json
   {
     "success": true,
     "message": "Database and sample data are ready.",
     "admin_email": "admin@bikeworld.pk",
     "admin_password": "admin123"
   }
   ```

This creates:
- All database tables
- Admin user
- 6 sample products

### Step 6: Access Your Website

1. Open browser:
   ```
   http://localhost/bike-world/
   ```

2. Website should load successfully!

### Step 7: Admin Login Test

1. Click **Login** in top menu
2. Use these credentials:
   ```
   Email: admin@bikeworld.pk
   Password: admin123
   ```

3. You should see admin dashboard

### Step 8: Create Upload Folder

The upload folder should auto-create when you:
1. Login as admin
2. Try to add a product with an image

If it doesn't create, manually create:
```
bike-world/uploads/
```

## ✅ Troubleshooting

### "Database connection failed"

**Solution:**
- Make sure MySQL is running (green in XAMPP panel)
- Run setup.php again
- Check database "bike_world" exists in phpmyadmin

### "Page not found"

**Solution:**
- Make sure Apache is running
- Check URL: http://localhost/bike-world/
- Verify folder is in htdocs/

### "Setup.php returns error"

**Solution:**
- Click the setup.php link again
- Check MySQL is running
- Verify bike_world database exists

### "Login fails"

**Solution:**
- Run setup.php again to create admin user
- Check email: admin@bikeworld.pk
- Check password: admin123 (exactly)

## 📝 Ports Used

- **Apache**: 80 (http://localhost)
- **MySQL**: 3306
- **PhpMyAdmin**: 80 (http://localhost/phpmyadmin)

## 🔧 Key Folders

```
bike-world/
├── api/
│   ├── db.php           (Database connection)
│   ├── auth.php         (Login/Register)
│   ├── products.php     (Products API)
│   ├── orders.php       (Orders API)
│   └── setup.php        (Database setup)
├── uploads/             (Product images)
├── public/              (Frontend HTML)
├── css/                 (Stylesheets)
└── js/                  (JavaScript)
```

## 🚀 Features Now Working

✅ User Registration  
✅ User Login  
✅ View Products  
✅ Add to Cart  
✅ Checkout  
✅ Admin Login  
✅ Add Products (Admin)  
✅ Manage Orders  

## 💡 Next Steps

1. Add your own products via admin panel
2. Test checkout flow as regular user
3. Customize colors and branding in CSS
4. Add more product categories
5. Deploy to production server

## 📞 Support

If you encounter issues:
1. Check XAMPP panel - both services running?
2. Check browser console for errors (F12)
3. Check terminal for PHP errors
4. Verify all files in correct folders
5. Run setup.php again

---

**Website is now running on XAMPP with MySQL!** 🎉
