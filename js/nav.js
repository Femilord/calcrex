// ========================================
// UNIVERSAL NAVIGATION SCRIPT
// Handles mobile menu on ALL pages
// ========================================

// ========================================
// MOBILE MENU FUNCTIONALITY
// ========================================
function initializeMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mainNav = document.getElementById('mainNav');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!mobileMenuToggle || !mainNav) {
        console.warn('Mobile menu elements not found');
        return;
    }

    // Toggle mobile menu
    mobileMenuToggle.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent document click from immediately closing
        mobileMenuToggle.classList.toggle('active');
        mainNav.classList.toggle('active');
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Update active state
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            // Close mobile menu
            mobileMenuToggle.classList.remove('active');
            mainNav.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mainNav.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
            mobileMenuToggle.classList.remove('active');
            mainNav.classList.remove('active');
        }
    });
}

// ========================================
// READ MORE FUNCTIONALITY
// ========================================
function initializeReadMore() {
    const readMoreBtn = document.getElementById('readMoreBtn');
    const introContent = document.getElementById('introContent');

    if (!readMoreBtn || !introContent) {
        return; // No read more functionality on this page
    }

    // Check if there's actually hidden content to reveal
    const extraContent = introContent.querySelector('.intro-text-extra');
    
    if (!extraContent) {
        // No extra content, hide the button
        readMoreBtn.style.display = 'none';
        return;
    }

    readMoreBtn.addEventListener('click', () => {
        const isExpanded = introContent.classList.contains('expanded');

        if (isExpanded) {
            introContent.classList.remove('expanded');
            readMoreBtn.classList.remove('active');
            readMoreBtn.querySelector('.btn-text').textContent = 'Read More';
        } else {
            introContent.classList.add('expanded');
            readMoreBtn.classList.add('active');
            readMoreBtn.querySelector('.btn-text').textContent = 'Read Less';
        }
    });
}

// ========================================
// INITIALIZE ON DOM READY
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    initializeMobileMenu();
    initializeReadMore();
});
