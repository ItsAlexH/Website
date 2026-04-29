document.addEventListener('DOMContentLoaded', () => {
    // Dynamic Year in Footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Scroll Reveal Animation using Intersection Observer
    const revealElements = document.querySelectorAll('.reveal');
    const observerOptions = { threshold: 0.15, rootMargin: '0px 0px -50px 0px' };
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    revealElements.forEach(el => revealObserver.observe(el));

    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
            }
        });
    });

    // Subtle Parallax on Dynamic Background
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        document.querySelector('.dynamic-bg').style.transform = `translateY(${scrolled * 0.15}px) scale(1.05)`;
    });

    // Cross-Page Active Navigation Highlighting
    const currentPath = window.location.pathname; 
    
    document.querySelectorAll('.nav-links a').forEach(link => {
        const linkPath = link.getAttribute('href');
        
        // Check if the current URL contains the link's path
        // Special rule for the root ("/") to prevent it from always highlighting
        if (linkPath === '/' && (currentPath === '/' || currentPath.endsWith('index.html'))) {
            link.classList.add('active');
        } else if (linkPath !== '/' && currentPath.includes(linkPath)) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});
