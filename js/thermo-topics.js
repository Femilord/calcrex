document.addEventListener('DOMContentLoaded', () => {
    const thTabs = document.querySelectorAll('.th-topic-tab');
    const thContents = document.querySelectorAll('.th-topic-content');
    if (thTabs.length === 0 || thContents.length === 0) return;
    thTabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const btn = e.currentTarget;
            const target = btn.dataset.thtopic;
            if (!target) return;
            thTabs.forEach(t => t.classList.remove('active'));
            btn.classList.add('active');
            thContents.forEach(c => c.classList.toggle('active', c.id === 'thtopic-' + target));
            const section = document.getElementById('thermoTopics');
            if (section) {
                const offset = section.getBoundingClientRect().top + window.scrollY - 80;
                window.scrollTo({ top: offset, behavior: 'smooth' });
            }
        });
    });
});