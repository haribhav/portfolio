/**
 * Main application entry point
 * Initializes all modules
 */

import { initSmoothScrolling, initNavbarScroll, initMobileMenu, initActiveNavLinks } from './navigation.js';
import { initFadeInAnimations, initSkillBars, initCounters, initProjectCardAnimations, initButtonEffects } from './animations.js';
import { initFormHandling } from './form.js';

/**
 * Initialize the application
 */
function init() {
    try {
        // Navigation
        initSmoothScrolling();
        initNavbarScroll();
        initMobileMenu();
        initActiveNavLinks();
        
        // Animations
        initFadeInAnimations();
        initSkillBars();
        initCounters();
        initProjectCardAnimations();
        initButtonEffects();
        
        // Form handling
        initFormHandling();
        
        // Initialize page load animation
        document.body.classList.add('loaded');
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
        
        console.log('Portfolio initialized successfully');
    } catch (error) {
        console.error('Error initializing portfolio:', error);
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Set initial body opacity for fade-in effect
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease-in';
