// Add simple intersection observer for fade-in animations on scroll
document.addEventListener('DOMContentLoaded', () => {
    // Basic setup for fade-in elements
    const fadeElements = document.querySelectorAll('.fade-in');
    
    // Add initial CSS for fade to work if JS is enabled
    const style = document.createElement('style');
    style.innerHTML = `
        .fade-in {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }
        .fade-in.visible {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);

    // Give it a tiny delay to allow initial load then trigger visible on already in-viewport elements
    setTimeout(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            threshold: 0.1,
            rootMargin: '0px 0px -20px 0px'
        });

        fadeElements.forEach(el => observer.observe(el));
    }, 100);
});
