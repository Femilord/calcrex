# CalcREX

**Your Complete Online Calculator Suite & Science Education Platform**

🌐 **Live Site:** [calcrex.com](https://calcrex.com)

---

## Overview

CalcREX is a comprehensive, free online calculator platform featuring 300+ professional-grade calculators across 9 categories, 10 in-depth science topic guides with worked examples and embedded calculators, and a full unit conversion suite. Built as a static site with vanilla HTML, CSS, and JavaScript — no frameworks, no build tools, no server dependencies.

The platform is designed for students, professionals, educators, and anyone needing fast, accurate calculations and clear science explanations. All calculators run entirely in the browser — no data is sent to any server.

---

## Site Architecture

```
calcrex.com/
│
├── index.html                    # Homepage — Calculator (Basic/Scientific/Advanced)
│
├── ── Calculator Pages ──────────────────────────────────
├── converters/index.html         # Unit Converter (10+ conversion tools)
├── physics/index.html            # Physics Calculators (20+ tools)
├── chemistry/index.html          # Chemistry Calculators (8+ tools)
├── electricity/index.html        # Electronics/Electrical Engineering (30+ tools)
├── computer-science/index.html   # Computer Science Calculators (7+ tools)
├── finance/index.html            # Finance Calculators (10+ tools)
├── date-time/index.html          # Date & Time Calculators (8+ tools)
├── thermodynamics/index.html     # Thermodynamics Calculators (8+ tools)
├── aerodynamics/index.html       # Aerodynamics Calculators (8+ tools)
│
├── ── Science Topics ────────────────────────────────────
├── topics/index.html             # Topics Index — Grid of all 10 topics
├── quantum-mechanics/index.html  # Quantum Mechanics (6 concepts, 4 examples)
├── relativity/index.html         # Relativity (6 concepts, 4 examples)
├── organic-chemistry/index.html  # Organic Chemistry (6 concepts, 3 examples)
├── electromagnetic-waves/index.html  # EM Waves (6 concepts, 3 examples)
├── nuclear-physics/index.html    # Nuclear Physics (6 concepts, 4 examples)
├── fluid-mechanics/index.html    # Fluid Mechanics (6 concepts, 3 examples)
├── astrophysics/index.html       # Astrophysics (6 concepts, 4 examples)
├── calculus/index.html           # Calculus Fundamentals (6 concepts, 4 examples)
├── probability-statistics/index.html  # Probability & Statistics (6 concepts, 3 examples)
├── thermodynamic-cycles/index.html    # Thermodynamic Cycles (6 concepts, 3 examples)
│
├── ── Informational Pages ───────────────────────────────
├── about/index.html              # About CalcREX
├── contact/index.html            # Contact Form
├── policy-document/index.html    # Privacy Policy, Terms, Disclaimer, Cookies, Accessibility
│
├── ── Stylesheets ───────────────────────────────────────
├── css/
│   ├── styles.css                # Global styles (header, footer, nav, layout, variables)
│   ├── pages.css                 # Shared page content styles (page-header, content-section)
│   ├── topics.css                # Topics index page + homepage featured section
│   ├── topic-page.css            # Individual topic page styles (concepts, examples, calculators)
│   ├── physics.css               # Physics calculator page styles
│   ├── physics-topics.css        # Physics "Topics" section styles
│   ├── chemistry.css             # Chemistry calculator page
│   ├── chemistry-topics.css      # Chemistry "Topics" section
│   ├── electricity.css           # Electronics calculator page
│   ├── elec-topics.css           # Electronics "Topics" section
│   ├── computer-science.css      # Computer Science calculator page
│   ├── cs-topics.css             # CS "Topics" section
│   ├── finance.css               # Finance calculator page
│   ├── fin-topics.css            # Finance "Topics" section
│   ├── date-time.css             # Date & Time calculator page
│   ├── dt-topics.css             # Date & Time "Topics" section
│   ├── converters.css            # Unit Converter page
│   ├── thermodynamics.css        # Thermodynamics calculator page
│   ├── thermo-topics.css         # Thermodynamics "Topics" section
│   ├── aerodynamics.css          # Aerodynamics calculator page
│   └── aero-topics.css           # Aerodynamics "Topics" section
│
├── ── JavaScript ────────────────────────────────────────
├── js/
│   ├── script.js                 # Global scripts (read-more toggle, etc.)
│   ├── nav.js                    # Navigation (mobile menu, Sciences dropdown, Topics link)
│   ├── physics.js                # Physics calculator logic
│   ├── physics-topics.js         # Physics topics section interactivity
│   ├── chemistry.js              # Chemistry calculator logic
│   ├── chemistry-topics.js       # Chemistry topics section
│   ├── electricity.js            # Electronics calculator logic
│   ├── elec-topics.js            # Electronics topics section
│   ├── computer-science.js       # CS calculator logic
│   ├── cs-topics.js              # CS topics section
│   ├── finance.js                # Finance calculator logic
│   ├── fin-topics.js             # Finance topics section
│   ├── date-time.js              # Date & Time calculator logic
│   ├── dt-topics.js              # Date & Time topics section
│   ├── converters.js             # Unit conversion logic
│   ├── thermodynamics.js         # Thermodynamics calculator logic
│   ├── thermo-topics.js          # Thermodynamics topics section
│   ├── aerodynamics.js           # Aerodynamics calculator logic
│   ├── aero-topics.js            # Aerodynamics topics section
│   └── contact.js                # Contact form (Google Sheets integration)
│
├── ── Assets & Config ───────────────────────────────────
├── img/
│   ├── calcrex-banner.webp       # Open Graph / social share banner
│   └── logo.png                  # CalcREX logo
├── favicon.png                   # Browser tab icon
├── site.webmanifest              # PWA manifest
├── robots.txt                    # Search engine crawl directives
├── sitemap.xml                   # XML sitemap (24 URLs)
├── CNAME                         # Custom domain: calcrex.com
├── BingSiteAuth.xml              # Bing Webmaster verification
├── 498a367f20f4428991660aa08e86eca5.txt  # Domain verification file
└── .gitattributes                # Git line-ending config
```

---

## Calculator Categories

| Category | Page | Calculators | Description |
|----------|------|-------------|-------------|
| **Homepage** | `/` | 3 modes | Basic, Scientific, and Advanced calculator with memory, history, angle modes |
| **Unit Converter** | `/converters/` | 10+ | Length, weight, temperature, area, volume, speed, data, pressure, energy, time |
| **Physics** | `/physics/` | 20+ | Kinematics, Newton's laws, projectile motion, circular motion, energy, momentum, gravity, waves, optics, torque |
| **Chemistry** | `/chemistry/` | 8+ | Molar mass, molarity, dilution, ideal gas law, pH, stoichiometry, solution mixing, enthalpy |
| **Electronics** | `/electricity/` | 30+ | Ohm's law, resistor networks, capacitance, inductance, AC/DC circuits, power, Kirchhoff's laws, transformers, filters |
| **Computer Science** | `/computer-science/` | 7+ | Binary/hex/octal conversion, Boolean algebra, bitwise operations, floating-point, ASCII |
| **Finance** | `/finance/` | 10+ | Compound interest, loan amortization, ROI, break-even, NPV, IRR, depreciation, tax, savings, mortgage |
| **Date & Time** | `/date-time/` | 8+ | Date difference, age calculator, time zone converter, business days, countdown, Unix timestamp, leap year |
| **Thermodynamics** | `/thermodynamics/` | 8+ | Heat transfer, entropy, Carnot efficiency, ideal gas, specific heat, calorimetry, phase change, thermal expansion |
| **Aerodynamics** | `/aerodynamics/` | 8+ | Lift, drag, Reynolds number, Mach number, airspeed, wing loading, thrust, Bernoulli |

---

## Science Topics

Each topic page includes 6 core concepts, 3-5 fully worked examples, an interactive embedded calculator, a related-topics section, and full SEO metadata.

| Topic | Path | Embedded Calculator |
|-------|------|---------------------|
| Quantum Mechanics | `/quantum-mechanics/` | Photon Energy (E = hc/λ) |
| Relativity | `/relativity/` | Time Dilation (Δt' = γΔt) |
| Organic Chemistry | `/organic-chemistry/` | Molecular Weight |
| Electromagnetic Waves | `/electromagnetic-waves/` | Wavelength ↔ Frequency (c = fλ) |
| Nuclear Physics | `/nuclear-physics/` | Radioactive Decay / Half-Life |
| Fluid Mechanics | `/fluid-mechanics/` | Pipe Flow Rate (Hagen-Poiseuille) |
| Astrophysics | `/astrophysics/` | Orbital Period (Kepler's 3rd Law) |
| Calculus Fundamentals | `/calculus/` | Power Rule Derivative |
| Probability & Statistics | `/probability-statistics/` | Normal Distribution Z-Score |
| Thermodynamic Cycles | `/thermodynamic-cycles/` | Carnot Thermal Efficiency |

**Content totals:** 60 concepts, ~45 worked examples, 10 interactive calculators, 30 cross-topic links.

---

## Navigation Structure

The site uses a dropdown navigation system for clean information architecture:

```
Calculator | Unit Converter | Sciences ▼ | Computer Science | Finance | Date & Time | Topics
                              ├── Physics
                              ├── Chemistry
                              ├── Electronics
                              ├── Thermodynamics
                              └── Aerodynamics
```

- **Desktop:** Hover-triggered dropdown with smooth arrow rotation
- **Mobile:** Tap-triggered inline expansion within the hamburger menu
- **Active states:** Current page highlighted; Sciences toggle highlighted when any child page is active
- **Close behavior:** Outside click, Escape key, or link selection all close the dropdown

---

## Technology Stack

| Layer | Technology |
|-------|-----------|
| **Markup** | Semantic HTML5 |
| **Styling** | Vanilla CSS3 (custom properties, grid, flexbox) |
| **JavaScript** | Vanilla ES6+ (no jQuery, no frameworks) |
| **Icons** | Font Awesome 6.4.0 (CDN) |
| **Hosting** | GitHub Pages |
| **DNS/CDN** | Cloudflare |
| **Domain** | calcrex.com |
| **Ads** | Google AdSense |
| **Analytics** | Google Analytics |
| **Contact Form** | Google Sheets backend via Apps Script |
| **Search Engines** | Google Search Console, Bing Webmaster Tools |

---

## SEO Implementation

Every page includes:

- **Primary meta tags:** title, description, keywords, author, robots
- **Open Graph tags:** og:type, og:url, og:title, og:description, og:image, og:site_name
- **Twitter Card tags:** summary_large_image format
- **Canonical URLs:** self-referencing canonicals on all pages
- **Structured Data (JSON-LD):**
  - `BreadcrumbList` on every page
  - `WebSite` and `FAQPage` on homepage
  - `CollectionPage` on topics index
  - `Article` type on individual topic pages
- **XML Sitemap:** 24 URLs at `/sitemap.xml`
- **robots.txt:** allows all crawlers, references sitemap, blocks `.git/`

---

## Design System

### CSS Architecture

| File | Scope |
|------|-------|
| `styles.css` | Global — header, footer, nav, dropdown, CSS variables, typography, responsive grid |
| `pages.css` | Shared page layout — `page-container`, `page-header`, `content-section`, CTA styles |
| `topics.css` | Topics index grid, homepage featured topics section, topic card components |
| `topic-page.css` | Individual topic pages — hero, concepts, formulas, worked examples, calculator embed, related grid |
| `[category].css` | Category-specific calculator page styles |
| `[category]-topics.css` | Category "Topics" section styles (expandable content within calculator pages) |

### Color Palette

- **Primary:** `#3b82f6` (blue)
- **Topic accents:** Each topic has a unique gradient (purple/quantum, blue/relativity, green/organic, amber/EM, red/nuclear, cyan/fluids, slate/astro, violet/calculus, orange/stats, rose/thermo)
- **Text:** `#1e293b` (headings), `#475569` (body), `#64748b` (secondary)
- **Backgrounds:** `#f8fafc` (light), `#f1f5f9` (muted), `#0f172a` → `#334155` (dark hero gradients)

### Responsive Breakpoints

| Breakpoint | Layout |
|-----------|--------|
| < 576px | Single column, stacked cards |
| 576px+ | 2-column grids |
| 768px+ | Expanded spacing, larger typography |
| 992px+ | Full desktop nav (no hamburger) |
| 1024px+ | 3-column grids |

---

## Deployment

CalcREX is deployed as a static site via GitHub Pages with Cloudflare DNS.

### Workflow

1. Make changes locally
2. Commit and push to `main` branch
3. GitHub Pages auto-deploys
4. Cloudflare handles DNS, SSL, and caching

### Key Config Files

| File | Purpose |
|------|---------|
| `CNAME` | Points GitHub Pages to `calcrex.com` |
| `robots.txt` | Crawler directives and sitemap reference |
| `sitemap.xml` | All 24 page URLs for search engine discovery |
| `site.webmanifest` | PWA metadata (app name, icons, theme) |
| `BingSiteAuth.xml` | Bing Webmaster Tools domain verification |
| `.gitattributes` | Git line-ending normalization |

---

## Legal & Policy

The site includes a comprehensive policy document at `/policy-document/` covering:

- **Privacy Policy** — minimal data collection; calculations stay client-side
- **Terms of Use** — license to use, intellectual property, user conduct, governing law (Nigeria)
- **Disclaimer** — "as is" provision, not professional advice, accuracy limitations, liability limits
- **Cookie Policy** — essential, analytics, and advertising cookies; browser management guide
- **Accessibility Statement** — semantic HTML, keyboard navigation, color contrast, known limitations

---

## Browser Support

CalcREX targets modern evergreen browsers:

- Chrome / Edge 90+
- Firefox 90+
- Safari 14+
- Mobile Chrome / Safari (iOS 14+, Android 10+)

All calculators are fully functional without JavaScript for display, but require JS for computation.

---

## Contributing

CalcREX is a private project. For bug reports, feature requests, or feedback, use the contact form at [calcrex.com/contact](https://calcrex.com/contact).

---

## License

© 2026 CalcREX. All rights reserved. See `/policy-document/` for full terms.
