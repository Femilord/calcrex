// ========================================
// THEME.JS - Theme Toggle & Navigation
// ========================================

// Theme Toggle
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;

    // Default to dark mode
    body.classList.remove('light-mode');
    if (themeToggle) {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
        body.classList.add('light-mode');
        if (themeToggle) {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('light-mode');
            const isLight = body.classList.contains('light-mode');
            themeToggle.innerHTML = isLight ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
        });
    }

    // Smooth Scroll Navigation with Active State
    document.querySelectorAll('.nav-menu a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            // Remove active class from all
            document.querySelectorAll('.nav-menu a').forEach(a => a.classList.remove('active'));

            // Add active class to clicked
            this.classList.add('active');

            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
});