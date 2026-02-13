// ========================================
// CHEMISTRY TOPICS - TAB NAVIGATION
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    const chemTabs = document.querySelectorAll('.chem-topic-tab');
    const chemContents = document.querySelectorAll('.chem-topic-content');

    console.log('Chemistry Topics JS loaded. Tabs:', chemTabs.length, 'Sections:', chemContents.length);

    if (chemTabs.length === 0 || chemContents.length === 0) return;

    chemTabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            const btn = e.currentTarget;
            const targetTopic = btn.dataset.chemtopic;

            if (!targetTopic) return;

            // Update active tab
            chemTabs.forEach(t => t.classList.remove('active'));
            btn.classList.add('active');

            // Update visible content
            chemContents.forEach(content => {
                if (content.id === 'chemtopic-' + targetTopic) {
                    content.classList.add('active');
                } else {
                    content.classList.remove('active');
                }
            });

            // Scroll to section
            const section = document.getElementById('chemistryTopics');
            if (section) {
                const offset = section.getBoundingClientRect().top + window.scrollY - 80;
                window.scrollTo({ top: offset, behavior: 'smooth' });
            }
        });
    });
});