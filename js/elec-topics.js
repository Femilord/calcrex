// ========================================
// ELECTRICITY TOPICS - TAB NAVIGATION
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    const elecTabs = document.querySelectorAll('.elec-topic-tab');
    const elecContents = document.querySelectorAll('.elec-topic-content');

    console.log('Electricity Topics JS loaded. Tabs:', elecTabs.length, 'Sections:', elecContents.length);

    if (elecTabs.length === 0 || elecContents.length === 0) return;

    elecTabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            const btn = e.currentTarget;
            const targetTopic = btn.dataset.electopic;

            if (!targetTopic) return;

            elecTabs.forEach(t => t.classList.remove('active'));
            btn.classList.add('active');

            elecContents.forEach(content => {
                if (content.id === 'electopic-' + targetTopic) {
                    content.classList.add('active');
                } else {
                    content.classList.remove('active');
                }
            });

            const section = document.getElementById('electricityTopics');
            if (section) {
                const offset = section.getBoundingClientRect().top + window.scrollY - 80;
                window.scrollTo({ top: offset, behavior: 'smooth' });
            }
        });
    });
});