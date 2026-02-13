// ========================================
// COMPUTER SCIENCE TOPICS - TAB NAVIGATION
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    const csTabs = document.querySelectorAll('.cs-topic-tab');
    const csContents = document.querySelectorAll('.cs-topic-content');

    console.log('CS Topics JS loaded. Tabs:', csTabs.length, 'Sections:', csContents.length);

    if (csTabs.length === 0 || csContents.length === 0) return;

    csTabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            const btn = e.currentTarget;
            const targetTopic = btn.dataset.cstopic;

            if (!targetTopic) return;

            csTabs.forEach(t => t.classList.remove('active'));
            btn.classList.add('active');

            csContents.forEach(content => {
                if (content.id === 'cstopic-' + targetTopic) {
                    content.classList.add('active');
                } else {
                    content.classList.remove('active');
                }
            });

            const section = document.getElementById('csTopics');
            if (section) {
                const offset = section.getBoundingClientRect().top + window.scrollY - 80;
                window.scrollTo({ top: offset, behavior: 'smooth' });
            }
        });
    });
});