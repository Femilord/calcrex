# Calcurex PRO - Subscription System Documentation

## 🎯 Overview

Calcurex now has a **PRO subscription system** that locks premium features behind a $5/month paywall.

---

## 💰 Pricing Structure

### **FREE Tier**
Includes:
- ✅ Calculator (Basic, Scientific, Advanced)
- ✅ Converters (10 types)
- ✅ Finance Calculators (10 types)
- ✅ Date & Time Calculators (8 types)

### **PRO Tier - $5/month**
Everything in FREE, plus:
- ⭐ Physics Calculators (16 formulas)
- ⭐ Electricity Calculators (31 formulas)
- ⭐ Chemistry Calculators (8 types)
- ⭐ Computer Science Tools (7 tools)
- ⭐ Ad-free experience
- ⭐ Priority support

---

## 🔒 Locked Sections

The following sections are locked for free users:

1. **Physics** - All 16 physics formulas
2. **Electricity** - All 31 electrical calculators
3. **Chemistry** - All 8 chemistry calculators
4. **Computer Science** - All 7 CS tools

**Total Premium Calculators:** 62

---

## 🎨 User Experience

### **For Free Users:**

1. **Navigation Click:**
   - Clicking on locked sections shows upgrade modal
   - Cannot access premium content

2. **Section View:**
   - Premium sections have blurred content
   - Large overlay with lock icon
   - "Upgrade to PRO" button prominently displayed
   - List of all PRO features

3. **Call-to-Action:**
   - Multiple upgrade buttons throughout
   - Clear pricing: $5/month
   - Easy signup/login process

### **For PRO Users:**

1. **Full Access:**
   - All sections unlocked
   - No overlays or restrictions
   - Clean, uninterrupted experience

2. **Status Display:**
   - "PRO" badge with crown icon in header
   - Email displayed
   - Logout option

---

## 🔐 Authentication Flow

### **Sign Up Process:**
```
1. Click "Sign Up" button
2. Enter email and password
3. Account created (FREE tier)
4. Prompted to upgrade to PRO
```

### **Login Process:**
```
1. Click "Login" button
2. Enter credentials
3. Logged in with appropriate tier access
```

### **Upgrade Process:**
```
1. Click "Upgrade to PRO" button
2. Choose payment method (Stripe or PayPal)
3. Process payment ($5/month)
4. PRO activated immediately
5. All premium sections unlocked
```

---

## 💳 Payment Integration

### **Current Status: DEMO MODE**

The system is currently in **DEMO MODE** for testing:
- No real payments processed
- Clicking any payment button activates PRO
- Subscription expires in 1 month (simulated)
- All data stored locally (localStorage)

### **Production Integration Required:**

#### **Option 1: Stripe** (Recommended)
```javascript
// Replace in auth.js - processPayment('stripe')
stripe.redirectToCheckout({
    lineItems: [{
        price: 'price_xxxxxxxxxxxxx', // Your Stripe Price ID
        quantity: 1
    }],
    mode: 'subscription',
    successUrl: 'https://yourdomain.com/success',
    cancelUrl: 'https://yourdomain.com/cancel',
});
```

**Setup Steps:**
1. Create Stripe account
2. Set up product: "Calcurex PRO - $5/month"
3. Get Price ID
4. Implement Stripe Checkout
5. Add webhook for subscription events

#### **Option 2: PayPal**
```javascript
// Replace in auth.js - processPayment('paypal')
paypal.Buttons({
    createSubscription: function(data, actions) {
        return actions.subscription.create({
            'plan_id': 'P-xxxxxxxxxxxxx' // Your PayPal Plan ID
        });
    },
    onApprove: function(data, actions) {
        AuthSystem.activateProSubscription();
    }
}).render('#paypal-button-container');
```

**Setup Steps:**
1. Create PayPal Business account
2. Set up subscription plan: $5/month
3. Get Plan ID
4. Implement PayPal SDK
5. Add IPN listener

---

## 🗄️ Data Storage

### **Local Storage (Current - DEMO)**

User data stored in `localStorage`:
```javascript
{
    isLoggedIn: true,
    isPro: true,
    email: "user@example.com",
    subscriptionExpiry: "2025-02-28T00:00:00.000Z"
}
```

### **Production Database (Required)**

You'll need a backend database to store:
- User accounts (email, password hash)
- Subscription status
- Payment history
- Subscription expiry dates

**Recommended Stack:**
- **Backend:** Node.js + Express
- **Database:** MongoDB or PostgreSQL
- **Auth:** JWT tokens or Firebase Auth
- **Payments:** Stripe or PayPal webhooks

---

## 📱 Features

### **1. Premium Overlay**
- Blurs locked content
- Shows lock icon
- Displays pricing
- Lists all PRO features
- Upgrade button

### **2. Authentication Modal**
- Clean, modern design
- Login form
- Signup form
- Password validation
- Error handling

### **3. Upgrade Modal**
- Pricing display ($5/month)
- Feature list (6 benefits)
- Stripe payment button
- PayPal payment button
- Secure payment badge
- Money-back guarantee

### **4. User Dashboard**
- User email display
- PRO/FREE badge
- Logout button
- Upgrade button (for FREE users)

