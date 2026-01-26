# CalcHub - Scientific Calculator Website

A comprehensive, modern scientific calculator website built with HTML, CSS, and JavaScript. Perfect for students, researchers, and professionals.

## 🌟 Features

- **Multiple Calculator Types**
  - Basic Calculator (arithmetic operations)
  - Scientific Calculator (trigonometry, logarithms, exponentials)
  - Percentage Calculator (multiple percentage calculations)
  - And more to be added...

- **Modern UI/UX**
  - Clean, intuitive interface
  - Dark/Light mode toggle
  - Fully responsive design (mobile, tablet, desktop)
  - Smooth animations and transitions

- **User-Friendly Features**
  - Keyboard support for all calculators
  - Real-time calculations
  - Copy results to clipboard
  - Calculation history display
  - Clear error messages

- **Monetization Ready**
  - Left sidebar for Google AdSense ads
  - Strategic ad placement
  - Non-intrusive advertising layout

## 📁 Project Structure

```
scientific-calculator/
│
├── index.html              # Homepage with navigation
│
├── css/
│   ├── style.css          # Main styles, theme, layout
│   └── calculator.css     # Calculator-specific styles
│
├── js/
│   ├── theme.js           # Dark/Light mode toggle
│   ├── basic-calculator.js
│   ├── scientific-calculator.js
│   └── percentage-calculator.js
│
└── calculators/
    ├── basic.html
    ├── scientific.html
    ├── percentage.html
    └── [more calculators to be added]
```

## 🚀 Getting Started

### Option 1: Local Development

1. Download all files maintaining the folder structure
2. Open `index.html` in your web browser
3. No server required - works directly in browser!

### Option 2: GitHub Pages Deployment

1. Create a new GitHub repository
2. Upload all files maintaining the folder structure
3. Go to Settings > Pages
4. Select main branch and root directory
5. Your site will be live at `https://yourusername.github.io/repository-name`

### Option 3: Cloudflare Pages (Recommended for custom domain)

1. Create a GitHub repository with your files
2. Go to Cloudflare Pages
3. Connect your GitHub repository
4. Deploy automatically
5. Add your custom domain if desired

## 📋 Calculator Menu Structure

### Main Navigation Categories:

1. **Home** - Landing page
2. **Basic** - Basic arithmetic calculator
3. **Scientific** - Advanced scientific calculator
4. **Mathematics** (dropdown)
   - Algebra
   - Geometry
   - Matrix
   - Graphing
   - Percentage ✅
5. **Statistics** (dropdown)
   - Descriptive Statistics
   - Probability
   - Data Analysis
6. **Unit Converter** (dropdown)
   - Length, Weight, Temperature, etc.
7. **Physics** (dropdown)
   - Kinematics, Dynamics, Electricity, etc.
8. **Chemistry** (dropdown)
   - Molarity, pH, Gas Laws, etc.
9. **Finance** (dropdown)
   - Interest, Loan, Investment calculators
10. **Computer Science** (dropdown)
    - Number Systems, Boolean Logic, etc.
11. **Date & Time** (dropdown)
    - Age, Date Difference, Time Zone

## ➕ Adding New Calculators

### Step 1: Create HTML File

Copy `calculators/percentage.html` as a template and modify:

```html
<!-- Update the page title and description -->
<title>Your Calculator Name - CalcHub</title>

<!-- Update the active class in navigation -->
<a href="your-calculator.html" class="active">Your Calculator</a>

<!-- Add your calculator content -->
<div class="calc-header">
    <h2><i class="fas fa-icon-name"></i> Your Calculator Name</h2>
    <p>Description of what your calculator does</p>
</div>
```

### Step 2: Create JavaScript File

Create a new file in `js/` folder:

```javascript
// your-calculator.js

function calculate() {
    // Get input values
    const input1 = parseFloat(document.getElementById('input1').value);
    
    // Perform calculations
    const result = /* your calculation */;
    
    // Display result
    displayResult(result);
}

function displayResult(value) {
    document.getElementById('resultValue').textContent = value;
    document.getElementById('result').classList.add('show');
}
```

### Step 3: Add to Navigation

Update the navigation menu in ALL HTML files to include your new calculator link.

## 🎨 Customization

### Colors and Theme

Edit `css/style.css` - CSS variables section:

```css
:root {
    --primary-color: #2563eb;      /* Change main color */
    --secondary-color: #1e40af;     /* Change accent color */
    /* ...modify other colors as needed */
}
```

### Change Site Name

Replace "CalcHub" throughout all HTML files with your chosen name.

### Ad Placement

Edit the ad placeholder sections in HTML files to add your Google AdSense code:

```html
<div class="ad-placeholder">
    <!-- Replace with your AdSense code -->
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
    <!-- Your ad code here -->
</div>
```

## 🔧 Technical Details

### Browser Support
- Chrome (recommended)
- Firefox
- Safari
- Edge
- All modern browsers with ES6 support

### Performance
- Minimal dependencies (only Font Awesome for icons)
- Lightweight CSS and JavaScript
- Fast loading times
- Mobile-optimized

### SEO Features
- Semantic HTML structure
- Meta descriptions on all pages
- Proper heading hierarchy
- Descriptive page titles

## 📱 Responsive Design

The site is fully responsive with breakpoints at:
- Desktop: 1024px+
- Tablet: 768px - 1023px
- Mobile: Below 768px

## 🎯 Future Enhancements

You can add:
- [ ] More calculator types (all categories from the menu)
- [ ] Save calculation history in localStorage
- [ ] Print/Download results as PDF
- [ ] Share results via social media
- [ ] User accounts and saved calculations
- [ ] Graphing capabilities with Chart.js or D3.js
- [ ] Step-by-step solution explanations
- [ ] Multi-language support

## 📝 License

Feel free to use this project for personal or commercial purposes. No attribution required, but always appreciated!

## 🤝 Contributing

To add new calculators:
1. Follow the structure of existing calculators
2. Maintain consistent styling
3. Add proper error handling
4. Test on multiple devices and browsers

## 💡 Tips for Success

1. **SEO**: Create unique meta descriptions for each calculator page
2. **Content**: Add helpful explanations and formulas
3. **UX**: Keep interfaces simple and intuitive
4. **Performance**: Optimize images and minimize JavaScript
5. **Mobile**: Test thoroughly on mobile devices
6. **Ads**: Don't overload with ads - balance UX and revenue

## 📞 Support

For questions or issues, refer to the code comments or modify as needed for your specific requirements.

---

**Built with ❤️ for students, researchers, and professionals worldwide**