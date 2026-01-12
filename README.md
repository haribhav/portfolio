# Tech Portfolio

A modern, accessible, and performant portfolio website built with vanilla HTML, CSS, and JavaScript.

## ✨ Features

### Core Features
- ✅ Responsive design (mobile-first)
- ✅ Dark mode support with theme toggle
- ✅ Smooth scrolling navigation
- ✅ Interactive animations and transitions
- ✅ Contact form with validation
- ✅ Progressive Web App (PWA) support
- ✅ Offline functionality via Service Worker

### Accessibility
- ✅ ARIA labels and roles
- ✅ Keyboard navigation support
- ✅ Skip to main content link
- ✅ Focus indicators
- ✅ Reduced motion support
- ✅ Semantic HTML5

### SEO
- ✅ Meta tags and Open Graph
- ✅ Structured data (JSON-LD)
- ✅ Sitemap.xml
- ✅ Robots.txt
- ✅ Semantic markup

### Performance
- ✅ Optimized animations with `will-change`
- ✅ Lazy loading ready
- ✅ Service Worker caching
- ✅ Minified asset support
- ✅ Efficient scroll handlers

## 🚀 Getting Started

### Local Development

Simply open `index.html` in a web browser or use a local server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (http-server)
npx http-server

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000` in your browser.

### Production Deployment

1. Update the meta tags in `index.html` with your actual information:
   - Replace `yourportfolio.com` with your domain
   - Update social media links
   - Add your actual email and contact info

2. Create PWA icons:
   - Generate `icon-192.png` and `icon-512.png`
   - Place them in the root directory

3. Deploy to your hosting:
   - Netlify, Vercel, GitHub Pages, etc.
   - Ensure `.htaccess` is supported (for Apache)

## 📁 Project Structure

```
tech-portfolio/
├── index.html          # Main HTML file
├── styles.css          # All styles (with dark mode)
├── manifest.json       # PWA manifest
├── sw.js              # Service Worker
├── robots.txt         # SEO robots file
├── sitemap.xml        # SEO sitemap
├── .htaccess          # Apache server config
├── js/                # JavaScript modules
│   ├── main.js        # Entry point
│   ├── navigation.js  # Navigation functionality
│   ├── animations.js  # Animation handlers
│   ├── form.js        # Form validation
│   └── theme.js       # Dark mode toggle
└── README.md          # This file
```

## 🛠️ Customization

### Colors
Edit CSS variables in `styles.css`:
```css
:root {
    --primary-color: #2563eb;
    --secondary-color: #64748b;
    /* ... */
}
```

### Content
- Update personal information in `index.html`
- Modify project cards in the Projects section
- Adjust skills and stats in About section

### PWA
- Update `manifest.json` with your app details
- Add actual icon files (192x192 and 512x512 PNG)

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🔧 Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS variables
- **Vanilla JavaScript (ES6+)** - Modular, modern JS
- **Service Worker API** - PWA functionality
- **Intersection Observer API** - Efficient scroll animations
- **LocalStorage API** - Theme persistence

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Feel free to fork this project and customize it for your own portfolio!

---

**Note:** Remember to update all placeholder content (email addresses, social links, project URLs) with your actual information before deploying.