### **5. Subscription Management**
- 1-month subscription period
- Auto-expiry check on page load
- Can cancel anytime (in production)

---

## 🔧 Technical Implementation

### **Files Created:**

1. **js/auth.js** - Authentication & subscription logic
2. **CSS updates** - Modal styles, overlays, badges

### **Key Functions:**

```javascript
AuthSystem.init()                    // Initialize system
AuthSystem.showLoginModal()          // Show login form
AuthSystem.showSignupModal()         // Show signup form
AuthSystem.showUpgradeModal()        // Show upgrade offer
AuthSystem.lockPremiumSections()     // Lock Physics, etc.
AuthSystem.unlockAllSections()       // Unlock for PRO users
AuthSystem.processPayment(method)    // Handle payment
AuthSystem.activateProSubscription() // Activate PRO
AuthSystem.logout()                  // Logout user
```

### **Configuration:**

Located in `auth.js`:
```javascript
config: {
    subscriptionPrice: 5.00,
    currency: 'USD',
    lockedSections: ['physics', 'electricity', 'chemistry', 'computer-science'],
    freeSections: ['calculator', 'converters', 'finance', 'date-time']
}
```

---

## 🎨 UI Components

### **Header Changes:**
- Login/Signup buttons (when logged out)
- User info + PRO badge (when logged in)
- Upgrade button (for FREE users)
- Logout button

### **Premium Overlays:**
- Positioned absolutely over sections
- Blur effect on content
- Lock icon animation
- Feature list
- CTA button

### **Modals:**
- Login modal
- Signup modal
- Upgrade modal
- All with smooth animations

---

## 📊 Conversion Optimization

### **Upgrade Triggers:**

1. **Navigation Click** - Click locked section → Upgrade modal
2. **Header Button** - "Upgrade to PRO" always visible
3. **Section Overlays** - Large upgrade buttons in overlays
4. **Feature Lists** - Show what they're missing

### **Pricing Psychology:**

- **$5/month** - Low barrier to entry
- **Clear value** - 62 premium calculators
- **No long-term commitment** - Cancel anytime
- **Money-back guarantee** - 30 days
- **Social proof** - "Priority support" suggests community

---

## 🚀 Deployment Checklist

### **Before Going Live:**

- [ ] Set up Stripe or PayPal account
- [ ] Create subscription product ($5/month)
- [ ] Get API keys and product IDs
- [ ] Build backend API for auth
- [ ] Set up database
- [ ] Replace DEMO payment with real integration
- [ ] Add webhook handlers
- [ ] Test payment flow end-to-end
- [ ] Add email notifications
- [ ] Set up customer support
- [ ] Add terms of service
- [ ] Add privacy policy
- [ ] Add refund policy

### **Production Environment Variables:**

```
STRIPE_PUBLIC_KEY=pk_live_xxxxx
STRIPE_SECRET_KEY=sk_live_xxxxx
STRIPE_PRICE_ID=price_xxxxx
DATABASE_URL=mongodb://xxxxx
JWT_SECRET=xxxxx
```

---

## 💡 Marketing Suggestions

### **Value Proposition:**
"Unlock 62 Advanced Calculators for Just $5/month"

### **Free Trial:**
Consider offering 7-day free trial to increase conversions

### **Annual Plan:**
Offer $50/year (save $10) to encourage longer commitments

### **Student Discount:**
Offer 50% off with .edu email

### **Referral Program:**
Give 1 free month for each referral

---

## 📈 Analytics to Track

1. **Conversion Rate:**
   - Visitors → Signups
   - Signups → PRO upgrades

2. **Drop-off Points:**
   - Where users abandon upgrade flow
   - Most clicked locked sections

3. **Revenue Metrics:**
   - Monthly recurring revenue (MRR)
   - Customer lifetime value (LTV)
   - Churn rate

4. **User Behavior:**
   - Most used free calculators
   - Most viewed locked sections
   - Time spent before upgrade

---

## 🛡️ Security Considerations

### **Current (DEMO):**
- No real security (client-side only)
- Data in localStorage (easily manipulated)
- No server validation

### **Production Required:**
- Server-side authentication
- Secure password hashing (bcrypt)
- JWT tokens with expiry
- HTTPS only
- Rate limiting
- SQL injection prevention
- XSS protection
- CSRF tokens

---

## 📞 Support & Cancellation

### **Support:**
Add email support for PRO users:
- support@calcurex.com
- Priority response (24 hours)

### **Cancellation:**
Make it easy to cancel:
- Self-service cancellation
- No questions asked
- Immediate effect or end of period
- Confirmation email

---

## 🎯 Success Metrics

**Target Conversion Rates:**
- Visitor → Signup: 5-10%
- Signup → PRO: 10-20%
- Overall: 0.5-2% paid conversion

**Revenue Projections:**
- 1,000 visitors/month × 1% = 10 PRO users
- 10 × $5 = **$50/month MRR**
- 10,000 visitors/month × 1% = 100 PRO users  
- 100 × $5 = **$500/month MRR**

---

**Version:** 4.0
**Created:** January 28, 2025
**Status:** ✅ DEMO - Ready for production integration
**Next Step:** Integrate real payment processor