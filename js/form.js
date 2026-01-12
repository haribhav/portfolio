/**
 * Form handling and validation
 * Handles contact form submission and validation
 */

/**
 * Validate email format
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Show form field error
 */
function showFieldError(field, message) {
    field.setAttribute('aria-invalid', 'true');
    field.classList.add('error');
    const errorElement = document.getElementById(`${field.id}-error`);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.setAttribute('role', 'alert');
    }
}

/**
 * Clear field error
 */
function clearFieldError(field) {
    field.setAttribute('aria-invalid', 'false');
    field.classList.remove('error');
    const errorElement = document.getElementById(`${field.id}-error`);
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.removeAttribute('role');
    }
}

/**
 * Validate form field
 */
function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Check required fields
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = `${field.getAttribute('aria-label') || field.placeholder || 'This field'} is required`;
    }
    
    // Validate email format
    if (field.type === 'email' && value && !isValidEmail(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid email address';
    }
    
    // Validate message length
    if (field.tagName === 'TEXTAREA' && value && value.length < 10) {
        isValid = false;
        errorMessage = 'Message must be at least 10 characters long';
    }
    
    if (isValid) {
        clearFieldError(field);
    } else {
        showFieldError(field, errorMessage);
    }
    
    return isValid;
}

/**
 * Show form status message
 */
function showFormStatus(message, type = 'success') {
    const statusElement = document.getElementById('form-status');
    if (!statusElement) return;
    
    statusElement.textContent = message;
    statusElement.className = `form-status ${type}`;
    statusElement.setAttribute('role', 'alert');
    statusElement.setAttribute('aria-live', 'polite');
    
    // Clear after 5 seconds
    setTimeout(() => {
        statusElement.textContent = '';
        statusElement.className = 'form-status';
        statusElement.removeAttribute('role');
    }, 5000);
}

/**
 * Set form loading state
 */
function setFormLoading(isLoading) {
    const form = document.getElementById('contact-form');
    const submitButton = form?.querySelector('button[type="submit"]');
    const btnText = submitButton?.querySelector('.btn-text');
    const btnLoader = submitButton?.querySelector('.btn-loader');
    
    if (!submitButton) return;
    
    if (isLoading) {
        submitButton.disabled = true;
        submitButton.setAttribute('aria-busy', 'true');
        if (btnText) btnText.textContent = 'Sending...';
        if (btnLoader) btnLoader.style.display = 'inline-block';
    } else {
        submitButton.disabled = false;
        submitButton.setAttribute('aria-busy', 'false');
        if (btnText) btnText.textContent = 'Send Message';
        if (btnLoader) btnLoader.style.display = 'none';
    }
}

/**
 * Handle form submission
 */
async function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const name = formData.get('name')?.trim() || '';
    const email = formData.get('email')?.trim() || '';
    const message = formData.get('message')?.trim() || '';
    
    // Validate all fields
    const nameField = document.getElementById('name');
    const emailField = document.getElementById('email');
    const messageField = document.getElementById('message');
    
    const isNameValid = validateField(nameField);
    const isEmailValid = validateField(emailField);
    const isMessageValid = validateField(messageField);
    
    if (!isNameValid || !isEmailValid || !isMessageValid) {
        showFormStatus('Please fix the errors below', 'error');
        // Focus on first error field
        const firstError = form.querySelector('.error');
        if (firstError) {
            firstError.focus();
        }
        return;
    }
    
    // Show loading state
    setFormLoading(true);
    
    try {
        // Here you would typically send the data to a server
        // For now, we'll simulate an API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Log form data (in production, send to server)
        console.log('Form submitted:', { name, email, message });
        
        // Show success message
        showFormStatus('Thank you for your message! I\'ll get back to you soon.', 'success');
        
        // Reset form
        form.reset();
        form.querySelectorAll('.error').forEach(field => clearFieldError(field));
        
    } catch (error) {
        console.error('Form submission error:', error);
        showFormStatus('Sorry, there was an error sending your message. Please try again later.', 'error');
    } finally {
        setFormLoading(false);
    }
}

/**
 * Initialize form handling
 */
export function initFormHandling() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;
    
    // Add event listeners for real-time validation
    const fields = contactForm.querySelectorAll('input, textarea');
    fields.forEach(field => {
        field.addEventListener('blur', () => validateField(field));
        field.addEventListener('input', () => {
            if (field.classList.contains('error')) {
                validateField(field);
            }
        });
    });
    
    // Handle form submission
    contactForm.addEventListener('submit', handleFormSubmit);
}
