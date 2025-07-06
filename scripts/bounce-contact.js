// Load contact information
async function loadContactInfo() {
  try {
    const response = await fetch("data/contact-info.json");
    const data = await response.json();
    const contactInfo = document.getElementById("contactInfo");

    if (contactInfo && data.contact) {
      const { email, phone, address, hours } = data.contact;
      const fullAddress = `${address.street}, ${address.city}, ${address.state} ${address.postal}, ${address.country}`;

      contactInfo.innerHTML = `
                <div class="info-card">
                    <div class="info-bounce">
                        <h3 class="info-title">Email</h3>
                        <p class="info-text">${email}</p>
                    </div>
                    
                    <div class="info-bounce">
                        <h3 class="info-title">Phone</h3>
                        <p class="info-text">${phone}</p>
                    </div>
                    
                    <div class="info-bounce">
                        <h3 class="info-title">Address</h3>
                        <p class="info-text">${fullAddress}</p>
                    </div>
                    
                    <div class="info-bounce">
                        <h3 class="info-title">Support Hours</h3>
                        <p class="info-text">${hours.weekdays}</p>
                    </div>
                </div>
            `;
    }
  } catch (error) {
    console.error("Failed to load contact information:", error);
  }
}

// Check if field is filled
function validateField(field) {
  // Remove existing error styles
  field.classList.remove("field-error");
  const errorMsg = field.parentElement.querySelector(".error-message");
  if (errorMsg) {
    errorMsg.remove();
  }

  // Check if empty
  if (!field.value.trim()) {
    field.classList.add("field-error");
    const error = document.createElement("div");
    error.className = "error-message";
    error.textContent = "This field is required";
    field.parentElement.appendChild(error);
    return false;
  }

  return true;
}

// Show modal with status
function showModal(message, isSuccess = false) {
  const modal = document.getElementById("submitModal");
  const statusEl = modal.querySelector(".modal-status");
  const messageEl = modal.querySelector(".status-message");

  messageEl.textContent = message;
  modal.classList.add("active");

  if (isSuccess) {
    statusEl.classList.add("success");
  } else {
    statusEl.classList.remove("success");
  }
}

// Hide modal and scroll to top
function hideModal() {
  const modal = document.getElementById("submitModal");
  modal.classList.remove("active");

  // Reset modal state
  setTimeout(() => {
    const statusEl = modal.querySelector(".modal-status");
    statusEl.classList.remove("success");
  }, 300);
}

// Simulate form submission process
async function submitForm(formData) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 2000);
  });
}

// Handle form submission
function setupSupportForm() {
  const supportForm = document.getElementById("supportForm");

  if (supportForm) {
    // Real-time validation on input
    const formFields = supportForm.querySelectorAll(".form-field");
    formFields.forEach((field) => {
      field.addEventListener("input", () => {
        validateField(field);
      });

      // Remove error state on focus
      field.addEventListener("focus", () => {
        field.classList.remove("field-error");
        const errorMsg = field.parentElement.querySelector(".error-message");
        if (errorMsg) {
          errorMsg.remove();
        }
      });
    });

    supportForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      // Validate all fields
      const fields = supportForm.querySelectorAll(".form-field");
      let isValid = true;

      fields.forEach((field) => {
        if (!validateField(field)) {
          isValid = false;
        }
      });

      if (!isValid) {
        return;
      }

      // Get form data
      const formData = new FormData(supportForm);
      const formObject = Object.fromEntries(formData.entries());

      // Show sending state
      showModal("Launching your message to support team...");

      // Simulate form submission
      try {
        await submitForm(formObject);

        // Show success state
        showModal("Perfect combo! Message delivered successfully!", true);

        // Hide modal, reset form and scroll to top after delay
        setTimeout(() => {
          hideModal();
          supportForm.reset();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }, 2000);
      } catch (error) {
        console.error("Form submission error:", error);
      }
    });
  }
}

// Initialize contact page
document.addEventListener("DOMContentLoaded", () => {
  loadContactInfo();
  setupSupportForm();
});
