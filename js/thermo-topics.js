// ========================================
// TAB NAVIGATION + DEEP LINKING
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.th-topic-tab');
    const contents = document.querySelectorAll('.th-topic-content');
    if (tabs.length === 0 || contents.length === 0) return;

    function activateTab(topicId, scroll) {
        let found = false;
        tabs.forEach(t => {
            if (t.dataset.thtopic === topicId) {
                t.classList.add('active');
                found = true;
            } else {
                t.classList.remove('active');
            }
        });
        if (!found) return false;
        contents.forEach(c => {
            c.classList.toggle('active', c.id === 'thtopic-' + topicId);
        });
        if (scroll) {
            const section = document.getElementById('thermoTopics');
            if (section) {
                const offset = section.getBoundingClientRect().top + window.scrollY - 80;
                window.scrollTo({ top: offset, behavior: 'smooth' });
            }
        }
        return true;
    }

    // Tab click → update hash
    tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const target = e.currentTarget.dataset.thtopic;
            if (!target) return;
            activateTab(target, true);
            history.replaceState(null, '', '#thtopic-' + target);
        });
    });

    // Deep link: activate tab from URL hash on page load
    const hash = window.location.hash.slice(1);
    if (hash && hash.startsWith('thtopic-')) {
        const topicId = hash.replace('thtopic-', '');
        setTimeout(() => activateTab(topicId, true), 100);
    }

    // Handle browser back/forward
    window.addEventListener('hashchange', () => {
        const h = window.location.hash.slice(1);
        if (h && h.startsWith('thtopic-')) {
            activateTab(h.replace('thtopic-', ''), true);
        }
    });
});
