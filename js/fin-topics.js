// ========================================
// FINANCE TOPICS - TAB NAVIGATION
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    const finTabs = document.querySelectorAll('.fin-topic-tab');
    const finContents = document.querySelectorAll('.fin-topic-content');

    console.log('Finance Topics JS loaded. Tabs:', finTabs.length, 'Sections:', finContents.length);

    if (finTabs.length === 0 || finContents.length === 0) return;

    finTabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            const btn = e.currentTarget;
            const targetTopic = btn.dataset.fintopic;

            if (!targetTopic) return;

            finTabs.forEach(t => t.classList.remove('active'));
            btn.classList.add('active');

            finContents.forEach(content => {
                if (content.id === 'fintopic-' + targetTopic) {
                    content.classList.add('active');
                } else {
                    content.classList.remove('active');
                }
            });

            const section = document.getElementById('financeTopics');
            if (section) {
                const offset = section.getBoundingClientRect().top + window.scrollY - 80;
                window.scrollTo({ top: offset, behavior: 'smooth' });
            }
        });
    });
});