/**
 * Navigation functionality
 * Handles smooth scrolling, mobile menu, and active link highlighting
 */

/**
 * Initialize smooth scrolling for navigation links
 */
export function initSmoothScrolling() {
    const anchors = document.querySelectorAll('a[href^="#"]');
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.getElementById('hamburger');
    
    anchors.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    navMenu.setAttribute('aria-expanded', 'false');
                }
                if (hamburger) {
                    hamburger.classList.remove('active');
                    hamburger.setAttribute('aria-expanded', 'false');
                }
            }
        });
    });
}

/**
 * Initialize navbar scroll effect
 */
export function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    let ticking = false;
    
    const handleScroll = () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const currentScroll = window.pageYOffset;
                
                if (currentScroll > 100) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
                
                ticking = false;
            });
            ticking = true;
        }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
}

/**
 * Initialize mobile menu toggle
 */
export function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!hamburger || !navMenu) return;
    
    // Toggle menu on hamburger click
    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        const isActive = hamburger.classList.contains('active');
        
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', !isActive);
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            if (hamburger.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        }
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && hamburger.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            hamburger.focus();
        }
    });
}

/**
 * Initialize active navigation link highlighting
 */
export function initActiveNavLinks() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (sections.length === 0 || navLinks.length === 0) return;
    
    let ticking = false;
    
    const updateActiveLink = () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                let current = '';
                
                sections.forEach(section => {
                    const sectionTop = section.offsetTop;
                    if (window.pageYOffset >= sectionTop - 200) {
                        current = section.getAttribute('id');
                    }
                });
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    link.setAttribute('aria-current', 'false');
                    if (link.getAttribute('href') === `#${current}`) {
                        link.classList.add('active');
                        link.setAttribute('aria-current', 'page');
                    }
                });
                
                ticking = false;
            });
            ticking = true;
        }
    };
    
    window.addEventListener('scroll', updateActiveLink, { passive: true });
    
    // Update on load
    updateActiveLink();
}
