// ========================================
// PHYSICS TOPICS - TAB NAVIGATION
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    const topicTabs = document.querySelectorAll('.topic-tab');
    const topicContents = document.querySelectorAll('.topic-content');

    if (topicTabs.length === 0) return;

    topicTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTopic = tab.dataset.topic;

            // Update active tab
            topicTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Update visible content
            topicContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === `topic-${targetTopic}`) {
                    content.classList.add('active');
                }
            });

            // Scroll to topics section smoothly
            const section = document.getElementById('physicsTopics');
            if (section) {
                const offset = section.getBoundingClientRect().top + window.scrollY - 80;
                window.scrollTo({ top: offset, behavior: 'smooth' });
            }
        });
    });
});