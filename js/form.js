/**
 * Form handling and validation
 * Sends messages using Formspree (works on GitHub Pages)
 */


const FORMSPREE_URL = "https://formspree.io/f/xaqqyyqo"

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
  field.setAttribute("aria-invalid", "true");
  field.classList.add("error");
  const errorElement = document.getElementById(`${field.id}-error`);
  if (errorElement) {
    errorElement.textContent = message;
    errorElement.setAttribute("role", "alert");
  }
}

/**
 * Clear field error
 */
function clearFieldError(field) {
  field.setAttribute("aria-invalid", "false");
  field.classList.remove("error");
  const errorElement = document.getElementById(`${field.id}-error`);
  if (errorElement) {
    errorElement.textContent = "";
    errorElement.removeAttribute("role");
  }
}

/**
 * Validate form field
 */
function validateField(field) {
  const value = field.value.trim();
  let isValid = true;
  let errorMessage = "";

  // Required fields
  if (field.hasAttribute("required") && !value) {
    isValid = false;
    errorMessage = `${
      field.getAttribute("aria-label") || field.placeholder || "This field"
    } is required`;
  }

  // Email format
  if (field.type === "email" && value && !isValidEmail(value)) {
    isValid = false;
    errorMessage = "Please enter a valid email address";
  }

  // Message length
  if (field.tagName === "TEXTAREA" && value && value.length < 10) {
    isValid = false;
    errorMessage = "Message must be at least 10 characters long";
  }

  if (isValid) clearFieldError(field);
  else showFieldError(field, errorMessage);

  return isValid;
}

/**
 * Show form status message
 */
function showFormStatus(message, type = "success") {
  const statusElement = document.getElementById("form-status");
  if (!statusElement) return;

  statusElement.textContent = message;
  statusElement.className = `form-status ${type}`;
  statusElement.setAttribute("role", "alert");
  statusElement.setAttribute("aria-live", "polite");

  setTimeout(() => {
    statusElement.textContent = "";
    statusElement.className = "form-status";
    statusElement.removeAttribute("role");
  }, 6000);
}

/**
 * Set form loading state
 */
function setFormLoading(isLoading) {
  const form = document.getElementById("contact-form");
  const submitButton = form?.querySelector('button[type="submit"]');
  const btnText = submitButton?.querySelector(".btn-text");
  const btnLoader = submitButton?.querySelector(".btn-loader");

  if (!submitButton) return;

  if (isLoading) {
    submitButton.disabled = true;
    submitButton.setAttribute("aria-busy", "true");
    if (btnText) btnText.textContent = "Sending...";
    if (btnLoader) btnLoader.style.display = "inline-block";
  } else {
    submitButton.disabled = false;
    submitButton.setAttribute("aria-busy", "false");
    if (btnText) btnText.textContent = "Send Message";
    if (btnLoader) btnLoader.style.display = "none";
  }
}

/**
 * Handle form submission (REAL email via Formspree)
 */
async function handleFormSubmit(e) {
  e.preventDefault();

  const form = e.target;

  // Validate fields
  const nameField = document.getElementById("name");
  const emailField = document.getElementById("email");
  const messageField = document.getElementById("message");

  const isNameValid = validateField(nameField);
  const isEmailValid = validateField(emailField);
  const isMessageValid = validateField(messageField);

  if (!isNameValid || !isEmailValid || !isMessageValid) {
    showFormStatus("Please fix the errors below.", "error");
    const firstError = form.querySelector(".error");
    if (firstError) firstError.focus();
    return;
  }

  // Make sure Formspree URL is set
  if (!FORMSPREE_URL || FORMSPREE_URL.includes("YOUR_FORM_ID")) {
    showFormStatus(
      "Form is not configured yet. Add your Formspree URL in js/form.js",
      "error"
    );
    return;
  }

  setFormLoading(true);

  try {
    const formData = new FormData(form);

    const res = await fetch(FORMSPREE_URL, {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" },
    });

    if (!res.ok) {
      throw new Error("Failed to send message");
    }

    showFormStatus("Thank you! Your message was sent ✅", "success");
    form.reset();
    form.querySelectorAll(".error").forEach((field) => clearFieldError(field));
  } catch (error) {
    console.error("Form submission error:", error);
    showFormStatus(
      "Sorry, there was an error sending your message. Please try again later.",
      "error"
    );
  } finally {
    setFormLoading(false);
  }
}

/**
 * Initialize form handling
 */
export function initFormHandling() {
  const contactForm = document.getElementById("contact-form");
  if (!contactForm) return;

  // Real-time validation
  const fields = contactForm.querySelectorAll("input, textarea");
  fields.forEach((field) => {
    field.addEventListener("blur", () => validateField(field));
    field.addEventListener("input", () => {
      if (field.classList.contains("error")) validateField(field);
    });
  });

  contactForm.addEventListener("submit", handleFormSubmit);
}
