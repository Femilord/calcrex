document.addEventListener('DOMContentLoaded', () => {
    const dtTabs = document.querySelectorAll('.dt-topic-tab');
    const dtContents = document.querySelectorAll('.dt-topic-content');
    console.log('DateTime Topics JS loaded. Tabs:', dtTabs.length, 'Sections:', dtContents.length);
    if (dtTabs.length === 0 || dtContents.length === 0) return;
    dtTabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const btn = e.currentTarget;
            const targetTopic = btn.dataset.dttopic;
            if (!targetTopic) return;
            dtTabs.forEach(t => t.classList.remove('active'));
            btn.classList.add('active');
            dtContents.forEach(content => {
                content.classList.toggle('active', content.id === 'dttopic-' + targetTopic);
            });
            const section = document.getElementById('datetimeTopics');
            if (section) {
                const offset = section.getBoundingClientRect().top + window.scrollY - 80;
                window.scrollTo({ top: offset, behavior: 'smooth' });
            }
        });
    });
});