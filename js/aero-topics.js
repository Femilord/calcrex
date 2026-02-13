document.addEventListener('DOMContentLoaded', () => {
    const aeTabs = document.querySelectorAll('.ae-topic-tab');
    const aeContents = document.querySelectorAll('.ae-topic-content');
    if (aeTabs.length === 0 || aeContents.length === 0) return;
    aeTabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const btn = e.currentTarget;
            const target = btn.dataset.aetopic;
            if (!target) return;
            aeTabs.forEach(t => t.classList.remove('active'));
            btn.classList.add('active');
            aeContents.forEach(c => c.classList.toggle('active', c.id === 'aetopic-' + target));
            const section = document.getElementById('aeroTopics');
            if (section) {
                const offset = section.getBoundingClientRect().top + window.scrollY - 80;
                window.scrollTo({ top: offset, behavior: 'smooth' });
            }
        });
    });
});