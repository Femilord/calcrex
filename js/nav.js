// ========================================
// UNIVERSAL NAVIGATION SCRIPT
// Handles mobile menu + dropdown on ALL pages
// ========================================

function initializeMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mainNav = document.getElementById('mainNav');
    const navLinks = document.querySelectorAll('.nav-link:not(.nav-dropdown-toggle)');
    const dropdownLinks = document.querySelectorAll('.nav-dropdown-link');

    if (!mobileMenuToggle || !mainNav) return;

    // Toggle mobile menu
    mobileMenuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        mobileMenuToggle.classList.toggle('active');
        mainNav.classList.toggle('active');
    });

    // Close menu when clicking a regular nav link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuToggle.classList.remove('active');
            mainNav.classList.remove('active');
        });
    });

    // Close menu when clicking a dropdown link
    dropdownLinks.forEach(link => {
        link.addEventListener('click', () => {
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
// DROPDOWN NAVIGATION
// ========================================
function initializeDropdowns() {
    const dropdowns = document.querySelectorAll('.nav-dropdown');

    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.nav-dropdown-toggle');
        if (!toggle) return;

        // Click to toggle on mobile
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            // Close other dropdowns
            dropdowns.forEach(d => {
                if (d !== dropdown) d.classList.remove('open');
            });

            dropdown.classList.toggle('open');
        });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-dropdown')) {
            dropdowns.forEach(d => d.classList.remove('open'));
        }
    });

    // Close dropdown on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            dropdowns.forEach(d => d.classList.remove('open'));
        }
    });
}

// ========================================
// READ MORE FUNCTIONALITY
// ========================================
function initializeReadMore() {
    const readMoreBtn = document.getElementById('readMoreBtn');
    const introContent = document.getElementById('introContent');

    if (!readMoreBtn || !introContent) return;

    const extraContent = introContent.querySelector('.intro-text-extra');
    if (!extraContent) {
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
    initializeDropdowns();
    initializeReadMore();
});
