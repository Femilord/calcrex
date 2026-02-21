// ========================================
// CALCREX COOKIE CONSENT
// ========================================
(function() {
    'use strict';

    const CC_KEY = 'calcrex_cookie_consent';
    const GA_ID = 'G-8EMHZ2B7V3';

    // ── Check existing consent ──
    function getConsent() {
        try {
            const stored = localStorage.getItem(CC_KEY);
            if (stored) return JSON.parse(stored);
        } catch (e) {}
        return null;
    }

    function saveConsent(consent) {
        try {
            consent.timestamp = new Date().toISOString();
            localStorage.setItem(CC_KEY, JSON.stringify(consent));
        } catch (e) {}
    }

    // ── Load scripts based on consent ──
    function loadGA() {
        if (document.querySelector('script[src*="googletagmanager.com/gtag"]')) return;
        const s = document.createElement('script');
        s.async = true;
        s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
        document.head.appendChild(s);
        window.dataLayer = window.dataLayer || [];
        function gtag(){ dataLayer.push(arguments); }
        gtag('js', new Date());
        gtag('config', GA_ID);
    }

    function loadAdSense() {
        if (document.querySelector('script[src*="adsbygoogle"]')) return;
        const clientId = document.querySelector('[data-ad-client]');
        if (!clientId) return;
        const pubId = clientId.getAttribute('data-ad-client');
        if (!pubId || pubId === 'ca-pub-XXXXXXXXXXXXXXXX') return;
        const s = document.createElement('script');
        s.async = true;
        s.crossOrigin = 'anonymous';
        s.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=' + pubId;
        document.head.appendChild(s);
    }

    function applyConsent(consent) {
        if (consent.analytics) loadGA();
        if (consent.advertising) loadAdSense();
    }

    function revokeConsent() {
        // Disable GA
        window['ga-disable-' + GA_ID] = true;
        // Clear GA cookies
        document.cookie.split(';').forEach(function(c) {
            var name = c.trim().split('=')[0];
            if (name.startsWith('_ga') || name.startsWith('_gid') || name.startsWith('_gat')) {
                document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=.' + location.hostname;
                document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
            }
        });
    }

    // ── Build banner HTML ──
    function createBanner() {
        // Overlay
        const overlay = document.createElement('div');
        overlay.className = 'cc-overlay';
        overlay.id = 'ccOverlay';

        // Banner
        const banner = document.createElement('div');
        banner.className = 'cc-banner';
        banner.id = 'ccBanner';
        banner.setAttribute('role', 'dialog');
        banner.setAttribute('aria-label', 'Cookie consent');

        banner.innerHTML = `
            <div class="cc-inner">
                <div class="cc-text">
                    <h3><i class="fas fa-cookie-bite"></i> We Value Your Privacy</h3>
                    <p>We use cookies to analyse site traffic and personalise ads. You can choose which cookies to allow. Essential cookies are always active as they are needed for the site to function.</p>
                </div>
                <div class="cc-toggles">
                    <label class="cc-toggle">
                        <div>
                            <div class="cc-toggle-label">Essential</div>
                            <div class="cc-toggle-desc">Always active</div>
                        </div>
                        <div class="cc-switch">
                            <input type="checkbox" checked disabled>
                            <span class="cc-slider"></span>
                        </div>
                    </label>
                    <label class="cc-toggle">
                        <div>
                            <div class="cc-toggle-label">Analytics</div>
                            <div class="cc-toggle-desc">Google Analytics</div>
                        </div>
                        <div class="cc-switch">
                            <input type="checkbox" id="ccAnalytics" checked>
                            <span class="cc-slider"></span>
                        </div>
                    </label>
                    <label class="cc-toggle">
                        <div>
                            <div class="cc-toggle-label">Advertising</div>
                            <div class="cc-toggle-desc">Google AdSense</div>
                        </div>
                        <div class="cc-switch">
                            <input type="checkbox" id="ccAdvertising" checked>
                            <span class="cc-slider"></span>
                        </div>
                    </label>
                </div>
                <div class="cc-buttons">
                    <button class="cc-btn cc-btn-accept" id="ccAcceptAll">Accept All</button>
                    <button class="cc-btn cc-btn-save" id="ccSavePrefs">Save Preferences</button>
                    <button class="cc-btn cc-btn-reject" id="ccRejectAll">Reject All</button>
                </div>
            </div>
        `;

        document.body.appendChild(overlay);
        document.body.appendChild(banner);

        // Settings trigger (cookie icon after consent given)
        const trigger = document.createElement('button');
        trigger.className = 'cc-settings-trigger';
        trigger.id = 'ccSettingsTrigger';
        trigger.setAttribute('aria-label', 'Cookie settings');
        trigger.title = 'Cookie settings';
        trigger.innerHTML = '<i class="fas fa-cookie-bite"></i>';
        document.body.appendChild(trigger);

        return { overlay, banner, trigger };
    }

    // ── Show/hide banner ──
    function showBanner(banner, overlay) {
        requestAnimationFrame(function() {
            overlay.classList.add('cc-visible');
            banner.classList.add('cc-visible');
        });
    }

    function hideBanner(banner, overlay, trigger) {
        banner.classList.remove('cc-visible');
        overlay.classList.remove('cc-visible');
        setTimeout(function() {
            trigger.classList.add('cc-visible');
        }, 400);
    }

    // ── Init ──
    function init() {
        var existing = getConsent();

        // If consent already given and not expired (90 days)
        if (existing && existing.timestamp) {
            var age = Date.now() - new Date(existing.timestamp).getTime();
            if (age < 90 * 24 * 60 * 60 * 1000) {
                applyConsent(existing);
                // Show settings trigger after a moment
                document.addEventListener('DOMContentLoaded', function() {
                    var els = createBanner();
                    els.trigger.classList.add('cc-visible');
                    setupEvents(els, existing);
                });
                return;
            }
        }

        // No consent or expired — show banner
        document.addEventListener('DOMContentLoaded', function() {
            var els = createBanner();
            setTimeout(function() { showBanner(els.banner, els.overlay); }, 500);
            setupEvents(els, null);
        });
    }

    function setupEvents(els, existingConsent) {
        var banner = els.banner;
        var overlay = els.overlay;
        var trigger = els.trigger;

        var analyticsCheck = document.getElementById('ccAnalytics');
        var advertisingCheck = document.getElementById('ccAdvertising');

        // If reopening with existing consent, set toggles
        if (existingConsent) {
            if (analyticsCheck) analyticsCheck.checked = existingConsent.analytics;
            if (advertisingCheck) advertisingCheck.checked = existingConsent.advertising;
        }

        // Accept All
        document.getElementById('ccAcceptAll').addEventListener('click', function() {
            var consent = { essential: true, analytics: true, advertising: true };
            saveConsent(consent);
            applyConsent(consent);
            hideBanner(banner, overlay, trigger);
        });

        // Save Preferences
        document.getElementById('ccSavePrefs').addEventListener('click', function() {
            var consent = {
                essential: true,
                analytics: analyticsCheck ? analyticsCheck.checked : false,
                advertising: advertisingCheck ? advertisingCheck.checked : false
            };
            saveConsent(consent);
            if (!consent.analytics) revokeConsent();
            applyConsent(consent);
            hideBanner(banner, overlay, trigger);
        });

        // Reject All
        document.getElementById('ccRejectAll').addEventListener('click', function() {
            var consent = { essential: true, analytics: false, advertising: false };
            saveConsent(consent);
            revokeConsent();
            hideBanner(banner, overlay, trigger);
        });

        // Settings trigger — reopen banner
        trigger.addEventListener('click', function() {
            var current = getConsent();
            if (current) {
                if (analyticsCheck) analyticsCheck.checked = current.analytics;
                if (advertisingCheck) advertisingCheck.checked = current.advertising;
            }
            trigger.classList.remove('cc-visible');
            showBanner(banner, overlay);
        });

        // Overlay click closes
        overlay.addEventListener('click', function() {
            // Only close if consent exists (don't let them dismiss without choosing)
            var current = getConsent();
            if (current) {
                hideBanner(banner, overlay, trigger);
            }
        });
    }

    init();
})();
