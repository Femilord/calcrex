// ========================================
// TAB NAVIGATION + DEEP LINKING
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.dt-topic-tab');
    const contents = document.querySelectorAll('.dt-topic-content');
    if (tabs.length === 0 || contents.length === 0) return;

    function activateTab(topicId, scroll) {
        let found = false;
        tabs.forEach(t => {
            if (t.dataset.dttopic === topicId) {
                t.classList.add('active');
                found = true;
            } else {
                t.classList.remove('active');
            }
        });
        if (!found) return false;
        contents.forEach(c => {
            c.classList.toggle('active', c.id === 'dttopic-' + topicId);
        });
        if (scroll) {
            const section = document.getElementById('datetimeTopics');
            if (section) {
                const offset = section.getBoundingClientRect().top + window.scrollY - 80;
                window.scrollTo({ top: offset, behavior: 'smooth' });
            }
        }
        return true;
    }

    function handleHash() {
        const hash = window.location.hash.slice(1);
        if (hash && hash.startsWith('dttopic-')) {
            const topicId = hash.replace('dttopic-', '');
            activateTab(topicId, true);
        }
    }

    // Tab button click → update hash + activate
    tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const target = e.currentTarget.dataset.dttopic;
            if (!target) return;
            activateTab(target, true);
            history.replaceState(null, '', '#dttopic-' + target);
        });
    });

    // Intercept anchor link clicks (e.g. <a href="#dttopic-kinematics">)
    document.querySelectorAll('a[href^="#dttopic-"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const hash = link.getAttribute('href').slice(1);
            const topicId = hash.replace('dttopic-', '');
            activateTab(topicId, true);
            history.replaceState(null, '', '#' + hash);
        });
    });

    // Handle hash on page load (cross-page navigation)
    handleHash();

    // Handle browser back/forward
    window.addEventListener('hashchange', handleHash);
});
