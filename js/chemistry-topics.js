// ========================================
// TAB NAVIGATION + DEEP LINKING
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.chem-topic-tab');
    const contents = document.querySelectorAll('.chem-topic-content');
    if (tabs.length === 0 || contents.length === 0) return;

    function activateTab(topicId, scroll) {
        let found = false;
        tabs.forEach(t => {
            if (t.dataset.chemtopic === topicId) {
                t.classList.add('active');
                found = true;
            } else {
                t.classList.remove('active');
            }
        });
        if (!found) return false;
        contents.forEach(c => {
            c.classList.toggle('active', c.id === 'chemtopic-' + topicId);
        });
        if (scroll) {
            const section = document.getElementById('chemistryTopics');
            if (section) {
                const offset = section.getBoundingClientRect().top + window.scrollY - 80;
                window.scrollTo({ top: offset, behavior: 'smooth' });
            }
        }
        return true;
    }

    function handleHash() {
        const hash = window.location.hash.slice(1);
        if (hash && hash.startsWith('chemtopic-')) {
            const topicId = hash.replace('chemtopic-', '');
            activateTab(topicId, true);
        }
    }

    // Tab button click → update hash + activate
    tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const target = e.currentTarget.dataset.chemtopic;
            if (!target) return;
            activateTab(target, true);
            history.replaceState(null, '', '#chemtopic-' + target);
        });
    });

    // Intercept anchor link clicks (e.g. <a href="#chemtopic-kinematics">)
    document.querySelectorAll('a[href^="#chemtopic-"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const hash = link.getAttribute('href').slice(1);
            const topicId = hash.replace('chemtopic-', '');
            activateTab(topicId, true);
            history.replaceState(null, '', '#' + hash);
        });
    });

    // Handle hash on page load (cross-page navigation)
    handleHash();

    // Handle browser back/forward
    window.addEventListener('hashchange', handleHash);
});
