document.addEventListener('DOMContentLoaded', () => {
    // Dynamic Year in Footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Animate hamburger to X
            const spans = navToggle.querySelectorAll('span');
            if (navLinks.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // Close mobile nav when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    navLinks.classList.remove('active');
                    const spans = navToggle.querySelectorAll('span');
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                }
            });
        });

        // Close mobile nav when clicking outside
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navLinks.contains(e.target) && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const spans = navToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // Scroll Reveal Animation using Intersection Observer
    const revealElements = document.querySelectorAll('.reveal');
    // Forgiving observer options: trigger slightly before it hits the viewport 
    const observerOptions = { threshold: 0.05, rootMargin: '0px 0px 100px 0px' };
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
        // Fallback: Instantly reveal anything that is already above the fold on load
        if (el.getBoundingClientRect().top < window.innerHeight) {
            el.classList.add('active');
        }
    });

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
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.scrollY;
                document.querySelector('.dynamic-bg').style.transform = `translateY(${scrolled * 0.15}px) scale(1.05)`;
                ticking = false;
            });
            ticking = true;
        }
    });

    // Cross-Page Active Navigation Highlighting
    const currentPath = window.location.pathname; 
    
    document.querySelectorAll('.nav-links a').forEach(link => {
        const linkPath = link.getAttribute('href');
        
        if (linkPath === '/' && (currentPath === '/' || currentPath.endsWith('index.html'))) {
            link.classList.add('active');
        } else if (linkPath !== '/' && currentPath.includes(linkPath)) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});