// ========================================
// AUTH.JS - Authentication & Subscription System
// ========================================

const AuthSystem = {
    // Configuration
    config: {
        subscriptionPrice: 5.00,
        currency: 'USD',
        lockedSections: ['physics', 'electricity', 'chemistry', 'computer-science'],
        freeSections: ['calculator', 'converters', 'finance', 'date-time']
    },

    // User state
    user: {
        isLoggedIn: false,
        isPro: false,
        email: '',
        subscriptionExpiry: null
    },

    init() {
        this.loadUserState();
        this.setupUI();
        this.lockPremiumSections();
        this.setupEventListeners();
    },

    loadUserState() {
        // Load from localStorage
        const savedUser = localStorage.getItem('calcurex_user');
        if (savedUser) {
            this.user = JSON.parse(savedUser);
            // Check if subscription is still valid
            if (this.user.subscriptionExpiry) {
                const expiry = new Date(this.user.subscriptionExpiry);
                const now = new Date();
                if (expiry < now) {
                    this.user.isPro = false;
                    this.saveUserState();
                }
            }
        }
    },

    saveUserState() {
        localStorage.setItem('calcurex_user', JSON.stringify(this.user));
    },

    setupUI() {
        // Create auth button in header
        const header = document.querySelector('.site-header .container');
        if (header) {
            const authBtn = document.createElement('div');
            authBtn.className = 'auth-section';
            authBtn.innerHTML = this.user.isLoggedIn ?
                this.getProUserUI() :
                this.getLoginUI();
            header.appendChild(authBtn);
        }
    },

    getLoginUI() {
        return `
            <button class="btn-primary" onclick="AuthSystem.showLoginModal()">
                <i class="fas fa-sign-in-alt"></i> Login
            </button>
            <button class="btn-secondary" onclick="AuthSystem.showSignupModal()">
                <i class="fas fa-user-plus"></i> Sign Up
            </button>
        `;
    },

    getProUserUI() {
        const proStatus = this.user.isPro ?
            '<span class="pro-badge"><i class="fas fa-crown"></i> PRO</span>' :
            '<span class="free-badge">FREE</span>';

        return `
            <div class="user-info">
                <span class="user-email">${this.user.email}</span>
                ${proStatus}
                <button class="btn-logout" onclick="AuthSystem.logout()">
                    <i class="fas fa-sign-out-alt"></i>
                </button>
            </div>
            ${!this.user.isPro ? '<button class="btn-upgrade" onclick="AuthSystem.showUpgradeModal()">Upgrade to PRO - $5/month</button>' : ''}
        `;
    },

    lockPremiumSections() {
        if (this.user.isPro) {
            // User has pro, unlock everything
            this.unlockAllSections();
            return;
        }

        // Show PRO badge on premium sections (but keep them visible)
        this.config.lockedSections.forEach(sectionId => {
            const section = document.getElementById(sectionId);
            if (section) {
                // Add PRO badge to section title
                const sectionTitle = section.querySelector('.section-title');
                if (sectionTitle && !sectionTitle.querySelector('.pro-tag')) {
                    const proTag = document.createElement('span');
                    proTag.className = 'pro-tag';
                    proTag.innerHTML = '<i class="fas fa-crown"></i> PRO - $5/month';
                    proTag.onclick = () => this.showUpgradeModal();
                    sectionTitle.appendChild(proTag);
                }

                // Add PRO notice above calculator
                const container = section.querySelector('.physics-container, .electricity-container, .chemistry-container, .cs-container');
                if (container && !container.querySelector('.pro-notice')) {
                    const notice = document.createElement('div');
                    notice.className = 'pro-notice';
                    notice.innerHTML = `
                        <div class="pro-notice-content">
                            <i class="fas fa-star"></i>
                            <span>This is a <strong>PRO feature</strong>. Enter your values below and click Calculate to see results.</span>
                            <button class="btn-pro-small" onclick="AuthSystem.showUpgradeModal()">
                                Upgrade to PRO - $5/month
                            </button>
                        </div>
                    `;
                    container.insertBefore(notice, container.firstChild);
                }

                // Replace Calculate button with payment gate
                const calculateBtn = section.querySelector('.calc-button');
                if (calculateBtn && !calculateBtn.dataset.locked) {
                    calculateBtn.dataset.locked = 'true';
                    calculateBtn.dataset.originalOnclick = calculateBtn.getAttribute('onclick');
                    calculateBtn.setAttribute('onclick', 'AuthSystem.showCalculatePaywall(event, this)');

                    // Add lock icon to button
                    const buttonText = calculateBtn.textContent;
                    calculateBtn.innerHTML = `<i class="fas fa-lock"></i> ${buttonText} (PRO Required)`;
                    calculateBtn.classList.add('locked-button');
                }
            }
        });
    },

    unlockAllSections() {
        this.config.lockedSections.forEach(sectionId => {
            const section = document.getElementById(sectionId);
            if (section) {
                // Remove PRO tag
                const proTag = section.querySelector('.pro-tag');
                if (proTag) proTag.remove();

                // Remove PRO notice
                const notice = section.querySelector('.pro-notice');
                if (notice) notice.remove();

                // Restore Calculate button
                const calculateBtn = section.querySelector('.calc-button');
                if (calculateBtn && calculateBtn.dataset.locked) {
                    calculateBtn.removeAttribute('data-locked');
                    const originalOnclick = calculateBtn.dataset.originalOnclick;
                    if (originalOnclick) {
                        calculateBtn.setAttribute('onclick', originalOnclick);
                    }
                    calculateBtn.classList.remove('locked-button');
                    calculateBtn.innerHTML = 'Calculate';
                }
            }
        });
    },

    getSectionName(sectionId) {
        const names = {
            'physics': 'Physics Calculators',
            'electricity': 'Electricity Calculators',
            'chemistry': 'Chemistry Calculators',
            'computer-science': 'Computer Science Tools'
        };
        return names[sectionId] || sectionId;
    },

    showLoginModal() {
        this.showModal('login');
    },

    showSignupModal() {
        this.showModal('signup');
    },

    showUpgradeModal() {
        if (!this.user.isLoggedIn) {
            alert('Please sign up or login first to upgrade to PRO');
            this.showSignupModal();
            return;
        }
        this.showModal('upgrade');
    },

    showCalculatePaywall(event, button) {
        event.preventDefault();
        event.stopPropagation();

        // Show compelling paywall modal
        this.showModal('calculate-paywall');
    },

    showModal(type) {
        // Remove existing modal
        const existingModal = document.querySelector('.auth-modal');
        if (existingModal) existingModal.remove();

        // Create modal
        const modal = document.createElement('div');
        modal.className = 'auth-modal';
        modal.innerHTML = this.getModalContent(type);
        document.body.appendChild(modal);

        // Add event listeners
        this.setupModalListeners();
    },

    getModalContent(type) {
        switch (type) {
            case 'login':
                return `
                    <div class="modal-content">
                        <button class="modal-close" onclick="AuthSystem.closeModal()">&times;</button>
                        <h2><i class="fas fa-sign-in-alt"></i> Login to Calcurex</h2>
                        <form id="login-form" onsubmit="AuthSystem.handleLogin(event)">
                            <div class="form-group">
                                <label for="login-email">Email:</label>
                                <input type="email" id="login-email" required placeholder="your@email.com">
                            </div>
                            <div class="form-group">
                                <label for="login-password">Password:</label>
                                <input type="password" id="login-password" required placeholder="••••••••">
                            </div>
                            <button type="submit" class="btn-primary btn-block">
                                <i class="fas fa-sign-in-alt"></i> Login
                            </button>
                        </form>
                        <p class="modal-footer">
                            Don't have an account? 
                            <a href="#" onclick="AuthSystem.showSignupModal(); return false;">Sign up</a>
                        </p>
                        <p class="demo-note">
                            <strong>DEMO MODE:</strong> Use any email/password to login. 
                            Real authentication will be added in production.
                        </p>
                    </div>
                `;

            case 'signup':
                return `
                    <div class="modal-content">
                        <button class="modal-close" onclick="AuthSystem.closeModal()">&times;</button>
                        <h2><i class="fas fa-user-plus"></i> Sign Up for Calcurex</h2>
                        <form id="signup-form" onsubmit="AuthSystem.handleSignup(event)">
                            <div class="form-group">
                                <label for="signup-email">Email:</label>
                                <input type="email" id="signup-email" required placeholder="your@email.com">
                            </div>
                            <div class="form-group">
                                <label for="signup-password">Password:</label>
                                <input type="password" id="signup-password" required placeholder="••••••••">
                            </div>
                            <div class="form-group">
                                <label for="signup-confirm">Confirm Password:</label>
                                <input type="password" id="signup-confirm" required placeholder="••••••••">
                            </div>
                            <button type="submit" class="btn-primary btn-block">
                                <i class="fas fa-user-plus"></i> Create Account
                            </button>
                        </form>
                        <p class="modal-footer">
                            Already have an account? 
                            <a href="#" onclick="AuthSystem.showLoginModal(); return false;">Login</a>
                        </p>
                        <p class="demo-note">
                            <strong>DEMO MODE:</strong> Account created locally. 
                            Real authentication will be added in production.
                        </p>
                    </div>
                `;

            case 'upgrade':
                return `
                    <div class="modal-content upgrade-modal">
                        <button class="modal-close" onclick="AuthSystem.closeModal()">&times;</button>
                        <div class="upgrade-header">
                            <i class="fas fa-crown"></i>
                            <h2>Upgrade to Calcurex PRO</h2>
                            <p class="price">$5.00 <span>/month</span></p>
                        </div>
                        
                        <div class="upgrade-features">
                            <h3>What you'll get:</h3>
                            <ul>
                                <li><i class="fas fa-check-circle"></i> <strong>Physics Calculators</strong> - 16 advanced formulas</li>
                                <li><i class="fas fa-check-circle"></i> <strong>Electricity Calculators</strong> - 31 electrical formulas</li>
                                <li><i class="fas fa-check-circle"></i> <strong>Chemistry Calculators</strong> - 8 chemical calculations</li>
                                <li><i class="fas fa-check-circle"></i> <strong>Computer Science Tools</strong> - 7 CS utilities</li>
                                <li><i class="fas fa-check-circle"></i> <strong>Ad-free experience</strong></li>
                                <li><i class="fas fa-check-circle"></i> <strong>Priority support</strong></li>
                                <li><i class="fas fa-check-circle"></i> <strong>Cancel anytime</strong></li>
                            </ul>
                        </div>

                        <div class="payment-options">
                            <button class="btn-payment btn-stripe" onclick="AuthSystem.processPayment('stripe')">
                                <i class="fab fa-cc-stripe"></i> Pay with Stripe
                            </button>
                            <button class="btn-payment btn-paypal" onclick="AuthSystem.processPayment('paypal')">
                                <i class="fab fa-paypal"></i> Pay with PayPal
                            </button>
                        </div>

                        <p class="demo-note">
                            <strong>DEMO MODE:</strong> Click any payment button to activate PRO (no actual charge).
                            Real payment integration will be added in production.
                        </p>
                        
                        <p class="secure-note">
                            <i class="fas fa-lock"></i> Secure payment • Cancel anytime • 30-day money-back guarantee
                        </p>
                    </div>
                `;

            case 'calculate-paywall':
                return `
                    <div class="modal-content paywall-modal">
                        <button class="modal-close" onclick="AuthSystem.closeModal()">&times;</button>
                        
                        <div class="paywall-header">
                            <i class="fas fa-calculator"></i>
                            <h2>Almost There!</h2>
                            <p class="paywall-subtitle">You've entered your values. Upgrade to PRO to see your results.</p>
                        </div>

                        <div class="paywall-urgency">
                            <i class="fas fa-bolt"></i>
                            <p>Don't lose your progress! Upgrade now to get your answer instantly.</p>
                        </div>

                        <div class="paywall-pricing">
                            <div class="price-highlight">
                                <span class="currency">$</span>
                                <span class="amount">5</span>
                                <span class="period">/month</span>
                            </div>
                            <p class="price-subtext">Cancel anytime • No long-term commitment</p>
                        </div>

                        <div class="paywall-benefits">
                            <h3>Get Unlimited Access To:</h3>
                            <div class="benefit-grid">
                                <div class="benefit-item">
                                    <i class="fas fa-atom"></i>
                                    <strong>Physics</strong>
                                    <span>16 Formulas</span>
                                </div>
                                <div class="benefit-item">
                                    <i class="fas fa-bolt"></i>
                                    <strong>Electricity</strong>
                                    <span>31 Calculators</span>
                                </div>
                                <div class="benefit-item">
                                    <i class="fas fa-vial"></i>
                                    <strong>Chemistry</strong>
                                    <span>8 Tools</span>
                                </div>
                                <div class="benefit-item">
                                    <i class="fas fa-laptop-code"></i>
                                    <strong>Computer Science</strong>
                                    <span>7 Utilities</span>
                                </div>
                            </div>
                        </div>

                        ${this.user.isLoggedIn ? `
                            <div class="payment-options">
                                <button class="btn-payment btn-stripe" onclick="AuthSystem.processPayment('stripe')">
                                    <i class="fab fa-cc-stripe"></i> Upgrade with Stripe
                                </button>
                                <button class="btn-payment btn-paypal" onclick="AuthSystem.processPayment('paypal')">
                                    <i class="fab fa-paypal"></i> Upgrade with PayPal
                                </button>
                            </div>
                        ` : `
                            <div class="auth-required">
                                <p><i class="fas fa-info-circle"></i> Quick signup required to upgrade</p>
                                <button class="btn-primary btn-block" onclick="AuthSystem.showSignupModal()">
                                    <i class="fas fa-user-plus"></i> Sign Up & Upgrade to PRO
                                </button>
                            </div>
                        `}

                        <div class="paywall-guarantee">
                            <i class="fas fa-shield-alt"></i>
                            <strong>30-Day Money-Back Guarantee</strong>
                            <p>Not satisfied? Get a full refund within 30 days.</p>
                        </div>

                        <p class="demo-note">
                            <strong>DEMO MODE:</strong> Click payment button to instantly activate PRO.
                        </p>
                    </div>
                `;
        }
    },

    setupModalListeners() {
        // Close on background click
        const modal = document.querySelector('.auth-modal');
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal();
                }
            });
        }

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
            }
        });
    },

    setupEventListeners() {
        // Add click listeners to locked sections
        this.config.lockedSections.forEach(sectionId => {
            const navLink = document.querySelector(`a[href="#${sectionId}"]`);
            if (navLink && !this.user.isPro) {
                navLink.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.showUpgradeModal();
                });
            }
        });
    },

    closeModal() {
        const modal = document.querySelector('.auth-modal');
        if (modal) {
            modal.classList.add('fade-out');
            setTimeout(() => modal.remove(), 300);
        }
    },

    handleLogin(event) {
        event.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        // DEMO: Accept any email/password
        // TODO: Replace with real authentication API call

        this.user.isLoggedIn = true;
        this.user.email = email;
        // Check if user was previously pro
        const savedUser = localStorage.getItem('calcurex_user');
        if (savedUser) {
            const parsed = JSON.parse(savedUser);
            if (parsed.email === email && parsed.isPro) {
                this.user.isPro = true;
                this.user.subscriptionExpiry = parsed.subscriptionExpiry;
            }
        }

        this.saveUserState();
        this.closeModal();
        location.reload(); // Refresh to apply changes
    },

    handleSignup(event) {
        event.preventDefault();
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        const confirm = document.getElementById('signup-confirm').value;

        if (password !== confirm) {
            alert('Passwords do not match!');
            return;
        }

        // DEMO: Create account locally
        // TODO: Replace with real signup API call

        this.user.isLoggedIn = true;
        this.user.email = email;
        this.user.isPro = false;

        this.saveUserState();
        this.closeModal();

        alert('Account created successfully! Upgrade to PRO to unlock premium features.');
        location.reload();
    },

    processPayment(method) {
        // DEMO: Simulate successful payment
        // TODO: Replace with real Stripe/PayPal integration

        console.log(`Processing payment via ${method}...`);

        // Simulate payment processing
        const processingMsg = document.createElement('div');
        processingMsg.className = 'processing-overlay';
        processingMsg.innerHTML = `
            <div class="processing-content">
                <i class="fas fa-spinner fa-spin"></i>
                <p>Processing payment...</p>
            </div>
        `;
        document.body.appendChild(processingMsg);

        setTimeout(() => {
            processingMsg.remove();
            this.activateProSubscription();
        }, 2000);
    },

    activateProSubscription() {
        // Set subscription expiry to 1 month from now
        const expiry = new Date();
        expiry.setMonth(expiry.getMonth() + 1);

        this.user.isPro = true;
        this.user.subscriptionExpiry = expiry.toISOString();
        this.saveUserState();

        this.closeModal();

        // Show success message
        alert('🎉 Congratulations! You are now a PRO member!\n\nAll premium features are now unlocked.');

        location.reload(); // Refresh to unlock sections
    },

    logout() {
        if (confirm('Are you sure you want to logout?')) {
            this.user = {
                isLoggedIn: false,
                isPro: false,
                email: '',
                subscriptionExpiry: null
            };
            this.saveUserState();
            location.reload();
        }
    }
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    AuthSystem.init();
});