/**
 * Animation functionality
 * Handles fade-in animations, skill bars, and counters
 */

/**
 * Check if user prefers reduced motion
 */
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Initialize Intersection Observer for fade-in animations
 */
export function initFadeInAnimations() {
    if (prefersReducedMotion) {
        // If reduced motion is preferred, show everything immediately
        document.querySelectorAll('.fade-in, .section-title').forEach(el => {
            el.classList.add('visible');
        });
        return;
    }
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.fade-in, .section-title').forEach(el => {
        observer.observe(el);
    });
}

/**
 * Animate skill progress bars
 */
export function initSkillBars() {
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBars = entry.target.querySelectorAll('.skill-progress');
                progressBars.forEach(bar => {
                    const width = bar.getAttribute('data-width');
                    if (width) {
                        bar.style.width = width + '%';
                    }
                });
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    document.querySelectorAll('.skill-category').forEach(category => {
        skillObserver.observe(category);
    });
}

/**
 * Animate counter numbers
 */
function animateCounter(element, target, duration = 2000) {
    if (prefersReducedMotion) {
        element.textContent = target;
        return;
    }
    
    let start = 0;
    const increment = target / (duration / 16);
    
    const updateCounter = () => {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
}

/**
 * Initialize counter animations
 */
export function initCounters() {
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                const counter = entry.target.querySelector('.stat-number');
                if (counter) {
                    const target = parseInt(counter.getAttribute('data-target'));
                    if (!isNaN(target)) {
                        animateCounter(counter, target);
                        entry.target.classList.add('counted');
                    }
                }
            }
        });
    }, { threshold: 0.5 });
    
    document.querySelectorAll('.stat-item').forEach(stat => {
        counterObserver.observe(stat);
    });
}

/**
 * Initialize project card animations
 */
export function initProjectCardAnimations() {
    if (prefersReducedMotion) {
        document.querySelectorAll('.project-card').forEach(card => {
            card.style.opacity = '1';
            card.style.transform = 'none';
        });
        return;
    }
    
    const projectObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 150);
                projectObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    document.querySelectorAll('.project-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        projectObserver.observe(card);
    });
}

/**
 * Initialize button hover effects
 */
export function initButtonEffects() {
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            if (!prefersReducedMotion) {
                this.style.transform = 'translateY(-2px)';
            }
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}
