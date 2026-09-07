# Bike World - Premium Bike Spare Parts E-Commerce Website

![Bike World](https://img.shields.io/badge/Bike%20World-Live-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)

Welcome to **Bike World**, a professional e-commerce platform for premium motorcycle spare parts and accessories in Pakistan. This website provides a seamless shopping experience with a wide range of authentic bike components.

## 🚀 Features

- **Responsive Design** - Works perfectly on desktop, tablet, and mobile devices
- **Product Catalog** - Browse 12+ categories of motorcycle spare parts
- **Shopping Cart** - Add products to cart with quantity management
- **Search & Filter** - Find products by name and category
- **Product Details** - Detailed information for each product
- **About Page** - Learn about Bike World's mission and values
- **Contact Form** - Easy-to-use contact form with business information
- **FAQ Section** - Frequently asked questions and answers
- **Modern UI** - Beautiful gradient designs and smooth animations
- **Local Storage** - Cart data persists across sessions

## 📁 File Structure

```
bike-world/
├── index.html           # Homepage with featured products
├── products.html        # Products page with search and filters
├── cart.html           # Shopping cart management
├── about.html          # About Bike World page
├── contact.html        # Contact form and information
├── styles.css          # Main stylesheet with responsive design
├── script.js           # JavaScript functionality for cart and forms
└── README.md           # This file
```

## 🛠️ Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with flexbox and grid
- **JavaScript (ES6)** - Dynamic functionality
- **Font Awesome** - Icon library
- **Local Storage API** - Client-side data persistence

## 📱 Pages Overview

### 1. **Homepage (index.html)**
- Eye-catching hero section
- Featured product showcase
- Category browsing
- Why Choose Us section
- Newsletter subscription form

### 2. **Products Page (products.html)**
- Complete product catalog with 12+ items
- Search functionality
- Category filtering
- Add to cart feature
- Responsive grid layout

### 3. **Shopping Cart (cart.html)**
- View all cart items
- Update quantities
- Remove items
- Order summary with total calculation
- Checkout button

### 4. **About Page (about.html)**
- Company story and mission
- Commitment to quality
- Reasons to choose Bike World
- Team information
- Call-to-action buttons

### 5. **Contact Page (contact.html)**
- Business contact information
- Contact form
- Embedded Google Map
- FAQ section
- Business hours

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No server-side setup required for basic functionality

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/nouman17-tech/bike-world.git
   cd bike-world
   ```

2. **Open in browser:**
   - Simply open `index.html` in your web browser
   - Or use a local server (recommended):
     ```bash
     # Using Python 3
     python -m http.server 8000
     
     # Using Node.js (with http-server)
     npx http-server
     ```

3. **Access the website:**
   - Open `http://localhost:8000` in your browser

## 💳 Shopping Cart Features

- **Add to Cart** - Click the "Add to Cart" button on any product
- **View Cart** - Click the shopping cart icon in the navigation
- **Manage Quantities** - Use +/- buttons or input directly
- **Remove Items** - Click the "Remove" button
- **Order Summary** - See subtotal, shipping, and total
- **Data Persistence** - Cart data is saved in browser's local storage

## 🎨 Customization

### Change Colors
Edit the color variables in `styles.css`:
```css
.logo { color: #ff6b35; }  /* Primary color */
.btn-primary { background-color: #ff6b35; }  /* Button color */
```

### Update Contact Information
Edit in `contact.html` and `footer` sections:
```html
<p>Email: your-email@bikeworld.pk</p>
<p>Phone: +92-XXX-XXXXXXX</p>
```

### Add More Products
Add entries to the products array in `script.js`:
```javascript
{ 
  id: 13, 
  name: 'New Product', 
  price: 5000, 
  description: 'Product description', 
  category: 'category-name' 
}
```

## 📊 Product Categories

1. Engine Oil
2. Brakes & Safety
3. Filters
4. Drivetrain
5. Ignition
6. Electrical
7. Tires
8. Transmission
9. Controls
10. Lighting
11. Suspension
12. Fuel System

## 🌐 Deployment Options

### Deploy to GitHub Pages
1. Push your repository to GitHub
2. Go to Settings → Pages
3. Set source to `main` branch
4. Your site will be available at `https://yourusername.github.io/bike-world`

### Deploy to Netlify
1. Connect your GitHub repository
2. Set build command: (leave empty for static site)
3. Set publish directory: `/` (root)
4. Deploy!

### Deploy to Vercel
1. Import your GitHub repository
2. Configure project settings (no build needed)
3. Deploy!

## 📝 Browser Compatibility

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers

## 🔒 Features & Security

- **Client-side only** - No backend required
- **Local storage** - Cart data stored locally on device
- **HTTPS ready** - Can be deployed with SSL
- **No sensitive data collection** - Demo form submission

## 📈 SEO Optimization

- Semantic HTML5 structure
- Meta tags for descriptions
- Responsive design
- Fast loading times
- Clean URL structure

## 🤝 Contributing

Feel free to fork this project and submit pull requests with improvements!

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**Nouman Ahmed**
- GitHub: [@nouman17-tech](https://github.com/nouman17-tech)

## 📞 Support

For questions or support:
- Email: info@bikeworld.pk
- Phone: +92-300-1234567
- Visit: [Contact Page](contact.html)

## 🎯 Future Enhancements

- [ ] Backend integration with Node.js/Express
- [ ] User authentication system
- [ ] Payment gateway integration (JazzCash, EasyPaisa)
- [ ] Product image gallery
- [ ] Customer reviews and ratings
- [ ] Wishlist feature
- [ ] Order history and tracking
- [ ] Admin dashboard
- [ ] Email notifications
- [ ] Multi-language support

## 📚 Resources Used

- [Font Awesome Icons](https://fontawesome.com/)
- [Google Fonts](https://fonts.google.com/)
- [CSS Grid & Flexbox](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout)
- [JavaScript ES6](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)

---

**Made with ❤️ by Nouman Ahmed**

Visit the live site: [Bike World](https://github.com/nouman17-tech/bike-world)